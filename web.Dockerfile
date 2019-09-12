FROM node:12-buster

WORKDIR /app

# Deps first
COPY package*.json ./
RUN npm install --global

# Now the app
COPY . .

CMD ["npm", "start"]