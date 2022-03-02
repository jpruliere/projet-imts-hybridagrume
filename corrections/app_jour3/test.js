// je commence par dotenv, pour que knex puisse se connecter à ma base
require('dotenv').config();

// j'importe mes models
const species = require('./models/species');
const variety = require('./models/variety');

// je prépare des payloads pour les insert
const newSpecies = {
  scientific_name: 'Citrus Solacroupus',
  common_name: 'solac',
  family: 'orange'
};

const modifiedSId = 3 // pamplemousse
const modifiedSpecies = {
  common_name: 'pamplebulle'
};

const newVariety = {
  cultivar: 'Janus',
  bitterness: 5,
  juiciness: 2,
  species_id: 15
};

const modifiedVId = 9 // Rio star, jutosité 2
const modifiedVariety = {
  cultivar: 'Lisbon moon',
  juiciness: 5
};

// c'est parti
/*
// les find
species.findAll().then(console.table);
species.findOne(4).then(console.table);

variety.findAll().then(console.table);
variety.findOne(17).then(console.table);
*/

/*
// les insert
species.insert(newSpecies).then(() => species.findAll().then(console.table));
variety.insert(newVariety).then(() => variety.findAll().then(console.table));
*/
// Citrus Solacroupus => id 17
// Janus => id 32

/*
// les destroy
species.destroy(17).then(() => species.findAll().then(console.table));
variety.destroy(32).then(() => variety.findAll().then(console.table));
*/
// plus de Citrus Solacroupus => ça marche
// plus de Janus => ça marche

/*
// les update
species.findOne(modifiedSId).then(console.table);
species.update(modifiedSId, modifiedSpecies)
  .then(() => species.findOne(modifiedSId).then(console.table));

variety.findOne(modifiedVId).then(console.table);
variety.update(modifiedVId, modifiedVariety)
  .then(() => variety.findOne(modifiedVId).then(console.table));
*/