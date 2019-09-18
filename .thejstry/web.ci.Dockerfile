FROM node:12-buster

COPY . .

# Use CI's .env file
RUN mv .env.ci .env

# ci is like install, but different.
RUN npm ci

CMD ["npm", "run", "start"]