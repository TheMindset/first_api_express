const Paper = require('../models/paper')

const index = (request, response) => {

  Paper.all()
  .then((papers) => {
    response.status(200).json(papers)
  })
  .catch((error) => {
    response.status(500).json({ error })
  })
}

const show = (request, response) => {
  let id = request.params.id

  Paper.find(id).then(papers => {
    if (papers.length) {
      response.status(200).json(papers)
    } else {
      response.status(400).json({
        error: `Could not find paper with id ${request.params.id}`
      });
    }
  })
  .catch(error => {
    response.status(500).json({ error })
  });
}

const showFootnotes = (request, response) => {
  let id = request.params.id

  Paper.findFootnotes(id)
  .then(footnotes =>{
    if (footnotes.length) {
      response.status(200).json(footnotes)
    } else {
      response.status(400).json({
        error: `Could not found footnotes for paper with this ${id}`
      })
    }
  })
  .catch(error => {
    response.status(500).json({ error })
  })
}

const create = (request, response) => {
  let paper = request.body;

  for (let requiredParameter of ['title', 'author']) {
    if (!paper[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, author: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }
  
  Paper.newPaper(paper)
  .then(paper => {
      response.status(201).json({ id: paper[0] })
    })
  .catch(error => {
    response.status(500).json({ error })
  })
}

module.exports = {
  index,
  show,
  showFootnotes,
  create,
}