import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
} from 'recharts';
import { Grid } from '@mui/material';
import { any } from 'bluebird';
import Parto, { Predicao } from '../lib/Parto';

type TipoDadosLocais = {
  name: string;
  cesaria?: number;
  normais?: number;
  total?: number;
  pred?: number;
};

function OpenDataVisualization({
  registros,
  predicoes,
  tipo,
}: {
  registros: Array<Parto>;
  predicoes: Array<Predicao>;
  tipo: 'todos' | 'normal' | 'sensiveis';
}) {
  const [campoData, setCampoData] = useState<'totais' | 'cesarias' | 'normais'>('normais');

  const [data, setData] = useState<TipoDadosLocais[]>();

  useEffect(() => {
    if (tipo === 'todos') setCampoData('totais');
    if (tipo === 'normal') setCampoData('normais');
    if (tipo === 'sensiveis') setCampoData('cesarias');

    let dataAux: Array<TipoDadosLocais> = registros?.map((reg) => {
      return {
        name: `${reg.mes}/${2000 + reg.ano}`,
        cesaria: reg.parto_cesaria,
        normais: reg.parto_normais,
        total: reg.parto_total,
      };
    });

    // const ultimo = dataAux[dataAux.length - 1];
    // dataAux.push({ name: ultimo?.name, pred: ultimo?.normais }); // TODO - Alterar campo quando dados estiverem disponiveis

    predicoes
      .filter((pred) => pred.tipo_parto === 'normal') // TODO - Alterar campo quando dados estiverem disponiveis
      .forEach((predicao) => {
        dataAux.push({
          name: `${predicao.mes}/${predicao.ano + 2000}`,
          pred: predicao.pred,
        });
      });

    setData(dataAux);
  }, [tipo, predicoes, registros]);

  return (
    <Grid>
      <Grid>
        <ResponsiveContainer width="100%" height="100%" aspect={2}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 20, right: 50, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey={campoData}
              stroke="#0088B7"
              name={'Quantidade de partos normais'}
              strokeWidth={1}
            />
            <Line
              type="monotone"
              dataKey="pred"
              stroke="#B70000"
              name={'Predição de partos normais'}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
}

export default OpenDataVisualization;
