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

module.exports = {
  index,
}