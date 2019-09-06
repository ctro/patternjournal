# Pattern Journal

This is a web app that tracks whether things happened on a day or not.
It also lets you add some notes.

## Docker Setup

Basically `docker-compose up`.

```bash
# Help debugging web container
docker-compose run web bash

# Help debugging db container
docker-compose run db bash

```

### Express Backend

Express back-end

### Elm Frontend

The frontend is in (elm)[https://elm-lang.org/]. (Start Here)[https://guide.elm-lang.org/] to learn about Elm.

#### Start a local Server

`elm reactor` is a simple dev-focused local server included with Elm.
It's an easy option but doesn't allow for custom CSS, etc.

We use [elm-live](https://github.com/wking-io/elm-live), an after-market dev server.
`npm install` to get it. `script/serve` to start it up.