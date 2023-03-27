/*
 *  Endpoint da api para fazer a predição de um múnicipio
 *  recebe um POST com apenas um parâmetro
 *    -idmunicipio <municipio a ser processado>
 *  Responde com status 200 e Prediction done em caso de sucesso
 */

import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../../../lib/session';
import { processing } from '../../../../scripts/process-municipio';
import prisma from '../../../../prisma';
import authenticate from '../../../../lib/authenticateUser';
import { Prisma } from '@prisma/client';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    res.status(405).send({
      status: 'fail',
      message: 'Only POST requests are allowed',
    });
    return;
  }
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

  const municipio = req.query.municipio as string;

  // Pega o ultimo ano e último mes
  try {
    await prisma.predicao.deleteMany({
      where: {
        municipio_id: +municipio,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2001') {
        res.status(404).json({
          status: 'fail',
          message: 'Municipio not found',
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
        });
      }
    }
  }

  try {
    await processing([municipio, 'normal']);
    await processing([municipio, 'cesaria']);
    await processing([municipio, 'total']);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
    });
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
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
    });
  }

  res.status(200).send({
    status: 'success',
    message: 'Prediction Done',
  });
}

export default withIronSessionApiRoute(handler, sessionOptions);
