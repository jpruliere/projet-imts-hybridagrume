const knex = require('./client');

const findAll = async () => {
  return await knex('variety')
    .select([ // pour éviter le conflit d'id, on va devoir lister
      'variety.*', // pratique pour commencer par dire qu'on veut tous les champs de variety
      'species.scientific_name',
      'species.common_name',
      'species.family'
    ])
    .join('species', 'species.id', '=' , 'variety.species_id');
};

const findOne = async (id) => {
  return await knex('variety')
    .select([ // idem findAll ici
      'variety.*',
      'species.scientific_name',
      'species.common_name',
      'species.family'
    ])
    .join('species', 'species.id', '=', 'variety.species_id')
    .where({ 'variety.id': id }); // attention, ici, id est ambigü, il faut préciser de quel id on parle
};

const insert = async (payload) => {
  await knex('variety').insert(payload); // Knex va générer tout seul la liste des colonnes et les valeurs en fonction de ce qu'il trouve dans payload
};

const destroy = async (id) => {
  await knex('variety').delete().where({ id }); // simple et efficace
};

const update = async (id, payload) => { // id pour identifier la ligne à modifier, payload pour désigner ce qui est modifié
  await knex('variety').update(payload).where({ id });
};

module.exports = {
  findAll,
  findOne,
  insert,
  destroy,
  update
};