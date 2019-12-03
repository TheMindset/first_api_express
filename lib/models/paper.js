const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => database('papers').select()
const find = (id) => database('papers').where('id', id).select()
const findFootnotes = (id) => database('footnotes').where('footnotes.paper_id', id).select()
module.exports = {
  all,
  find,
  findFootnotes
}