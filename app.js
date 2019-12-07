const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const papers = require('./lib/routes/api/v1/papers')
const footnotes = require('./lib/routes/api/v1/footnotes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Publications';

app.get('/', (request, response) => {
  response.send('Hello, Publications');
});

app.use('/api/v1/papers', papers)
app.use('/api/v1/footnotes', footnotes)


module.exports = app