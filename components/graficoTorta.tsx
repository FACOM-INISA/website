import React, { PureComponent, useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Text } from 'recharts';
import Parto from '../lib/Parto';

type ShapeProps = {
  cx: any;
  cy: any;
  midAngle: any;
  innerRadius: any;
  outerRadius: any;
  startAngle: any;
  endAngle: any;
  fill: any;
  payload: any;
  percent: any;
  value: any;
};

const renderActiveShape = (props: ShapeProps) => {
  const RADIAN = Math.PI / 180;

  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </Text>
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
      <Text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#0088B7"
      >{`Quantidade: ${value} parto(s)`}</Text>
      {/* <Text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Taxa de ${(percent * 100).toFixed(2)}%)`}
      </Text> */}
    </g>
  );
};

export default function GraficoTorta(props: { registros: Array<Parto> }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: any) => setActiveIndex(index);

  const data = props.registros?.reduce(
    ([normais /* , sensiveis */], parto) => {
      normais.total += parto.parto_normais;
      /* sensiveis.total += parto.parto_cesaria; */
      return [normais /* , sensiveis */];
    },
    [
      { name: 'Partos Normais', total: 0 },
      /* { name: 'Partos Sensíveis', total: 0 }, */
    ]
  );

  return (
    <ResponsiveContainer aspect={3}>
      <PieChart>
        <Pie
          startAngle={40}
          endAngle={400}
          data={data}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          innerRadius={70}
          outerRadius={90}
          fill="#0088B7"
          dataKey="total"
          nameKey="name"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
