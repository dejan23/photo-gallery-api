FROM node:17-alpine

WORKDIR "/app"

COPY package.json ./

RUN yarn

COPY . .

# Start up
CMD ["yarn", "start"]