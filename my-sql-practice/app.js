const PORT = process.env.PORT || 8000,
      cors = require('cors'),
      path = require('path'),
      morgan = require('morgan'),
      express = require('express'),
      webpack = require('webpack'),
      bodyParser = require('body-parser'),
      webpackConfig = require('./webpack.config'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware');


//Express invocation
const app = express()
const router = express.Router()
require('dotenv').config({ silent: true})

//Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Webpack Configuration
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath, noInfo: true
}))
app.use(webpackHotMiddleware(compiler))

app.use('/api', require('./routes/api'))

app.get('/', (req, res) => {
  let filepath = path.resolve('index.html')
  res.sendFile(filepath)
})

app.listen(PORT, err => {
  console.log( err || `Express listening on port ${8000}`)
})