# <p align="center"> Projeto INISA<br/> Universidade Federal de Mato Grosso do Sul (UFMS) </p>

<p align="center">
  <img src="inisa.jpg" height="175px" />
  <br/>
</p>
Este repositório tem como objetivo armazenar os códigos do Projeto Inisa, uma parceria entre a Enfermagem, a Facom e o Instituto de Matemática.

## Estrutura do documento

- [Descrição do projeto](#descri%C3%A7%C3%A3o-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Requisitos](#requisitos)
- [Instalação](#instala%C3%A7%C3%A3o--implanta%C3%A7%C3%A3o)
- [Primeiros passos](#primeiros-passos)
- [Autores e histórico](#autores-e-hist%C3%B3rico)
- [Licença](#licen%C3%A7a)

## Descrição do projeto

O Datasus disponibiliza informações da situação sanitária de todo Brasil, por meio do Tabnet. Neste aplicativo, os gestores conseguem realizar análises sobre questões como parto e anomalias dos recém-nascidos, a fim de quantificar e avaliar as principais necessidades de investimento na saúde pública - no caso deste projeto, do Mato Grasso do Sul.

O processo de instalação do programa, a coleta de dados, a procura específica por região estatal e a predição dos dados são pouco práticos para os gestores.

Assim, para facilitar o entendimento das principais necessidades de cada cidade do Mato Grosso do Sul, propõe-se a criação de uma plataforma web para análise de dados. Além das informações serem alimentadas periodicamente, o sistema também realizará uma predição. Tudo isso será realizado de forma visual, com o uso de gráficos.

## Funcionalidades

O sistema possui como principais funcionalidades:

- [ ] Inserção de dados
- [ ] Filtragem por cidade
- [ ] Representação gráfica da principais informações de cada cidade
- [ ] Criação da parte administrativa e dos usuários (acadêmicos da iniciação científica)
- [ ] Predição de dados

## Requisitos

Aqui você deve apresentar todos os requisitos para que sua aplicação funcione corretamente. Você também pode listar dependências opcionais, se houver.

Começe indicando qual, ou quais, sistemas operacionais são suportados. Por exemplo: `Este sistema foi desenvolvido e amplamente testado em ambientes Unix ...`

Para cada uma das dependências do sistema é importatne listar também a versão mínima necessária.

- [Docker](https://www.docker.com/) (versão 20 ou superior)
  - Se necessário, você pode deixar alguma observação ou instrução necessária.
- [Prisma](https://www.prisma.io)
- [React](https://reactjs.org) (versão 18.2.0)
- [TypeScript](https://www.typescriptlang.org) (versão 4.8.4)

---

- [R](https://www.r-project.org/) (vesão 4.2 ou superior) com os seguintes pacotes:
  
  - compiler
  
  - forecast
  
  - fpp2
  
  - acp
  
  - tscount
  
  - ggplot2
  
  - car

---



## Instalação / Implantação

Nesta seção você deverá trazer um passo a passo do que é necessário para a implantação do sistema desenvolvido.

Preferencialmente, use de ferramentas que automatizem a instalação/implantação do sistema, ou partes dele. Por exemplo, se você precisa compilar os arquivos do sistema para utilizá-lo, uma ótima opção é o [Make](https://www.gnu.org/software/make/). Com ele é possível automatizar todo processo de preparação e compilaçãocom um simples comando no terminal:

```sh
make
```

Outras ferramentas podem, inclusive, automatizar o processo de inicialização dos serviços da ferramenta, como o [Docker Compose](https://docs.docker.com/compose/):

```sh
docker-compose up -d
```

Se o sistema precisa ser implantado manualmente, descreva detalhadamente os passos necessários para a correta instalação. Neste caso, u

1. Abra um terminal no diretório do projeto ....
2. Instale as dependências usando o comando xxxx ...
3. Compile o código fonte com o comando yyyy ...
4. ....

Por fim, lembre-se de destacar quando necessário quais variáveis de ambientes (do inglês _environment variables_) são utilizadas ou necessárias para o processo. Muitas vezes a falta destas variáveis pode causar erros e impedir a correta implantação do sistema.

## Primeiros passos

Use esta seção para mostrar os primeiros passos para usar a aplicação. Lembre-se que esta parte deve ser focada no uso pelos clientes finais da aplicação, portanto, seja objetivo e use _screenshots_ quando necessário.

## Autores e histórico

Este sistema foi desenvolvido pela seguinte equipe:

- [José Pedro Cândido Lopes Peres](https://github.com/PeterYouseph) (peteryouseph@gmail.com)
- [Leonardo Kazuyoshi Takahashi da Silva](https://github.com/leonardo-kazu) (leonardo.kazuyoshi@ufms.br)
- [Letícia Yurie Kokubu](https://github.com/leyurie) (leticia.yuurie@gmail.com)

Orientado pelo professor [Hudson Silva Borges](https://github.com/hsborges) e proposto por Nathan Aratani.

> :warning: Se o projeto for de continuidade, vocẽ deverá mencionar qual e criar um link para o projeto original.

## Licença

Este sistema está disponível sob a licença [XXXX](https://opensource.org/licenses/).

> :warning: Você deve discutir a licença com seu professor orientador!

> :warning: Lembre-se também de criar, ou alterar, o arquivo LICENSE deste repositório para refletir adequadamente a licença atual.
