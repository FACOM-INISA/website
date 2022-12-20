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
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

const data = [
  {
    name: '2017',
    uv: 34,
    pv: 100,
    amt: 4224,
  },
  {
    name: '2018',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '2019',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '2020',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '2021',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '2022',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
];

const OpenDataVisualization: NextPage = (props) => {
  /* const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end'; */
  return (
    <Grid2>
      <Grid2>
        <ResponsiveContainer width="50%" height="100%" aspect={2}>
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

            <Line type="monotone" dataKey="pv" stroke="#0088B7" name="Partos Sensíveis" />
          </LineChart>
        </ResponsiveContainer>
      </Grid2>
      <Grid2>
        {/* <g>
          <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
            {payload.name}
          </text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
          <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
          />
          <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            textAnchor={textAnchor}
            fill="#333"
          >{`PV ${value}`}</text>
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            dy={18}
            textAnchor={textAnchor}
            fill="#999"
          >
            {`(Rate ${(percent * 100).toFixed(2)}%)`}
          </text>
        </g> */}
      </Grid2>
    </Grid2>
  );
};

export default OpenDataVisualization;
