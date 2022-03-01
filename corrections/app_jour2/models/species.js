const knex = require('./client');

const findAll = async () => {
  return await knex('species').select(); // rien à ajouter ici, on veut toutes les données de la table
};

const findOne = async (id) => {
  return await knex('species').select().where({ id }); // comme vu en cours, on passe un objet à .where et il se débrouille, pratique
};

const insert = async (payload) => {
  await knex('species').insert(payload); // Knex va générer tout seul la liste des colonnes et les valeurs en fonction de ce qu'il trouve dans payload
};

const destroy = async (id) => {
  await knex('species').delete().where({ id }); // simple et efficace
};

const update = async (id, payload) => { // id pour identifier la ligne à modifier, payload pour désigner ce qui est modifié
  await knex('species').update(payload).where({ id });
};

module.exports = {
  findAll,
  findOne,
  insert,
  destroy,
  update
};