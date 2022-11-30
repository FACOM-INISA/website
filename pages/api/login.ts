import { User } from './user';

import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '@prisma/client/runtime';

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = await req.body;
  const prisma = new PrismaClient();
  await prisma.$connect()
  try {
    const data = await prisma.usuario.findUniqueOrThrow({
      where: {
        email: email
      }
    });
    const hash = data.hash;
    const valid = await bcrypt.compare(password, hash);
    if (valid) {
      const user: User = {
        isLoggedIn: true,
        name: data.nome,
        isAdmin: data.admin,
        isAuthorized: data.authorized
      }
      req.session.user = user;
      await req.session.save()
      await prisma.$disconnect()
      res.status(200).send({ user });
    }
  } catch (error) {
    // TODO: MAKE BETTER ERROR HANDLING
    if (error instanceof NotFoundError) {
      res.status(401).send({ 401: 'user not found' })
    } else {
      res.status(400).send({ 400: error })
    }
  }


}


export default withIronSessionApiRoute(loginRoute, sessionOptions);