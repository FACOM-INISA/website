/*
  API para requisitar os dados da predição de todos os tipos de partos junto com
  os dados históricos.

  Retorna um JSON contendo um vetor de todos os partos ordenados por ano e mês
  ascendentemente e depois um objeto contendo 3 objetos, um para cada predição também
  ordenandos ascendentemente e sendo um vetor.
*/
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const municipio = parseInt(req.body.municipio);

  const partos = await prisma.parto.findMany({
    where: { municipio_id: { equals: municipio } },
    orderBy: [{ ano: 'asc' }, { mes: 'asc' }],
  });

  const predicoes = await prisma.predicao.findMany({
    where: { municipio_id: { equals: municipio } },
    orderBy: [{ tipo_parto: 'asc' }, { ano: 'asc' }, { mes: 'asc' }],
  });

  if (partos.length === 0 || predicoes.length === 0) {
    res.status(400).send({ 400: 'Data not found' });
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

  res.status(200).send({
    partos: partos,
    predicoes: {
      predicoes_cesaria: predicoes_cesaria,
      predicoes_normal: predicoes_normal,
      predicoes_total: predicoes_total,
    },
  });
}
