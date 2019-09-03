# Pattern Journal

This is a web app that tracks whether things happened on a day or not.
It also lets you add some notes.

## Setup

This is an (elm)[https://elm-lang.org/] project. (Start Here)[https://guide.elm-lang.org/].

### Start a local Server

`elm reactor` is a simple dev-focused local server.

### Install packages

`elm install elm/time`

### TODO

URL: https://package.elm-lang.org/packages/elm/url/1.0.0/Url-Parser


 
 #### A Better Dev Env

Edit: What I decided to do was add the link tags to a custom HTML file and output elm to JS instead of HTML. I’m also using elm-live 4 to serve everything. All my static files live in a dist folder. This includes css, images, main.js, and index.html. Then I run this command:
elm-live src/Main.elm --open --dir=./dist -- --output=./dist/main.js

https://github.com/wking-io/elm-live
