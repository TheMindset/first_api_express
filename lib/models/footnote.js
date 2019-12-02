const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);


const all = () => database('footnotes').select()

const find = (id) => database('footnotes').where('id', id).select()

module.exports = {
  all,
  find,
}