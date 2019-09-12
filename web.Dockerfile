FROM node:12-buster

WORKDIR /app

# # Deps first
# COPY package*.json ./
# RUN npm install --global

# Now the app
COPY . .

RUN npm install

CMD ["npm", "start"]