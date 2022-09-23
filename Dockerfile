FROM node:16 AS build

WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:16

# 환경변수
ENV NODE_ENV        production

WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY --from=build /app/dist dist

EXPOSE 3000

CMD [ "yarn", "start" ]