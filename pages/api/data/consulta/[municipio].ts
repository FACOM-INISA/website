/*
  API para requisitar os dados da predição de todos os tipos de partos junto com
  os dados históricos.

  Retorna um JSON contendo um vetor de todos os partos ordenados por ano e mês
  ascendentemente e depois um objeto contendo 3 objetos, um para cada predição também
  ordenandos ascendentemente e sendo um vetor.
*/
import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'GET') {
    res.status(405).json({
      status: 'fail',
      message: 'Only GET requests are allowed',
    });
    return;
  }

  const municipio = parseInt(req.query.municipio as string);

  let partos: any[] = [];
  let predicoes: any[] = [];

  try {
    partos = await prisma.parto.findMany({
      where: { municipio_id: { equals: municipio } },
      orderBy: [{ ano: 'asc' }, { mes: 'asc' }],
    });

    predicoes = await prisma.predicao.findMany({
      where: { municipio_id: { equals: municipio } },
      orderBy: [{ tipo_parto: 'asc' }, { ano: 'asc' }, { mes: 'asc' }],
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2001') {
        res.status(404).json({
          status: 'fail',
          message: 'Municipio not found',
        });
      }
    }
  }
  if (partos.length === 0 || predicoes.length === 0) {
    res.status(204);
    return;
  }

  const predicoes_cesaria = predicoes.filter((element) => {
    if (element.tipo_parto == 'cesaria') return element;
  });
  const predicoes_normal = predicoes.filter((element) => {
    if (element.tipo_parto == 'normal') return element;
  });
  const predicoes_total = predicoes.filter((element) => {
    if (element.tipo_parto == 'total') return element;
  });

  res.status(200).json({
    status: 'success',
    partos: partos,
    predicoes: {
      predicoes_cesaria: predicoes_cesaria,
      predicoes_normal: predicoes_normal,
      predicoes_total: predicoes_total,
    },
  });
}
