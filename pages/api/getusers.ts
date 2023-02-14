/*
Api para enviar todos os usuários cadastrados na plataforma,
apenas usuários administradores tem o direito de fazer o request para o endpoint.

Recebe um GET request e envia um json com um vetor contendo todos os usuários
ordenados por autorização ascendentemente.
*/

import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma';
import authenticate from '../../lib/authenticateUser';

async function getusers(req: NextApiRequest, res: NextApiResponse) {
  // Verifica se o usuário é admin e se o metodo da requisição é GET
  if (!req.session.user) {
    res.status(401).send({ message: 'Not Logged In' });
    return;
  } else if (req.method != 'GET') {
    res.status(405).send({ message: 'Only GET requests are allowed' });
    return;
  }

  // Checando se o usuário está autenticado
  if (!(await authenticate(req.session.user, true))) {
    res.status(401).send({ message: 'Not Authorized' });
    return;
  }

  await prisma.$connect();

  // Pegar todos os usuarios ordenados por autorização
  const data = await prisma.usuario.findMany({
    orderBy: [
      {
        authorized: 'asc',
      },
    ],
  });

  await prisma.$disconnect();
  res.status(200).send({ data });
}

export default withIronSessionApiRoute(getusers, sessionOptions);
