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

module.exports = {
  index,
  show,
}