import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { FormidableError, parseForm } from '../../lib/parseForm';

async function update(req: NextApiRequest, res: NextApiResponse) {
  // Checando se o método é POST
  if (req.method != 'POST') {
    res.status(405).send({ message: 'Only POST requests are allowed' });
  }
  // Checando se é um usuário autorizado
  else if (!req.session.user?.isAuthorized) {
    res.status(401).send({ message: 'Not Authorized' });
  } else {
    // Tentando fazer o parse do request usando o parseForm
    // Cria um arquivo chamado dados.csv se funcionar corretamente
    try {
      const { fields, files } = await parseForm(req);
    } catch (e) {
      if (e instanceof FormidableError) {
        res.status(e.httpCode || 400).send({ error: e.message });
      } else {
        console.error(e);
        res.status(500).send({ error: 'Internal Server Error' });
      }
    }

    const prisma = new PrismaClient();

    // Popular banco de dados

    // Fazer as predições do banco de dados

    // TODO: MUDAR O FUNCIONAMENTO DO POPULATE-MUNICIPIO, PROVAVELMENTE O NOME DELE TAMBÉM PRA SER MAIS
    // TODO: OU FAZER COM QUE SE INSIRA O MUNICIPIO NO FORM
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withIronSessionApiRoute(update, sessionOptions);
