# syntax = edrevo/dockerfile-plus
INCLUDE+ Dockerfile.image

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package.json

RUN yarn install

COPY . .

RUN yarn prisma generate
RUN yarn build

ENV DATABASE_URL=
ENV PORT=80

CMD yarn start
