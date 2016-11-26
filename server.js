let webpack = require('webpack')
let webpackDevMiddleware = require('webpack-dev-middleware')
let config = require('./webpack.config')

let app = new (require('express'))()
let port = 3200

let compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))


// Dependencies
let express = require("express"),
    http = require('http'),
    fs = require("fs"),
    path = require('path')

app.use('/', express.static(__dirname + '/'))

app.get('/*.mp3', (req, res) => {
    res.sendFile(__dirname + `/www/${req.params['0']}.mp3`)
})

app.get('/*.mp4', (req, res) => {
    res.sendFile(__dirname + `/www/${req.params['0']}.mp4`)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/www/index.html')
});

app.listen(port, '127.0.0.1', function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})
