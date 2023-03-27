/*
Endpoint da api para receber um arquivo csv com o municipio que o representa
e fazer a inserção no banco de dados do municipio e suas predições
(benchmark inicial em torno de 8.7s)
*/
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { FormidableError, parseForm } from '../../../lib/parseForm';
import { Fields, File } from 'formidable';
import fs from 'fs';
import { parse } from 'csv-parse';
import { populateAndProcess } from '../../../scripts/populate-municipio';
import authenticate from '../../../lib/authenticateUser';

const checker = async (csv: string) => {
  // ler o arquivo
  let rows: string[][] = [];
  let signal: boolean = false;

  await new Promise<boolean>((resolve, reject) => {
    fs.createReadStream(csv)
      .pipe(parse({ delimiter: ',', from_line: 1 }))
      .on('data', (row) => {
        rows.push(row);
      })
      .on('error', (err) => {
        reject(false);
      })
      .on('end', () => {
        resolve(true);
      });
  })
    .then((result) => {
      signal = result;
    })
    .catch((result) => {
      signal = result;
    });

  if (!signal) {
    return false;
  }

  // Checar se segue o padrão na primeira linha
  // ano, mês, normal, cesaria, total, idmunicipio
  const firstline: string[] = ['ano', 'mês', 'normal', 'cesaria', 'total', 'idmunicipio'];
  for (let word in rows[0]) {
    if (rows[0][word].trim() != firstline[word]) {
      return false;
    }
  }
  rows.shift();

  // Checar se todos os outros dados são numéricos
  for (let row of rows) {
    for (let data of row) {
      try {
        parseInt(data);
      } catch (error) {
        return false;
      }
    }
  }

  return true;
};

async function update(req: NextApiRequest, res: NextApiResponse) {
  // Checando se o método é POST
  if (req.method != 'POST') {
    res.status(405).send({
      status: 'fail',
      message: 'Only POST requests are allowed',
    });
  }
  // Checando se é um usuário autorizado
  if (!req.session.user) {
    res.status(401).send({
      status: 'fail',
      message: 'Not Logged In',
    });
    return;
  }

  // Checando se o usuário está autenticado
  if (!(await authenticate(req.session.user))) {
    res.status(401).send({
      status: 'fail',
      message: 'Not Authorized',
    });
    return;
  } else {
    // Tentando fazer o parse do request usando o parseForm
    // Cria um arquivo com o nome do municipio e o timestamp da inserção do arquivo
    let Fields: Fields | undefined;
    let File: File | undefined;

    try {
      let { fields, files } = await parseForm(req);
      Fields = fields;
      File = files.csv as File;
    } catch (e) {
      File = undefined;
      Fields = undefined;
      if (e instanceof FormidableError) {
        res.status(e.httpCode || 400).send({
          status: 'fail',
          message: e.message,
        });
      } else {
        console.error(e);
        res.status(500).send({
          status: 'error',
          message: 'Erro interno do servidor',
        });
      }
    }

    const idmunicipio = Fields?.idmunicipio as string;
    const csv = `./upload/${File?.newFilename as string}`;

    // Checar o arquivo
    if (!checker(csv)) {
      res.status(400).send({
        status: 'fail',
        message: 'Bad Request',
        filename: csv,
      });
    }

    await populateAndProcess([idmunicipio, csv]);

    res.status(200).send({
      status: 'success',
      message: 'Municipio processado',
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withIronSessionApiRoute(update, sessionOptions);
