import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'

export type User = {
  isLoggedIn: boolean,
  name: string,
  isAdmin: boolean,
  isAuthorized: boolean
}

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    })
  } else {
    res.json({
      isLoggedIn: false,
      name: '',
      isAdmin: false,
      isAuthorized: false,
    })
  }
}
export default withIronSessionApiRoute(userRoute, sessionOptions);