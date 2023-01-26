type Parto = {
  ano: number;
  mes: number;
  parto_cesaria: number;
  parto_normais: number;
  parto_total: number;
};

export default Parto;

export type Predicao = {
  ano: number;
  mes: number;
  tipo_parto: string;
  lower: number;
  upper: number;
  pred: number;
};
