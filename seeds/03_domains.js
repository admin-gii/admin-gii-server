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
          id: 1,
          name: 'News',
          slug: 'news',
        },
        {
          id: 2,
          name: 'Ads',
          slug: 'ads',
        },
      ]);
    });
};
