FROM node:12-buster

COPY . .

# ci is like install, but different.
RUN npm ci

CMD ["npm", "run", "start"]