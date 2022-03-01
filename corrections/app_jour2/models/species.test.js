require('dotenv').config();
const species = require('./species');

describe('Species model', () => {
  test('findAll returns every row', async () => {
    const allSpecies = await species.findAll();

    // pas grand chose à tester sur le résultat global, hormis que c'est un tableau
    expect(allSpecies).toBeInstanceOf(Array);

    // on va ensuite prendre un élément arbitrairement
    // le 0, on est sûrs qu'il existe toujours
    expect(allSpecies[0]).toHaveProperty('scientific_name');
    expect(allSpecies[0]).toHaveProperty('common_name');
    expect(allSpecies[0]).toHaveProperty('family');
  });

  test('findOne returns one row', async () => {
    // attention, ici, ce n'est pas optimal de choisir un id arbitraire car il peut avoir été supprimé
    // idéalement, on teste d'abord l'insertion, on récupère l'id inséré et on teste le findOne avec cet id, qui existe forcément
    // et après, on peut même tester le destroy avec cet id, comme ça, on fait tout avec le même id
    const oneSpecies = await species.findOne(4);

    expect(oneSpecies).toHaveProperty('scientific_name');
    expect(oneSpecies).toHaveProperty('common_name');
    expect(oneSpecies).toHaveProperty('family');
  });

  // test()
  // test()
  // test()

  // ...

  // l'idée ici est d'écrire au moins un test par méthode
  // ça permet de s'assurer que nos méthodes fonctionnent toujours,
  // même quand on fait évoluer l'application et qu'on les retouche potentiellement
})