espaço para armazenamento de scripts de processamento

// TODO - melhorar este documento

# Scripts de processamento

Aqui ficam armazenados todos os scripts utilizados para algum tipo de processamendo de informação do sistema.

Todos possuem um comando `yarn` relacionado para sua utilização

## populate-database

Utilizado para povoar o banco de dados com todos os munícipios do estado do Mato Grosso do Sul utilizando da API do [IBGE](https://servicodados.ibge.gov.br/api/docs).

Comando `yarn` associado:

```shell
yarn populate
```

## populate-partos

Utilizado para povoar o banco de dados com o histórico de partos de cada munícipio, recebe como argumento de entrada o caminho para um `.csv` seguindo o padrão:

> ano, mês, quantidade_partos_normais, quantidade_partos_cesária, quantidade_partos_total, id_municipio 

Sendo *id_municipio* equivalente ao id de algum munícipio cadastrado no banco de dados.

Comando `yarn` associado:

```shell
yarn populate-parto ~/*.csv
```

## process-municipio

Utilizado para processar certo município, ou seja, fazer a predição dos partos de certo município de acordo com o tipo de parto, recebe como argumento o id de um munícipio e o tipo de parto, sendo eles:

- normal
- cesaria
- total

Comando `yarn` associado:

```shell
yarn process <id_municipio> <tipo_de_parto>
```

## populate-municipio

Utilizado para ao mesmo tempo que povoar o banco de dados de um município, também fazer as predições de todos os tipos de parto, funciona a partir da chamada de ambos **`populate-partos`** e **`process-municipio`** .

Com isso ele recebe o id de um munícipio e um `csv` contendo as informações de partos do mesmo.

Comando `yarn` associado: 

```shell
yarn populate-municipio <id_municipio> ~/*.csv
```
