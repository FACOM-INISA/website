import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';
import { mapSeries } from 'bluebird';
import consola from 'consola';

interface MunicipiosNivelado {
  'municipio-id': number;
  'municipio-nome': string;
  'microrregiao-id': number;
  'microrregiao-nome': string;
  'mesorregiao-id': number;
  'mesorregiao-nome': string;
  'regiao-imediata-id': number;
  'regiao-imediata-nome': string;
  'regiao-intermediaria-id': number;
  'regiao-intermediaria-nome': string;
  'UF-id': number;
  'UF-sigla': string;
  'UF-nome': string;
  'regiao-id': number;
  'regiao-sigla': string;
  'regiao-nome': string;
}

export async function cli() {
  consola.info('Creating prisma client...');
  const prisma = new PrismaClient();
  // const deleteUsers = await prisma.municipio.deleteMany({})

  try {
    consola.info('Requesting data from IBGE...');
    const data = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?view=nivelado'
    ).then((res) => res.json());

    consola.info('Iterating over records...');
    await mapSeries(data, async (mData: MunicipiosNivelado) => {
      if (mData['UF-sigla'] === 'MS') {
        consola.info(`Upserting ${mData['municipio-nome']}-${mData['UF-sigla']}...`);

        return prisma.municipio.upsert({
          where: { id: mData['municipio-id'] },
          update: {},
          create: {
            id: mData['municipio-id'],
            nome: mData['municipio-nome'],
            microrregiao_id: mData['microrregiao-id'],
            microrregiao_nome: mData['microrregiao-nome'],
            mesorregiao_id: mData['mesorregiao-id'],
            mesorregiao_nome: mData['mesorregiao-nome'],
            regiao_imediata_id: mData['regiao-imediata-id'],
            regiao_imediata_nome: mData['regiao-imediata-nome'],
            regiao_intermediaria_id: mData['regiao-intermediaria-id'],
            regiao_intermediaria_nome: mData['regiao-intermediaria-nome'],
            uf_id: mData['UF-id'],
            uf_sigla: mData['UF-sigla'],
            uf_nome: mData['UF-nome'],
          },
        });
      }
    });
  } finally {
    await prisma.$disconnect();
  }

  consola.success('Done!');
}

if (require.main === module) cli();
