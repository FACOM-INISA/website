import { PrismaClient } from '@prisma/client';
import consola, { Consola } from 'consola';
import { execSync } from 'node:child_process';
import fs from 'fs';
import { parse } from 'csv-parse';

// Entrada do script, código do múnicipio, tipo de parto

function rScript(input: string, output: string) {
  execSync('Rscript ./scripts/modelo_predicao.R ' + input + ' ' + output)
}


export async function processing(args: Array<string>) {
  consola.log('Creating prisma client...');
  const prisma = new PrismaClient();
  const municipio_id = parseInt(args[0]);
  const tipo_parto = args[1];
  await prisma.$connect();

  // criar query
  consola.log('Getting query results...')
  const todos_partos = await prisma.parto.findMany({
    where: {
      municipio_id: {
        equals: municipio_id
      }
    },
    orderBy: [
      {
        ano: 'asc'
      },
      {
        mes: 'asc'
      }
    ],
  });

  // Pega o ultimo ano e último mes
  const LAST_PARTO = todos_partos.slice(-1)
  let ano = LAST_PARTO[0].ano;
  let mes = LAST_PARTO[0].mes;

  // pegar todos os partos de um municipio de um tipo
  consola.log('Filtering...');
  let partos_data: Array<any> = todos_partos.map((element) => {
    switch (tipo_parto) {
      case 'normal':
        return [element.parto_normais];

      case 'cesaria':
        return [element.parto_cesaria];

      case 'total':
        return [element.parto_total];

      default:
        break;
    }
  });

  // passa o csv para o rScript
  consola.log('Preparing...');
  partos_data.unshift(['X']);
  const partos = partos_data.join(',\n');
  const temp_input = tipo_parto + '-' + municipio_id + '.csv';
  fs.writeFileSync(temp_input, partos);
  consola.log('Calculating...');
  const temp_output = tipo_parto + '-' + municipio_id + '.result.csv';
  rScript(temp_input, temp_output);

  // A partir do csv criado pelo rScript popula as predicoes
  let rows: any[] = [];
  fs.createReadStream(temp_output)
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', (row) => {
      rows.push(row);
      consola.log('Preparing to insert predicao...');
    })
    .on('error', (err) => {
      consola.error(err);
    })
    .on('end', async () => {
      for (let row of rows) {
        mes++;
        if (mes > 12) {
          mes = 1;
          ano++;
        };
        consola.log('Creating predicao for mes =', mes, ' ano =', ano);
        await prisma.predicao.upsert({
          where: {
            id: {
              ano: ano,
              mes: mes,
              tipo_parto: tipo_parto,
              municipio_id: municipio_id
            }
          },
          update: {
            lower: Math.round(row[1]),
            upper: Math.round(row[2]),
            pred: Math.round(row[3]),
          },
          create: {
            ano: ano,
            mes: mes,
            tipo_parto: tipo_parto,
            municipio_id: municipio_id,
            lower: Math.round(row[1]),
            upper: Math.round(row[2]),
            pred: Math.round(row[3]),
          }
        });
      };

      // Deletando os arquivos criados
      fs.unlink(temp_input, err => {
        if (err) {
          throw err;
        }
      });
      fs.unlink(temp_output, err => {
        if (err) {
          throw err;
        }
      });
    });

  await prisma.$disconnect();
}

if (require.main === module) processing(process.argv.slice(2));