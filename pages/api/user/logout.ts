import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import type { User } from './user';

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    req.session.destroy();
    res.status(307).redirect('/');
  } else {
    res.status(405).send({
      status: 'fail',
      message: 'Only GET requests are allowed',
    });
  }
}
