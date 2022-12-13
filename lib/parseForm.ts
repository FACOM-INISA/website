// Parser para lidar com forms que possuem csv

import formidable from 'formidable';
import type { NextApiRequest } from 'next';

export const FormidableError = formidable.errors.FormidableError;

export async function parseForm(req: NextApiRequest)
  : Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise(async (resolve, reject) => {

    const uploadDir = process.cwd()

    const form = formidable({
      uploadDir: uploadDir,
      filename: () => 'dados.csv',
      filter: (part) => {
        return (part.mimetype?.includes('csv') || false)
      }
    })

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files })
    })

  });

};
