FROM node:18
WORKDIR /app
COPY package.json /app

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . /app
EXPOSE 3006
CMD ["node", "index.js"]