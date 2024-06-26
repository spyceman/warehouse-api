FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN npx prisma generate

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "run", "start:dev"]
