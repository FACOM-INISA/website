# Banco de dados

O serviço utiliza como banco de dados o `SQLite` juntamente com o `Prisma` para comunicação com o mesmo.

O banco de dados possui os seguintes _schemas_ do prisma:

## Municipio

| Nome                      | Tipo         | Extra         | Significado                          |
| :------------------------ | :----------- | :------------ | :----------------------------------- |
| id                        | `Int`        | `PK`          | Principal identificação do município |
| nome                      | `String`     |               | Nome do município                    |
| microrregiao_id           | `Int`        |               | Id da microrregião                   |
| microrregiao_nome         | `String`     |               | Nome da microrregião                 |
| mesorregiao_id            | `Int`        |               | Id da mesorregião                    |
| mesorregiao_nome          | `String`     |               | Nome da mesorregião                  |
| regiao_imediata_id        | `Int`        |               | Id da região imediata                |
| regiao_imediata_nome      | `String`     |               | Nome da região imediata              |
| regiao_intermediaria_id   | `Int`        |               | Id da região intermediária           |
| regiao_intermediaria_nome | `String`     |               | Nome da região intermediária         |
| uf_id                     | `Int`        |               | Id da UF                             |
| uf_sigla                  | `String`     |               | Sigla da UF                          |
| uf_nome                   | `String`     |               | Nome da UF                           |
| partos                    | `Parto[]`    | `OTHER MODEL` | Relação 1 para muitos com `Parto`    |
| predicoes                 | `Predicao[]` | `OTHER MODEL` | Relação 1 para muitos com `Predição` |

## Parto

| Nome          | Tipo        | Extra      | Significado                                      |
| ------------- | ----------- | ---------- | ------------------------------------------------ |
| ano           | `Int`       | `PK`       | Ano dos partos                                   |
| mes           | `Int`       | `PK`       | Mês dos partos                                   |
| parto_normais | `Int`       |            | Quantidade de partos normais                     |
| parto_cesaria | `Int`       |            | Quantidade de partos cesária                     |
| parto_total   | `Int`       |            | Quantidade total de partos                       |
| municipio     | `Municipio` |            | Relação muitos para 1 com `Municipio`            |
| municipio_id  | `Int`       | `PK`, `FK` | Id do município como estabelecido em `Municipio` |

_Importante denotar que a chave primária é composta por `ano`, `mes` e `municipio_id` e é referenciada pelo nome `id`._

## Predicao

| Nome         | Tipo        | Extra      | Significado                                        |
| ------------ | ----------- | ---------- | -------------------------------------------------- |
| tipo_parto   | `String`    | `PK`       | O tipo de parto (normal, cesária, total)           |
| lower        | `Int`       |            | O minímo possível para a próxima medição de partos |
| upper        | `Int`       |            | O maxímo possível para a próxima medição de partos |
| pred         | `Int`       |            | O valor esperado da próxima medição                |
| ano          | `Int`       | `PK`       | O ano da predição                                  |
| mes          | `Int`       | `PK`       | O mes da predição                                  |
| municipio    | `Municipio` |            | Relação muitos para 1 com `Municipio`              |
| municipio_id | `Int`       | `PK`, `FK` | Id do municipio como establecido em `Municipio`    |

## Usuário

| Nome       | Tipo      | Extra            | Significado                                                         |
| ---------- | --------- | ---------------- | ------------------------------------------------------------------- |
| email      | `String`  | `Unique`, `PK`   | Email do usuário                                                    |
| codigo     | `String`  | `Unique`         | Código do usuário(RGA ou SIAPE)                                     |
| hash       | `String`  |                  | Hash proveniente da senha do usuário                                |
| nome       | `String`  |                  | Nome do usuário                                                     |
| authorized | `Boolean` | `Default: False` | Se o usuário está autorizado para fazer certos comandos na aplicaão |
| admin      | `Boolean` | `Default: False` | Se o usuário é admin e possui acesso irrestrito a aplicação         |
