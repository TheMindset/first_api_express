const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const papers = require('./lib/routes/api/v1/papers')
const footnotes = require('./lib/routes/api/v1/footnotes')

// const createFootnote = require('./lib/models/footnote')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Publications';

app.get('/', (request, response) => {
  response.send('Hello, Publications');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});

// Static routes
app.use('/api/v1/papers', papers)

app.use('/api/v1/footnotes', footnotes)


// Post routes
// app.post('/api/v1/papers', (request, response) => {
//   const paper = request.body;

//   for (let requiredParameter of ['title', 'author']) {
//     if (!paper[requiredParameter]) {
//       return response
//         .status(422)
//         .send({ error: `Expected format: { title: <String>, author: <String> }. You're missing a "${requiredParameter}" property.` });
//     }
//   }

//   database('papers').insert(paper, 'id')
//     .then(paper => {
//       response.status(201).json({ id: paper[0] })
//     })
//     .catch(error => {
//       response.status(500).json({ error });
//     });
// });

app.use('/api/v1/footnotes', footnotes)


// Dynamique routes
app.use('/api/v1/papers', papers)
