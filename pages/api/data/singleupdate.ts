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
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma';
import authenticate from '../../../lib/authenticateUser';

async function singleUpdate(req: NextApiRequest, res: NextApiResponse) {
  // Checando se o método é POST
  if (req.method != 'POST') {
    res.status(405).send({
      status: 'fail',
      message: 'Only POST requests are allowed',
    });
    return;
  }
  // Checando se o usuário é autorizado
  if (!req.session.user) {
    res.status(401).send({
      status: 'fail',
      message: 'Not Logged In',
    });
    return;
  }

  // Checando se o usuário está autenticado
  if (!(await authenticate(req.session.user))) {
    res.status(401).send({
      status: 'fail',
      message: 'Not Authorized',
    });
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
    res.status(400).send({
      status: 'fail',
      message: 'Bad request, missing parameters',
    });
    return;
  }

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
    res.status(500).send({
      status: 'error',
      message: 'Erro interno do servidor',
    });
  }
  res.status(200).send({
    status: 'success',
    message: 'Data upserted',
  });
  return;
}

export default withIronSessionApiRoute(singleUpdate, sessionOptions);
