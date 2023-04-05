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
import { capitalize, Grid } from '@mui/material';
import { any } from 'bluebird';
import Parto, { Predicao } from '../lib/Parto';
import dayjs from 'dayjs';

import 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.locale('pt-br');
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);

type TipoDadosLocais = {
  date: Date;
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
        date: new Date(2000 + reg.ano, reg.mes, 1),
        cesaria: reg.parto_cesaria,
        normais: reg.parto_normais,
        total: reg.parto_total,
      };
    });

    const ultimo = dataAux[dataAux.length - 1];
    dataAux.push({ date: dayjs(ultimo?.date).add(1, 'days').toDate(), pred: ultimo?.normais }); // TODO - Alterar campo quando dados estiverem disponiveis

    predicoes
      .filter((pred) => pred.tipo_parto === 'normal') // TODO - Alterar campo quando dados estiverem disponiveis
      .forEach((predicao) => {
        dataAux.push({
          date: new Date(2000 + predicao.ano, predicao.mes, 1),
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
            data={data?.map((data) => ({ ...data, xLabel: data.date?.getTime() }))}
            margin={{ top: 20, right: 50, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="xLabel"
              type="number"
              scale="time"
              domain={[
                data
                  ?.filter((d) => d.pred)
                  .at(-1)
                  ?.date.getTime() || 'auto',
                'auto',
              ]}
              tickFormatter={(value) => dayjs(value).format('MM/YYYY')}
            />
            <YAxis />
            <Tooltip labelFormatter={(value) => capitalize(dayjs(value).format('MMMM, YYYY'))} />
            <Legend />

            <Line
              type="monotone"
              dataKey={campoData}
              stroke="#0088B7"
              name={'Quantidade de partos normais'}
              strokeWidth={1}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="pred"
              stroke="#B70000"
              name={'Predição de partos normais'}
              strokeWidth={2}
              dot={false}
            />
            <ReferenceLine
              x={data
                ?.filter((d) => d.pred)
                .at(0)
                ?.date.getTime()}
              stroke="rgba(183,0,0,0.25)"
              label="Projeção"
              ifOverflow="visible"
            />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
}

export default OpenDataVisualization;
