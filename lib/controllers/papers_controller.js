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

module.exports = {
  index,
  show,
}