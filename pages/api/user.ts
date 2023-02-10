/*
Endpoint do SWR para retornar o usuário
*/

import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';
import prisma from '../../prisma';
export type User = {
  isLoggedIn: boolean;
  name: string;
  email: string;
  isAdmin: boolean;
  isAuthorized: boolean;
};

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    await prisma.$connect();
    const data = await prisma.usuario.findUnique({
      where: {
        email: req.session.user.email,
      },
    });
    if (data) {
      const body = {
        name: data.nome,
        email: data.email,
        isAdmin: data.admin,
        isAuthorized: data.authorized,
        isLoggedIn: true,
      };
      req.session.user = { ...body };
      await req.session.save();
      res.json({ ...body });
    }
  } else {
    res.json({
      isLoggedIn: false,
      name: '',
      email: '',
      isAdmin: false,
      isAuthorized: false,
    });
  }
}
export default withIronSessionApiRoute(userRoute, sessionOptions);
