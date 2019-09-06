FROM node:12-buster

# Apt
RUN apt-get update -y
RUN apt install vim -y

# Yarn also required?
# https://yarnpkg.com/lang/en/docs/install/#debian-stable
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
# RUN apt-get install yarn -y


# Set the workdir, copy files and start the server
WORKDIR /app
COPY express/* /app/

RUN npm install

CMD ["node", "app.js"]