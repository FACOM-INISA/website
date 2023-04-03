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
import authenticate from '../../../lib/authenticateUser';
import { sessionOptions } from '../../../lib/session';
import prisma from '../../../prisma';

async function updateUsers(req: NextApiRequest, res: NextApiResponse) {
  // Verificar se o método de requisicao é POST e se o usário é admin
  if (req.method != 'POST') {
    res.status(405).send({
      status: 'fail',
      message: 'Only POST requests are allowed',
    });
    return;
  } else if (!req.session.user) {
    res.status(401).send({
      status: 'fail',
      message: 'Not Logged In',
    });
    return;
  }

  // Checando se o usuário está autenticado
  if (!(await authenticate(req.session.user, true))) {
    res.status(401).send({
      status: 'fail',
      message: 'Not Authorized',
    });
    return;
  }

  // Checar se o body esta vazio
  if (!req.body.data) {
    res.status(400).send({
      status: 'fail',
      message: 'Wrong data sent',
    });
    return;
  }
  // Confirmar que os dados são emails, booleanos
  const emailRegEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const data: [{ email: any; authorized: any }] = req.body.data;
  data.forEach((element) => {
    if (!element.email.match(emailRegEx)) {
      res.status(400).send({
        status: 'fail',
        message: 'Wrong data sent',
      });
      return;
    }
    if (typeof element.authorized !== 'boolean') {
      res.status(400).send({
        status: 'fail',
        message: 'Wrong data sent',
      });
      return;
    }
  });
  // Atualizar o banco de dados
  for (const element of data) {
    try {
      let data = await prisma.usuario.update({
        where: { email: element.email },
        data: { authorized: element.authorized },
      });
      console.log(data);
    } catch (e) {
      res.status(500).send({
        status: 'fail',
        message: 'Error while updating, check emails',
      });
      return;
    }
  }

  // Retornar
  res.status(200).send({
    status: 'success',
    message: 'Okay',
  });
}

export default withIronSessionApiRoute(updateUsers, sessionOptions);
