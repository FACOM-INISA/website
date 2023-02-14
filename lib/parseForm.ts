// Parser para lidar com forms que possuem csv

import formidable from 'formidable';
import { stat, mkdir } from 'fs/promises';
import type { NextApiRequest } from 'next';

export const FormidableError = formidable.errors.FormidableError;

export async function parseForm(
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise(async (resolve, reject) => {
    const uploadDir = process.cwd() + '/upload/';

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === 'ENOENT') {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(e);
        reject(e);
        return;
      }
    }

    const form = formidable({
      uploadDir: uploadDir,
      filename: (_name, _ext, part) => {
        return `${_name}-${Date.now()}.csv`;
      },
      filter: (part) => {
        return part.mimetype?.includes('csv') || false;
      },
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}
