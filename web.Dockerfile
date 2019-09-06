FROM node:12-buster

# Apt
RUN apt-get update -y
RUN apt-get install vim -y

# Yarn also required?
# https://yarnpkg.com/lang/en/docs/install/#debian-stable
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
# RUN apt-get install yarn -y

WORKDIR /app

# Deps first
COPY package*.json ./
RUN npm install

# Now the app
COPY . .

CMD ["npm", "start"]