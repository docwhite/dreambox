const axios = require('axios')
const express = require('express')
const multer = require('multer')

var isDev = process.env.NODE_ENV !== 'production';
const app = express()

if (isDev) {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');


  const webpackCompiler = webpack(webpackConfig);
  const wpmw = webpackMiddleware(webpackCompiler, {});
  app.use(wpmw);

  const wphmw = webpackHotMiddleware(webpackCompiler);
  app.use(wphmw);
} else {
  app.use(express.static('dist'))
}
const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, '/uploads'),
  filename: (req, file, callback) => callback(null, file.originalname)
});

const upload = multer({storage: storage}).single('file');
app.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.end("Error uploading file.");
    }
    axios.get(`http://api.dreambox.com/newimage?image=${req.file.path}`)
      .then(response => {
        res.json({
          status: response.status,
          message: "all good",
          body: response.data
        });
      })
      .catch(error => {
        res.json({
          status: error.response.status,
          message: error.response.statusText,
          body: error.response.data
        });
      });
  })
});

app.listen(3000, () => console.log(`Example app listening! NODE_ENV: ${process.env.NODE_ENV}`))
