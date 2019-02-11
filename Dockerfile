FROM node:alpine
MAINTAINER Ivo von Putzer Reibegg <ivo.putzer@gmail.com>

ENV NODE_ENV development

WORKDIR /usr/src
COPY package.json package-lock.json ./

RUN npm install --no-optional --no-progress\
 && npm cache clean --force --silent

COPY ./ ./
RUN npm run postinstall

EXPOSE 80

ENTRYPOINT ["npm"]
CMD ["start"]
