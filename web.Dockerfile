FROM ruby:2.6.4

# Elm needs Node. Yarn also required, and it installs Node for us
# https://yarnpkg.com/lang/en/docs/install/#debian-stable
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -y 
RUN apt-get install yarn -y

# Simple bundle install cache
COPY rails/Gemfile /tmp/
WORKDIR /tmp
RUN bundle install

# Set the workdir, copy files and start the server
WORKDIR /app
COPY rails/* /app/

CMD ["bundle", "exec", "rails", "server", "--binding=0.0.0.0"]