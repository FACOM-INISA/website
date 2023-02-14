/*
Api para fazer login do usuário recebe um post com as seguintes
caracteristicas:
  usercode: Código ou email
  password: Senha do usuário

Faz a verificação se é um email ou um código depois pesquisa no
banco de dados pelo o usuário, salva a sessão e retorna para onde
redirecionar o usuário.
*/

import { User } from './user';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import prisma from '../../prisma';

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    res.status(405).send({ message: 'Only POST requests are allowed' });
    return;
  }

  if (!req.body.usercode || !req.body.password) {
    res.status(400).send({ message: 'Wrong data sent' });
    return;
  }

  const { usercode, password } = await req.body;
  let checker = 'email';

  if (usercode.match(/(\d{7})/) || (usercode.match(/(\d{12})/) && !usercode.match(/@.*/))) {
    checker = 'codigo';
  }

  await prisma.$connect();

  try {
    const data = await prisma.usuario.findUniqueOrThrow({
      where: {
        [checker]: usercode,
      },
    });
    const hash = data.hash;
    const valid = await bcrypt.compare(password, hash);

    if (valid) {
      const user: User = {
        isLoggedIn: true,
        name: data.nome,
        email: data.email,
        isAdmin: data.admin,
        isAuthorized: data.authorized,
      };
      req.session.user = user;
      await req.session.save();
      res.status(200).send({ user });
      return;
    } else {
      res.status(404).send({ message: 'USER NOT FOUND' });
      return;
    }
  } catch (error) {
    // TODO: MAKE BETTER ERROR HANDLING
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code == 'P2025') res.status(404).send({ message: 'USER NOT FOUND' });
    } else {
      res.status(400).json({ 400: error });
    }
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
