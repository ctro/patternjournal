FROM node:12-buster

WORKDIR /app

# # Deps first
# COPY package*.json ./
# RUN npm install --global

# Now the app
COPY . .

RUN NODE_ENV=development npm ci --global
RUN ls -alh

CMD ["npm", "start"]