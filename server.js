import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded(({ extended: true })));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

app.post('/api/shorturl', urlAuth, (req, res) => {
  const originalURL = req.body.origURL;
  urlList.push(originalURL);
  res.send({
    'original_url': originalURL,
    'short_url': urlList.length - 1,
  })
})

app.get('/api/:short', (req, res) => {
  const short = req.params.short
  console.log(short);
  res.redirect(urlList[short]);
})

function urlAuth(req, res, next) {
  try {
    new URL(req.body.origURL);
    next()
  } catch (error) {
    res.send({
      'error': 'invalid url',
    })
  }
}

const urlList = [];

app.listen(PORT);
