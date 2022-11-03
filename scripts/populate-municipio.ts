import consola from 'consola';
import { populatePartos } from './populate-partos';
import { processing } from './process-municipio';


export async function populateAndProcess(args: string[]) {
  const municipio = args[0];
  const csv = args[1];
  await populatePartos(csv);

  await processing([municipio, 'normal']);
  await processing([municipio, 'cesaria']);
  await processing([municipio, 'total']);




} if (require.main === module) populateAndProcess(process.argv.slice(2));