import consola from 'consola';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { parse } from 'csv-parse';
// Importando csv-parse para que possa ler csvs
// Recebe um csv no seguinte estilo
// ano, mes, qtd_partos_normais, qtd_partos_cesaria, qtd_partos_total, id_municipio





export async function test(csv: string) {
  consola.log('Creating prisma client...')
  const prisma = new PrismaClient();
  await prisma.$connect()
  let rows: any[] = [];
  consola.log('Reading...')
  fs.createReadStream(csv)
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', (row) => {
      rows.push(row);
    })
    .on('error', (error) => {
      consola.error(error)
    })
    .on('end', async () => {
      consola.log('Inserting in database...')
      for (let row of rows) {
        await prisma.parto.upsert({
          where: {
            id: {
              ano: parseInt(row[0]),
              mes: parseInt(row[1]),
              municipio_id: parseInt(row[5])
            }
          },
          update: {},
          create: {
            ano: parseInt(row[0]),
            mes: parseInt(row[1]),
            parto_normais: parseInt(row[2]),
            parto_cesaria: parseInt(row[3]),
            parto_total: parseInt(row[4]),
            municipio_id: parseInt(row[5])
          }
        });
      }
      console.log('Inserted all')
    })

  // await prisma.$disconnect();
}

if (require.main === module) test(process.argv.slice(2)[0])
