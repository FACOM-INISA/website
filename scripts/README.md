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
