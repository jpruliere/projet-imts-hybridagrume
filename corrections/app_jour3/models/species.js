const knex = require('./client');

const findAll = async () => {
  return await knex('species').select(); // rien à ajouter ici, on veut toutes les données de la table
};

const findOne = async (id) => {
  return await knex('species').select().where({ id }).first(); // comme vu en cours, on passe un objet à .where et il se débrouille, pratique
};

const insert = async (payload) => {
  return await knex('species')
    .insert(payload)
    .returning('*')
    .first();
};

const destroy = async (id) => {
  await knex('species').delete().where({ id }); // simple et efficace
};

const update = async (id, payload) => { // id pour identifier la ligne à modifier, payload pour désigner ce qui est modifié
  await knex('species').update(payload).where({ id });
};

const findByFamily = async (family) => {
  return await knex('species')
    .select()
    .where(knex.raw('family::text'), 'LIKE', family + '%');
    // family n'est pas un type text, ça y ressemble, mais c'est un enum
    // et on ne peut pas utiliser LIKE sur les enums directement
    // l'astuce, c'est qu'on peut tout à fait caster l'enum en text puis utiliser LIKE avec ce text, ce que je fais ici
};

module.exports = {
  findAll,
  findOne,
  insert,
  destroy,
  update,
  findByFamily
};