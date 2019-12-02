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

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});

// Static routes
app.use('/api/v1/papers', papers)

// app.get('/api/v1/footnotes', (request, response) => {
//   database('footnotes').select()
//   .then((footnotes) => {
//     response.status(200).json(footnotes);
//   })
//   .catch((error) => {
//     response.status(500).json({ error });
//   });
// });
app.use('/api/v1/footnotes', footnotes)


// Post routes
app.post('/api/v1/papers', (request, response) => {
  const paper = request.body;

  for (let requiredParameter of ['title', 'author']) {
    if (!paper[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, author: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('papers').insert(paper, 'id')
    .then(paper => {
      response.status(201).json({ id: paper[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/footnotes', (request, response) => {
  const footnote = request.body;

  for(let requiredParameter of ['note', 'paper_id']) {
    if (!footnote[requiredParameter]) {
      return response.status(422)
      .send({ error: `Expected format: { note: <String>, paper_id: <Integer>}. You're missing a "${requiredParameter}" property.`});
    }
  }

  database('footnotes').insert(footnote, 'id')
  .then(footnote => {
    response.status(201).json({ id: footnote[0] })
  })
  .catch( error => {
    response.status(500).json({ error })
  });
});


// Dynamique routes
app.use('/api/v1/papers', papers)


app.get('/api/v1/footnotes/:id', (request, response) => {
  database('footnotes').where('id', request.params.id).select()
  .then(footnotes => {
    if (footnotes.length) {
      response.status(200).json(footnotes)
    } else {
      response.status(400).json( {
        error: ` Could not find footnotes with id ${request.params.id}`
      });
    }
  })
  .catch(error => {
    response.status(500).json({ error })
  });
});