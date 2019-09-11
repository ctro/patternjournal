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

Re-create the database

```bash
docker-compose up db
docker-compose exec --user postgres db dropdb pj_dev
docker-compose exec --user postgres db createdb pj_dev
```

A console-like experience

```bash
node
var models = require('./models/index')
models.User.create();
.exit
```

### Frontend

## CI

CI in [Github Actions](https://github.com/ctro/patternjournal/actions).
Configuration in `.github/workflows/` folder.

## Debugging

VSCode Debugger should work with the included configuration.
Use the `Debug` menu. Set breakpoints in the editor.

## Some nice dev tools

- [http://lvh.me](http://lvh.me) always points to localhost, useful for OAuth setups
- Ngrok is a secure public tunnel to localhost


## Auth for pages

Auth currently has three states

1. `isAuthd` where app loads routers in `app.js` -- applies to entire route
2. `isAuthd` in a route, at the method level, authenticates one route
3. `{ user: req.user }` in the render section to pass a potential user, like in the homepage

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