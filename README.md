# Pattern Journal

This is a web app that tracks whether things happened on a day or not.
It also lets you add some notes.

[![codecov](https://codecov.io/gh/ctro/patternjournal/branch/master/graph/badge.svg?token=7qIIszMqvI)](https://codecov.io/gh/ctro/patternjournal)

## Super high-level reqs

- Debian Buster (10)
- Node 12

## Docker Setup

Basically `docker-compose up`.

Haven't automated creating the database yet, so do that then restart the webserver.
Create the databases for dev and test

```bash
docker-compose exec --user postgres db createdb pj_dev
docker-compose exec --user postgres db createdb pj_test
```

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

### Db

Create migrations with `./node_modules/.bin/sequelize-cli migration:generate --name create-user`

Run migrations: `docker-compose run web npm run migrate`

## Tests

`npm run test` to run tests.

You can also run a test watcher, I do this in the VSCode terminal: `docker-compose run web npm run test-watch`. It doesn't catch file changes but it does make it easy to re-run the tests.

See [Jest Cheatsheet](https://devhints.io/jest) for assertion, mocking, etc hints.

There is also a VSCode debugger option to debug Jest tests. It launches locally, not in Docker. Docker can't be running while you run this VSCode debugger.

## CI

CI in [Github Actions](https://github.com/ctro/patternjournal/actions).
Configuration in `.github/workflows/` folder.

## Debugging

VSCode Debugger should work with the included configuration.
Use the `Debug` menu. Set breakpoints in the editor.

## Some nice dev tools

### lvh.me

It just points to localhost.
[http://lvh.me](http://lvh.me) always points to localhost, useful for OAuth setups

### Ngrok

Need to test on iphone?
Ngrok is a secure public tunnel to localhost: https://ngrok.com/download

```bash
./ngrok/ngrok.exe http 3000
```

## Production

### Packer

Use [Packer](https://packer.io) to build machine images.
We run both the server and the database on one small VM.
We expect `packer.exe` to be in `bin/`
You need an `account.json`, [Instructions](https://www.packer.io/docs/builders/googlecompute.html)

Files related to Packer builds are in `image/`

Build the image: `./image/build.ps1`

### Launch the image

For now just launch and configure one by hand in the Google UI.
I can enable HTTP/S traffic from the interface. I can SSH from a browser!

### Image Boot steps

1. Set up Oauth for prod.
    - This is a one-time setup. 
    - Create credentials and save `.env.prod` in the `image` folder.
    - It's in `.gitignore` already, the image will be built with this included.

2. Set up Github creds
    - This is a one-time setup. 
    - Create credentials and save `.ssh` in the `image` folder.
    - It's in `.gitignore` already, the image will be built with this included.

Need to create GCP bucket. Multi-region US. "Nearline", "Bucket Policy". Retention Policy 3 years.
Need to create Service user for this. "Storage Admin". Create a JSON key.

### Analytics

[G.Analytics Dashboard](https://analytics.google.com/analytics/web/#/report-home/a149375566w211762316p203314667)


### Using PM2

- `pm2 reload | restart | stop`
- `pm2 list | status`
- `pm2 logs`
- `pm2 monit` 😵 This is as good as our monitoring gets now. No alerting yet :)
