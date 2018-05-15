# ========================== Base Image ==========================
FROM alpine:3.4 AS base

LABEL maintainer="douglas.expalves@gmail.com"

RUN apk update && apk add --no-cache nodejs && rm -rf /var/cache/apk/*

# ========================== Build Image ==========================
FROM alpine:3.4 AS builder

RUN apk update && apk add --no-cache nodejs && mkdir /pokemon_api

COPY ./package.json ./pokemon_api/package.json

WORKDIR /pokemon_api

RUN npm install

COPY . .

RUN npm run build

# ========================== Runtime Image ==========================
FROM base AS runtime

RUN mkdir -p /pokemon_api/dist

COPY ./package.json ./pokemon_api/package.json

WORKDIR /pokemon_api/

COPY --from=builder /pokemon_api/dist ./dist/

RUN npm install --production

ENTRYPOINT ["npm", "start"]
