const Paper = require('../models/paper')

const index = (request, response) => {

  Paper.all()
  .then((papers) => {
    response.status(200).json(papers);
  })
  .catch((error) => {
    response.status(500).json({ error });
  })
}

module.exports = {
  index,
}