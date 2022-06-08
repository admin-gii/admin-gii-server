/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('domains')
    .del()
    .then(() => {
      return knex('domains').insert([
        {
          name: 'News',
          slug: 'news',
        },
        {
          name: 'Ads',
          slug: 'ads',
        },
      ]);
    });
};
