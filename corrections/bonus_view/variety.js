// n'essayez pas d'exécuter ce fichier, il n'est plus dans le bon dossier
const knex = require('./client');

// plus besoin de factoriser les colonnes, on va juste SELECT * FROM notre vue

// idem pour la jointure, plus besoin de la faire

const findAll = async () => {
  return await knex('variety_with_full_name')
    .select();
};

const findOne = async (id) => {
  return await knex('variety_with_full_name')
    .select()
    .where({ id })
    .first();
};

// requêtes d'écriture, on garde la table
// on ne peut pas écrire dans une view
const insert = async (payload) => {
  return await knex('variety') // pensez à ajouter le return, on ne se contente plus d'attendre, on retourne le résultat
    .insert(payload)
    .returning('*') // * pour signifier qu'on veut tous les champs de la nouvelle ligne
    .first(); // en gros, le returning transforme un insert en select, donc il faut lui préciser qu'on ne veut que le premier résultat retourné, sinon on obtient un array
};

// idem
const destroy = async (id) => {
  await knex('variety').delete().where({ id }); // simple et efficace
};

// idem
const update = async (id, payload) => { // id pour identifier la ligne à modifier, payload pour désigner ce qui est modifié
  await knex('variety').update(payload).where({ id });
};

const findByMinJuiciness = async (minJu) => {
  return await knex('variety_with_full_name').select().where('juiciness', '>=', minJu);
};

const findByMaxJuiciness = async (maxJu) => {
  return await knex('variety_with_full_name').select().where('juiciness', '<=', maxJu);
};

const findByMinBitterness = async (minJu) => {
  return await knex('variety_with_full_name').select().where('bitterness', '>=', minJu);
};

const findByMaxBitterness = async (maxJu) => {
  return await knex('variety_with_full_name').select().where('bitterness', '<=', maxJu);
};

const findBySpecies = async (speciesName) => {
  return await knex('variety_with_full_name').select().where('common_name', 'LIKE', speciesName + '%'); // LIKE permet de la recherche par "motif", le % permet de préciser "puis n'importe quels caractères"
};

const findBetween = async (criteria) => {
  let request = knex('variety_with_full_name').select();

  // je récupère les 2 éventuelles propriétés
  const { juiciness, bitterness } = criteria;

  // puis je teste leur existence
  if (juiciness) {
    // même principe ici
    const { min, max } = juiciness
    if (min) {
      request = request.where('juiciness', '>=', min);
    }
    if (max) {
      request = request.where('juiciness', '<=', max);
    }
  }
  if (bitterness) {
    // même principe ici
    const { min, max } = bitterness
    if (min) {
      request = request.where('bitterness', '>=', min);
    }
    if (max) {
      request = request.where('bitterness', '<=', max);
    }
  }

  // la requête est composée sur mesure, il ne reste qu'à l'exécuter
  return await request;
}

module.exports = {
  findAll,
  findOne,
  insert,
  destroy,
  update,
  findByMinJuiciness,
  findByMaxJuiciness,
  findByMinBitterness,
  findByMaxBitterness,
  findBySpecies,
  findBetween
};