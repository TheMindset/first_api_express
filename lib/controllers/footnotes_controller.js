const Footnote = require('../models/footnote')

const index = (request, response) => {
  Footnote.all()
  .then((footnotes) => {
    response.status(200).json(footnotes);
  })
  .catch((error) => {
    response.status(500).json({ error })
  })
}

const show = (request, response) => {
  let id = request.params.id
  Footnote.find(id)
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
}

const create = (request, response) => {
  const footnote = request.body;

  for(let requiredParameter of ['note', 'paper_id']) {
    if (!footnote[requiredParameter]) {
      return response.status(422)
      .send({ error: `Expected format: { note: <String>, paper_id: <Integer>}. You're missing a "${requiredParameter}" property.`});
    }
  }

  Footnote.checkId(footnote)
  .then(paper_ids => {
    if (paper_ids.indexOf(parseInt(footnote.paper_id)) === -1) {
      return response.status(422)
      .send({ error: 'The paper id provided does not exists'})
    } else {
      Footnote.newFootnote(footnote)
      .then(footnote => {
        response.status(201).json({ id: footnote[0] })
      })
      .catch( error => {
        response.status(500).json({ error })
      })
    }
  })
}

module.exports = {
  index,
  show,
  create,
}