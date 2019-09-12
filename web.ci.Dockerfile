FROM node:12-buster

COPY . .

RUN npm ci

CMD ["npm", "run", "start"]