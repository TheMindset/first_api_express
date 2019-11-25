
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('footnotes').del()
  .then(() => knex('papers').del())

  // Now that we have a clean slate, we can re-insert our paper data
  .then(() => {
    return Promise.all([

      // Insert a single paper, return the paper ID, insert 2 footnotes
      knex('papers').insert({
        title: 'Fooo', author: 'Bob', publisher: 'Minnesota'
      }, 'id')
      .then(paper => {
        return knex('footnotes').insert([
          { note: 'Lorem', paper_id: paper[0] },
          { note: 'Doler', paper_id: paper[0] }
        ])
      })
      .then(() => console.log('Seeding complete'))
      .catch(error => console.log(`Error seeding data: ${error}`))
    ]) // end return Promise all
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
};
