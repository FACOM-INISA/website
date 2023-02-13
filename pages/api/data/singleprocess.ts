/*
 *  Endpoint da api para fazer a predição de um múnicipio
 *  recebe um POST com apenas um parâmetro
 *    -idmunicipio <municipio a ser processado>
 *  Responde com status 200 e Prediction done em caso de sucesso
 */

import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { sessionOptions } from '../../../lib/session';
import { processing } from '../../../scripts/process-municipio';
import prisma from '../../../prisma';
import authenticate from '../../../lib/authenticateUser';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    res.status(405).send({ message: 'Only POST requests are allowed' });
    return;
  }
  if (!req.session.user) {
    res.status(401).send({ message: 'Not Logged In' });
    return;
  }

  // Checando se o usuário está autenticado
  if (!(await authenticate(req.session.user))) {
    res.status(401).send({ message: 'Not Authorized' });
    return;
  }
  if (!req.body.idmunicipio) {
    res.status(400).send({ message: 'Wrong data sent' });
    return;
  }
  const municipio = req.body.idmunicipio;

  // Pega o ultimo ano e último mes
  await prisma.predicao.deleteMany({
    where: {
      municipio_id: +municipio,
    },
  });

  try {
    await processing([municipio, 'normal']);
    await processing([municipio, 'cesaria']);
    await processing([municipio, 'total']);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Internal Server Error' });
    return;
  }

  try {
    await prisma.parto.updateMany({
      where: {
        municipio_id: +municipio,
        predito: false,
      },
      data: {
        predito: true,
      },
    });
  } catch (e) {
    res.status(500).send({ message: 'Internal Server Error' });
  }

  res.status(200).send({ message: 'Prediction Done' });
}

export default withIronSessionApiRoute(handler, sessionOptions);
