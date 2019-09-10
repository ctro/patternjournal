# Pattern Journal

This is a web app that tracks whether things happened on a day or not.
It also lets you add some notes.

## Docker Setup

Basically `docker-compose up`.

Haven't automated creating the database yet, so do that then restart the webserver.
Create the database `docker-compose exec --user postgres db createdb pj_dev`

```bash
# Help debugging web container
docker-compose run web bash

# Help debugging db container
docker-compose run db bash

```

### Backend

- [Express](https://expressjs.com/en/guide/routing.html) server
- [Sequelize](https://sequelize.org/master/manual/getting-started.html) for ORM
- [Passport](http://www.passportjs.org/packages/passport-google-oauth/) for auth

A console-like experience

```bash
node
var models = require('./models/index')
models.User.create();
.exit
```

### Frontend

## Some nice dev tools

- [http://lvh.me](http://lvh.me) always points to localhost, useful for OAuth setups
- Ngrok is a secure public tunnel to localhost

## Routing

Urls are like

```
/
/404
/patterns
/patterns/new
/patterns/1
/day/2019/04/20
```