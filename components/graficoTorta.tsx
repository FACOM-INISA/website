import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import Parto from '../lib/Parto';

const renderActiveShape = (props: {
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
  registros: Array<Parto>;
}) => {
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
    registros,
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

  const data = registros.map((reg) => {
    return {
      name: `${reg.mes}/${2000 + reg.ano}`,
      cesaria: reg.parto_cesaria,
      normais: reg.parto_normais,
      value: reg.parto_total,
    };
  });

  return (
    <g>
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
      >{`Quantidade ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Taxa de ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class GraficoTorta extends PureComponent {
  state = {
    activeIndex: 0,
  };

  onPieEnter = (_: any, index: any) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%" aspect={3}>
        <PieChart>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            fill="#0088B7"
            dataKey=""
            onMouseEnter={this.onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
