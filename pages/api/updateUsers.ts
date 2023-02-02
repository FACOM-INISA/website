/*
  Endpoint para atualizar os usuários cadastrados no sistema por um admim,
  recebe um POST com os seguintes elementos no body:
    data: [
      {
        email: string,
        authorized: boolean
      },
    }
*/

import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../lib/session';
import prisma from '../../prisma';

async function updateUsers(req: NextApiRequest, res: NextApiResponse) {
  // Verificar se o método de requisicao é POST e se o usário é admin
  if (req.method != 'POST') {
    res.status(405).send({ message: 'Only POST requests are allowed' });
    return;
  } else if (!req.session.user?.isAdmin) {
    res.status(401).send({ message: 'Not Authorized' });
    return;
  }

  // Checar se o body esta vazio
  if (!req.body.data) {
    res.status(400).send({ message: 'Bad Request, missing data' });
    return;
  }
  // Confirmar que os dados são emails, booleanos
  const emailRegEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const data: [{ email: any; authorized: any }] = req.body.data;
  data.forEach((element) => {
    try {
      if (!element.email.match(emailRegEx)) {
        res.status(400).send({ message: 'Bad Request, incorrect data format' });
        return;
      }
      if (!(element.authorized === false || element.authorized === true)) {
        res.status(400).send({ message: 'Bad Request, incorrect data format' });
        return;
      }
    } catch (e) {
      res.status(400).send({ message: 'Bad Request, incorrect data format' });
    }
  });
  // Atualizar o banco de dados
  for (const element of data) {
    await prisma.usuario.update({
      where: { email: element.email },
      data: { authorized: element.authorized },
    });
  }

  // Retornar
  await prisma.$disconnect();
  res.status(200).send({ message: 'Okay' });
}

export default withIronSessionApiRoute(updateUsers, sessionOptions);
