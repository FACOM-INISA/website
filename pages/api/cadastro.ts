/*
O script recebe um form que possui as seguintes características:
  senha: string
  nome : string
  email: string
Tenta adicionar o usuario para no banco de dados, se algum erro acontecer      |
retorna 400 e o err, caso bem sucedido retorna '200: ok'.

Para garantir que somente o hash da senha será guardado no BD a biblioteca
bcrypt, com 10 rodadas de salt, devendo ser seguro o suficiente
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let body = req.body;
  if (!body.name && !body.email && !body.senha) {
    res.status(400).send("Incorrect data sent");
    return;
  }
  const prisma = new PrismaClient();
  // Tenta inserir o usuário no banco de dados, caso resulte em algum erro,
  // retorna o erro + status 400
  try {
    let hash: string = bcrypt.hashSync(body.senha, 10);
    await prisma.usuario.create({
      data: {
        email: body.email,
        nome: body.nome,
        hash: hash
      }
    });
    await prisma.$disconnect();
    // res.redirect('/');
    res.status(201).json({ 201: 'okay' });
  } catch (err) {
    await prisma.$disconnect();
    res.status(400).json(err);
  }
}
