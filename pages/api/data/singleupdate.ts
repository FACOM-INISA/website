/*
 *  Endpoint da api para fazer upsert de apenas um dado único
 *  recebe um método POST com os seguintes parâmetros:
 *    - ano          <ano do dado>
 *    - mes          <mes do dado>
 *    - normal       <quantidade de partos normais>
 *    - cesaria      <quantidade de partos cesaria>
 *    - total        <quantidade de partos totais>
 *    - idmunicipio  <id do municipio>
 *  Em caso de sucesso responde com status 200.
 */

import { sessionOptions } from '../../../lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

async function singleUpdate(req: NextApiRequest, res: NextApiResponse) {
  // Checando se o método é POST
  if (req.method != 'POST') {
    res.status(405).send({ message: 'Only POST requests are allowed' });
    return;
  }
  // Checando se o usuário é autorizado
  if (!req.session.user?.isAuthorized) {
    res.status(401).send({ message: 'Not Authorized' });
    return;
  }
  // Checando se possui todos os parametros
  if (
    !req.body.ano &&
    !req.body.mes &&
    !req.body.normal &&
    !req.body.cesaria &&
    !req.body.total &&
    !req.body.idmunicipio
  ) {
    res.status(400).send({ message: 'Bad request, missing parameters' });
    return;
  }
  const prisma = new PrismaClient();

  await prisma.$connect();
  try {
    await prisma.parto.upsert({
      where: {
        id: {
          ano: parseInt(req.body.ano),
          mes: parseInt(req.body.mes),
          municipio_id: parseInt(req.body.idmunicipio),
        },
      },
      update: {
        parto_normais: parseInt(req.body.normal),
        parto_cesaria: parseInt(req.body.cesaria),
        parto_total: parseInt(req.body.total),
        predito: false,
      },
      create: {
        ano: parseInt(req.body.ano),
        mes: parseInt(req.body.mes),
        municipio_id: parseInt(req.body.idmunicipio),
        parto_normais: parseInt(req.body.normal),
        parto_cesaria: parseInt(req.body.cesaria),
        parto_total: parseInt(req.body.total),
        predito: false,
      },
    });
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
  }
  await prisma.$disconnect();
  res.status(200).send({ message: 'Data upserted' });
  return;
}

export default withIronSessionApiRoute(singleUpdate, sessionOptions);
