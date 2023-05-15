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

interface UFsNivelado {
  'UF-id': number;
  'UF-sigla': string;
  'UF-nome': string;
  'regiao-id': number;
  'regiao-sigla': string;
  'regiao-nome': string;
}

export async function cli() {
  consola.info('Preparando client prisma ...');
  const prisma = new PrismaClient();

  try {
    consola.info('Requisitando dados do IBGE...');
    const data = await fetch(
      'http://servicodados.ibge.gov.br/api/v1/localidades/municipios?view=nivelado'
    ).then((res) => res.json());

    consola.info('Iterando sobre os registros dos municipios ...');
    await mapSeries(data, async (mData: MunicipiosNivelado) => {
      if (mData['UF-sigla'] === 'MS') {
        consola.info(`Insering ${mData['municipio-nome']} (${mData['UF-sigla']})...`);

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

    consola.info('Requisitando dados do IBGE dos estados...');
    const dataUFs = await fetch(
      'http://servicodados.ibge.gov.br/api/v1/localidades/estados?view=nivelado'
    ).then((res) => res.json());

    consola.info('Iterando sobre os registros dos estados ...');
    await mapSeries(dataUFs, async (mData: UFsNivelado) => {
      if (mData['UF-sigla'] === 'MS') {
        consola.info(`Insering ${mData['UF-nome']} (${mData['UF-sigla']})...`);

        return prisma.municipio.upsert({
          where: { id: mData['UF-id'] },
          update: {},
          create: {
            id: mData['UF-id'],
            nome: mData['UF-nome'],
            microrregiao_id: 0,
            microrregiao_nome: '',
            mesorregiao_id: 0,
            mesorregiao_nome: '',
            regiao_imediata_id: 0,
            regiao_imediata_nome: '',
            regiao_intermediaria_id: 0,
            regiao_intermediaria_nome: '',
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
