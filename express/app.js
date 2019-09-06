const express = require('express')
const app = express()
const port = 3000
const binding = "127.0.0.1"

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, binding, () => console.log(`Example app listening on port ${port}!`))