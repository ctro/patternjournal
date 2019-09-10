FROM node:12-buster

# Apt
RUN apt-get update -y
RUN apt-get install vim -y

WORKDIR /app

# Deps first
COPY package*.json ./
RUN npm install

# Now the app
COPY . .

CMD ["npm", "start"]