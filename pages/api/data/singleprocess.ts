/*
 *  Endpoint da api para fazer a predição de um múnicipio
 *  recebe um POST com apenas um parâmetro
 *    -idmunicipio <municipio a ser processado>
 *  Responde com status 200 e Prediction done em caso de sucesso
 */

import { withIronSessionApiRoute } from 'iron-session/next/dist';
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { sessionOptions } from '../../../lib/session';
import { processing } from '../../../scripts/process-municipio';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    res.status(405).send({ message: 'Only POST requests are allowed' });
    return;
  }
  if (!req.session.user?.isAuthorized) {
    res.status(401).send({ message: 'Not Authorized' });
    return;
  }
  if (!req.body.idmunicipio) {
    res.status(400).send({ message: 'Wrong data sent' });
    return;
  }

  const municipio = req.body.idmunicipio;
  try {
    await processing([municipio, 'normal']);
    await processing([municipio, 'cesaria']);
    await processing([municipio, 'total']);
  } catch (e) {
    res.status(500).send({ message: 'Internal Server Error' });
    return;
  }

  res.status(200).send({ message: 'Prediction Done' });
}

export default withIronSessionApiRoute(handler, sessionOptions);
