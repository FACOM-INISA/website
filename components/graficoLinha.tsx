import * as React from 'react';
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
import Parto from '../lib/Parto';

function OpenDataVisualization({
  registros,
  predicoes,
}: {
  registros: Array<Parto>;
  predicoes: Array<Predicao>;
}) {
  const data = registros.map((reg) => {
    return {
      name: `${reg.mes}.${reg.ano}`,
      cesaria: reg.parto_cesaria,
      normais: reg.parto_normais,
      total: reg.parto_total,
    };
  });

  const dataPredicao = predicoes.filter((pred) => pred.tipo_parto === 'total').map();

  return (
    <Grid>
      <Grid>
        <ResponsiveContainer width="100%" height="100%" aspect={2}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 50,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="total" stroke="#0088B7" name="Quantidade" />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
}

export default OpenDataVisualization;
