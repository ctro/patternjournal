# Intended to run in Development

FROM node:12-buster

WORKDIR /app

# Deps first
COPY package*.json ./
RUN npm install

# Now the app
COPY . .

CMD ["npm", "run", "start-dev"]