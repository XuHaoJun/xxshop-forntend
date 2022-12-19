ARG NODE_VERSION="16.18.1"
ARG ALPINE_VERSION="3.16"



#
## Base Stage
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base-stage
WORKDIR /app
RUN apk add --no-cache tzdata


# 
## Dependencies Stage
FROM base-stage AS dependencies-stage
# COPY prepare.js .
COPY package.json yarn.lock ./
# 只安裝 production 相關模組，並複製出來，準備給 Release Stage 使用
RUN yarn install --frozen-lockfile --production
RUN cp -R node_modules /production_node_modules
# prod & dev 模組全部安裝
RUN yarn install --frozen-lockfile


# 
## Build Stage
FROM dependencies-stage AS build-stage
ENV NODE_ENV=production
COPY package.json yarn.lock ./
COPY next.config.js server.js ./
COPY tsconfig.json postcss.config.js tailwind.config.js ./
COPY app app
COPY components components
COPY dtos dtos
COPY hooks hooks
COPY styles styles
# pwa will generate in build time
COPY public public
# because build time require call API_PROXY
COPY .env .
RUN npm run build


# 
## Release Stage
FROM base-stage AS release-stage
ENV NODE_ENV=production
ENV TZ Asia/Taipei

COPY --from=dependencies-stage /production_node_modules node_modules
COPY --from=build-stage /app/.next .next
COPY --from=build-stage /app/public public

COPY package.json next.config.js .env server.js ./

# EXPOSE 3000

CMD []
ENTRYPOINT ["npm", "run", "start"]

