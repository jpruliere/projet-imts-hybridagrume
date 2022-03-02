const knex = require('./client');

// on factorise, pour éviter de se répéter
const columns = [
  'variety.*',
  'species.scientific_name',
  'species.common_name',
  'species.family'
];

// on peut faire ça aussi ;-)
const varietyWithSpecies = knex('variety').join('species', 'species.id', '=' , 'variety.species_id');

const findAll = async () => {
  return await varietyWithSpecies
    .select(columns);
};

const findOne = async (id) => {
  return await varietyWithSpecies
    .select(columns)
    .where({ 'variety.id': id })
    .first();
};

const insert = async (payload) => {
  return await knex('variety') // pensez à ajouter le return, on ne se contente plus d'attendre, on retourne le résultat
    .insert(payload)
    .returning('*') // * pour signifier qu'on veut tous les champs de la nouvelle ligne
    .first(); // en gros, le returning transforme un insert en select, donc il faut lui préciser qu'on ne veut que le premier résultat retourné, sinon on obtient un array
};

const destroy = async (id) => {
  await knex('variety').delete().where({ id }); // simple et efficace
};

const update = async (id, payload) => { // id pour identifier la ligne à modifier, payload pour désigner ce qui est modifié
  await knex('variety').update(payload).where({ id });
};

// si après ça, vous n'êtes pas des champions du copier/coller :-D
const findByMinJuiciness = async (minJu) => {
  return await varietyWithSpecies.select(columns).where('juiciness', '>=', minJu);
};

const findByMaxJuiciness = async (maxJu) => {
  return await varietyWithSpecies.select(columns).where('juiciness', '<=', maxJu);
};

const findByMinBitterness = async (minJu) => {
  return await varietyWithSpecies.select(columns).where('bitterness', '>=', minJu);
};

const findByMaxBitterness = async (maxJu) => {
  return await varietyWithSpecies.select(columns).where('bitterness', '<=', maxJu);
};

const findBySpecies = async (speciesName) => {
  return await varietyWithSpecies.select(columns).where('species.common_name', 'LIKE', speciesName + '%'); // LIKE permet de la recherche par "motif", le % permet de préciser "puis n'importe quels caractères"
};

const findBetween = async (criteria) => {
  let request = varietyWithSpecies.select(columns);

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