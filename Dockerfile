FROM node:20-alpine3.17 as dev-dependencies
WORKDIR /app
COPY package.json package.json
RUN yarn install --frozen-lockfile --network-timeout 100000


FROM node:20-alpine3.17 as builder
WORKDIR /app
COPY --from=dev-dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:20-alpine3.17 as prod-dependencies
WORKDIR /app
COPY package.json package.json
RUN yarn install --prod --frozen-lockfile --network-timeout 100000

FROM node:20-alpine3.17 as prod

EXPOSE 9108
WORKDIR /app
COPY --from=prod-dependencies /app/node_modules ./node_modules
COPY  --from=builder /app/dist ./dist
COPY  /ssl/pucei_edu_ec.crt ./ssl/pucei_edu_ec.crt
COPY  /ssl/pucei_edu_ec.key ./ssl/pucei_edu_ec.key
CMD [ "node", "dist/main.js" ]