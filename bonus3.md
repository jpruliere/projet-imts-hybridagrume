# Les bonus du jour 3

Si tu as oublié de commit ton code, c'est le moment de le faire. En codant ces bonus, qui ne manquent pas de piquant :cactus:, tu pourrais casser ton code alors qu'il fonctionnait bien avant que tu les commences, ça serait dommage.

Si, à un moment, tu as l'impression que c'est le cas et que ton code est cassé mais que tu ne trouves pas pourquoi, utilise `git reset --hard HEAD` pour revenir au dernier commit fonctionnel.

## findBetween

On a dit dans l'énoncé qu'il n'était pas facile de factoriser les quatre fonctions de filtrage par score. Ce n'est pas faux mais il y a un moyen de contourner cette difficulté : proposer une unique fonction qui filtre en fonction de ce qu'elle reçoit. Cette fonction permettra d'ailleurs d'aller bien plus loin dans le filtrage.

Cette fonction, c'est `findBetween(criteria)`. Le param `criteria` est un objet qui peut contenir 2 propriétés `juiciness` et `bitterness` (l'une, l'autre ou les deux). Et ces deux propriétés sont aussi des objets, qui peuvent contenir 2 propriétés `min` et `max` (l'une, l'autre ou les deux).

Voici comment elle fonctionne avec des exemples concrets :

```js
variety.findBetween({ juiciness: { max: 3 }}); // retourne toutes les variétés, peu importe l'amertume mais la jutosité ne doit pas dépasser 3
variety.findBetween({ bitterness: { min: 1, max: 4 }}); // retourne toutes les variétés, peu importe la jutosité mais l'amertume doit être entre 1 et 4 inclus
variety.findBetween({ juiciness: { max: 2 }, bitterness: { min: 4 }}); // retourne toutes les variétés ayant au moins 4 en amertume et au plus 2 en jutosité
variety.findBetween({ juiciness: { max: 3 }, bitterness : { max: 4, min: 4 }}); // retourne toutes variétés dont l'amertume est de 4 (entre 4 et 4, il n'y pas beaucoup de valeurs) et dont la jutosité est 0, 1, 2 ou 3
```

Pour écrire cette grosse fonction, rappelez vous que si les méthodes de Knex sont chaînables, c'est parce que chacune retourne un objet sur lequel existent toutes les autres :

```js
const myParkings = await knex('parking').select(['name', 'address', 'area']).where({ pricing: 'gratuit' });

// est équivalent à
const etape1 = knex('parking');
const etape2 = etape1.select(['name', 'address', 'area']);
const etape3 = etape2.where({ pricing: 'gratuit' });
const myParkings = await etape3;
```

En sachant ça et avec quelques _if_, ça devrait le faire.

Dernier caillou dans votre chaussure, comment enchaîner plusieurs conditions (en SQL, `WHERE cond1 AND cond2 AND cond3` etc.) ? Voilà un indice :

```js
console.log(knex('parking').select().where({ area: 'plage' }).where({ pricing: 'gratuit' }).toString())
// affichage : select * from "parking" where "area" = 'plage' and "pricing" = 'gratuit'
```

## Le petit détail qui change tout

Gustave a oublié de nous prévenir : une variété `Moro`, ça ne veut rien dire. Le nom de la variété, c'est `Citrus sinensis L. Moro`. C'est à dire le nom de l'espèce puis le nom de cultivar, séparés par un espace. Il faut répercuter la modification partout :scream: Et ce n'est pas une petite modification, car il faut mettre en place des jointures partout.

Pas de panique, on va plutôt découvrir une notion du futur, qui existe en fait depuis très longtemps en SQL, la notion de _vue_. Une vue, c'est comme une table, sauf que ce n'est pas vraiment une table, c'est le résultat d'une requête SELECT, qu'on va utiliser comme si c'était une table. On pourra manipuler les colonnes que la requête SELECT a retournées pour les selectionner à nouveau, les transformer, filtrer dessus avec un WHERE etc.

Un exemple concret avec ces bons vieux parkings et leurs chantiers :

```sql
-- une vue, c'est du DDL, on la crée une seule fois et on peut ensuite l'utiliser sans limites
-- les vues, on a le droit de les nommer au pluriel, ça peut aider à les différencier des tables d'ailleurs
CREATE VIEW upcoming_maintenances AS
-- ici, une requête SELECT classique
SELECT maintenance.id, maintenance.start_date, maintenance.nature, parking.name AS parking
FROM maintenance
JOIN parking ON parking.id = maintenance.parking_id
WHERE start_date > now(); -- upcoming = futur, donc on ne prend que les chantiers qui n'ont pas commencé

-- une fois la vue crée, on peut l'utiliser comme une table
SELECT * FROM upcoming_maintenances; -- pratique non ?

-- on peut accéder aux colonnes de la vue, pour filtrer par exemple
SELECT parking FROM upcoming_maintenances WHERE nature = 'agrandissement'; -- le nom des parkings concernés par des agrandissements futurs

-- si la colonne n'a pas été retournée par le SELECT de la déclaration de la vue, elle ne sera pas accessible
SELECT end_date FROM upcoming_maintenances; -- ERROR: ERREUR:  la colonne « end_date » n'existe pas

-- une vue ne sait pas d'où provient une colonne, les colonnes lui appartiennent toutes directement
SELECT maintenance.start_date FROM upcoming_maintenances; -- ERROR: ERREUR:  entrée manquante de la clause FROM pour la table « maintenance »
SELECT start_date FROM upcoming_maintenances; -- ça fonctionne
SELECT upcoming_maintenances.start_date FROM upcoming_maintenances; -- ça fonctionne aussi, mais ça ne sert pas à grand chose de le préciser ici
```

Avec toutes ces infos, tentez de créer une vue nommée `variety_with_full_name` qui reproduit le schéma de la table `variety` mais avec le nom d'espèce dans le nom de cultivar.

L'objectif est d'obtenir, à partir de la table `variety` qui contient :

 cultivar | bitterness | juiciness | species_id 
----------|------------|-----------|------------
  Osbeck  |  4  |  5  |  1  
  Moro  |  5  |  5  |  1  
  Sanguinello  |  2  |  5  |  1  
  Hook  |  3  |  0  |  2  
  ... | ... | ... | ...

La vue `variety_with_full_name` qui contient :

 cultivar | bitterness | juiciness | species_id 
----------|------------|-----------|------------
  Citrus sinensis L. Osbeck  |  4  |  5  |  1  
  Citrus sinensis L. Moro  |  5  |  5  |  1  
  Citrus sinensis L. Sanguinello  |  2  |  5  |  1  
  Citrus aurantium L. Hook  |  3  |  0  |  2  
  ... | ... | ... | ...

Attention à conserver tous les champs et leur nom, pour s'assurer que rien ne casse quand on substitue la table par la vue.

Si vous avez réussi à créer la vue et que `SELECT * FROM variety_with_full_name;` vous retourne quelque chose qui vous semble cohérent, vous avez fait 99% de ce bonus.

Il ne vous reste qu'à modifier le model _variety_ pour remplacer l'un par l'autre, __uniquement dans les requêtes effectuant des SELECT (les find*)__ car puisque ce n'est pas vraiment une table, on ne peut pas faire d'insertion, de suppression ou de modification sur une vue, uniquement de la lecture.

Pour vérifier que tout fonctionne, utilisez votre fichier de test, il n'y a rien à modifier, il suffit de constater que le nom d'espèce s'affiche bien maintenant dans les méthodes du model _variety_.