FROM ruby:2.6.4

WORKDIR /app
COPY rails/* /app/

RUN bundle install

CMD ["bundle", "exec", "rails", "server"]