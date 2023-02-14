/*
O script recebe um form que possui as seguintes características:
  senha: string
  nome : string
  email: string
  code : string
Tenta adicionar o usuario para no banco de dados, se algum erro acontecer      |
retorna 400 e o err, caso bem sucedido retorna '200: ok'.

Para garantir que somente o hash da senha será guardado no BD a biblioteca
bcrypt, com 10 rodadas de salt, devendo ser seguro o suficiente
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import prisma from '../../prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    res.status(405).send({ message: 'Only POST requests are allowed' });
    return;
  }
  let body = req.body;
  if (
    (!body.name && !body.email && !body.senha && !body.code) ||
    (body.code.length != 7 && body.code.length != 12) ||
    (!body.code.match(/(\d{7})/) && !body.code.match(/(\d{12})/)) ||
    body.senha.length < 8
  ) {
    res.status(400).send({ message: 'Incorrect data sent' });
    return;
  }

  // Tenta inserir o usuário no banco de dados, caso resulte em algum erro,
  // retorna o erro + status 400
  try {
    let hash: string = bcrypt.hashSync(body.senha, 10);
    await prisma.usuario.create({
      data: {
        email: body.email,
        nome: body.name,
        codigo: body.code,
        hash: hash,
      },
    });
    res.status(307).json({ message: '/logIn' });
    // res.status(201).json({ 201: 'okay' });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(400).json({ message: 'Usuário já cadastrado' });
      }
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
