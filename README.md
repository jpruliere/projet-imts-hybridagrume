Enoncés :
- [énoncé du jour 1](#jour-1---mise-en-place)
- [énoncé du jour 2](#jour-2---crud)
- [énoncé du jour 3](#jour-3---méthodes-spécifiques)
- [énoncé du jour 4](#jour-4---api-rest)

Correction (facultif) :
- [correction du jour 1](./corrections/jour1.md)
- [correction du jour 2](./corrections/jour2.md)

# Hybrid'agrume

La société Hybrid'agrume vous contacte pour son projet d'application. Il s'agit d'une entreprise de biochimie qui travaille dans le croisement d'espèces de fruit, spécialisée dans les agrumes.

Actuellement, leurs chimistes travaillent avec un fichier Excel partagé dans le cloud mais certaines restrictions deviennent gênantes avec la croissance de l'équipe : la principale, c'est que la synchronisation du fichier local avec le cloud ne se fait qu'à l'enregistrement.

Si Daniel récupère le fichier pour ajouter une espèce, mais qu'Eric l'avait déjà récupéré pour supprimer 2 cultivars :
- Lorsque Daniel sauvegarde, le fichier contenant une nouvelle espèce est envoyé sur le cloud, mais Eric ne le récupère pas car il est déjà en train de travailler sur sa copie du fichier (copie devenue obsolète maintenant)
- Lorsqu'Eric sauvegarde, le fichier contenant 2 cultivars de moins mais pas la nouvelle espèce est envoyé sur le cloud, et Daniel a alors perdu son travail.

Lorsque les chercheurs n'étaient que 3 et travaillaient dans le même labo, souvent sur le même ordinateur, ça ne posait pas de problème. Mais la société compte maintenant 15 chercheurs, dont 2 boliviens et 1 australien, et 5 de ces chercheurs sont rattachés à des universités et travaillent depuis leur laboratoire universitaire. Il arrive fréquemment que quelqu'un récupère sa copie du fichier très tôt le matin (notamment à cause des différents fuseaux horaires) mais ne le sauvegarde qu'en fin de journée ou le lendemain matin : tout le monde perd alors une journée de travail...

Vous l'aurez compris, il va falloir un système vraiment centralisé, qui permet d'accéder aux données en temps réel, mais aussi de pouvoir les modifier sans impacter le travail des autres.

Un développeur frontend a été mis sur le coup, vous n'avez qu'à vous soucier du backend, donc de la base de données et de l'API.

# Quelques rappels avant de commencer

Ceci est un projet, une simulation d'un sujet sur lequel vous pourriez travailler dans votre vie professionnelle. Ce n'est ni noté, ni sanctionné d'une quelconque manière. C'est une occasion pour vous d'appliquer vos connaissances, de les réviser et de continuer à apprendre.

Je n'attends pas de vous que vous ayez tout retenu : les cours restent disponibles, Internet aussi, n'hésitez pas à en profiter.

Les énoncés de chaque jour, sauf le dernier, sont prévus pour vous occuper une journée mais vous pourriez terminer avant 17h. Dans ce cas, jetez un oeil aux bonus qui vous sont proposés en bas de chaque énoncé.

Dernier point qui a son importance, NE CODEZ PAS DANS CE REPO. Il sera mis à jour chaque matin pour contenir l'énoncé de la journée, quand vous ferez un pull pour le récupérer, vous risquerez de perdre votre travail. Créez un dossier sur votre machine, initialisez git et faîtes des commits fréquents. Même si ce n'est que pour un ou deux fichiers SQL, on peut tout versionner avec git pour peu que ça soit du texte. Et en cas de souci, vous pourrez push sur Github et me donner l'adresse de votre repo, je pourrai alors le cloner et étudier votre souci en local.

# Jour 1 - mise en place

Commençons par le début : vous avez un gros projet à coder et ce README comme unique point de départ, qu'allez-vous faire pour commencer sur de bonnes bases ?

Utiliser la méthode Merise évidemment. Pas dans son intégralité, juste les 2 phases qu'on a abordées en cours : MCD et MPD.

## MCD

Voilà tout ce dont vous avez besoin pour dresser un joli MCD. C'est un peu long, j'ai préféré mettre ça dans un fichier à part : [Entretien avec Gustave, grand patron de Hybrid'agrume](./interview.md)

NB: Pour que Gustave le comprenne, le MCD devra être écrit en français.

NB2: Pas d'obligation d'utiliser Mocodo, surtout si vous avez l'impression de prendre du retard. Continuez avec la version brouillon de votre MCD, vous en ferez une version propre plus tard.

## Transformation en MPD

Appliquez les règles de transformation abordées en cours pour franchir la frontière entre fonctionnel et technique et produire un script SQL prêt à être exécuté.

NB: Respectez les conventions du langage, notamment l'anglais pour le nommage des tables et des champs.

## Mise en place de la base

Depuis pgAdmin, sur votre serveur local, créez une nouvelle base puis exécutez-y le script que vous avez écrit pour mettre en place les tables (et peut-être autre chose).

Veillez à respecter les conventions de sécurité vues en cours, relatives à l'usage d'un compte superutilisateur pour accéder à une base.

Rappel : pour créer une nouvelle connexion (hôte + base + utilisateur + mot de passe) dans pgAdmin, il faut en fait créer un nouveau "serveur".

## Import des données

Le fichier [data.sql](./data.sql) contient des instructions INSERT permettant d'importer une partie des données d'Hybrid'agrume. Vous devez le compléter pour qu'il fonctionne dans votre base : le nom des tables est remplacé par "??" et le nom des colonnes par "?".

Vous devriez pouvoir deviner l'ordre des colonnes à partir des données insérées, à l'exception de l'amertume et de la jutosité, qui sont deux scores allant de 0 à 5 : le premier chiffre de chaque ligne est son score d'amertume, le deuxième son score de jutosité.

Importer les données dans votre base de développement a plusieurs bénéfices :
- Vous aurez des données à visualiser quand vous commencerez à écrire des requêtes de DML
- Le succès même de l'exécution du script permet de valider que vos tables ont le bon format
- Si vous oubliez la signification d'une colonne, les valeurs des champs correspondants peuvent vous aider à retrouver l'info

Bref, c'est toujours mieux d'avoir quelques données plutôt qu'une base vide.

NB: La dernière colonne de la deuxième table est une clé étrangère. Ses valeurs ne correspondront que si l'import des données de la première table a fonctionné du premier coup, sinon les id seront décalés et vous aurez des problèmes de référence. Pas de panique, la commande `TRUNCATE TABLE <table> RESTART IDENTITY;` permet de vider une table (comme un DELETE sans WHERE) tout en redémarrant la numérotation des id à 1. Utilisez la puis relancez l'import jusqu'à ce qu'il réussisse du premier coup.

## Petit couac

Dans le fichier d'import, une donnée n'était pas au bon format. Selon Gustave, l'amertume y est renseignée en notation Berkeley, une ancienne notation attribuant 5 aux agrumes tellement amers qu'ils ne sont pas comestibles et 0 aux agrumes sans la moindre trace d'amertume. Or, depuis 2004, la notation officielle est le score Lovelace, qui donne 0 aux agrumes affreusement amers et 5 aux fruits tous doux.

Ouf, c'est une simple histoire d'inversion. Pour éviter d'écrire 6 requêtes d'UPDATE pour remplacer une à une chaque valeur Berkeley par son équivalent Lovelace, réfléchissez à une formule pour passer de l'une à l'autre et faîtes un _UPDATE relatif_.

Si les maths ne sont pas votre point fort, vous pouvez ouvrir l'indice. Si vous ne trouvez toujours pas, dépliez la réponse.

<details>
  <summary>Indice</summary>

```
5 - 0 = 5
5 - 1 = 4
5 - 2 = 3
...
```
</details>

<details>
  <summary>Réponse</summary>

```
5 - Berkeley = Lovelace
```
</details>

## Finish line

![gif de victoire](https://media.giphy.com/media/jql8MStpd7x0WtbKxG/giphy.gif)

Si vous avez fait tout ce qui était décrit ci-dessus, bravo ! S'il n'est pas 17h et que vous avez encore envie d'en découdre, tentez [les bonus](./bonus.md) :wink:

# Jour 2 - CRUD

La base est en place, elle contient quelques données, on va pouvoir commencer à développer nos models. Qu'on utilise Sequelize ou pas, c'est comme ça qu'on a tendance à appeler nos composants d'accès aux données. Vous avez probablement entendu parler de l'architecture MVC, c'est ce même M.

## Mise en place

Parce que tout commence par un lien avec la base de données (sans ça, difficile de créer des models), initialisez un projet npm dans votre repo.

Pour le choix du connecteur (natif, query builder ou ORM), désolé, mais vous ne l'aurez pas cette fois-ci. Vous allez utiliser _Knex_.

Je ne vous force pas à utiliser systématiquement ses méthodes chaînables, vous pouvez écrire du SQL brut autant que vous voulez, mais pensez à utiliser des requêtes préparées si vous faîtes ça. Sinon, c'est l'injection SQL qui vous guette.

## findAll

Créez un dossier model, placez-y votre connecteur Knex puis importez-le dans deux nouveaux fichiers dans ce même dossier, un par table. A partir de ce connecteur, écrivez pour chaque table une méthode _findAll_ qui ne prend pas de paramètre et retourne toutes les lignes contenues dans la table sous la forme d'un tableau d'objets.

La méthode permettant de retrouver des variétés devra également contenir les informations liées à leur espèce, grâce à une jointure.

## fichier de test

Avant de passer à la suite, ça pourrait être bien de tester que nos _findAll_ fonctionnent. Comme ce sont des fonctions asynchrones, on ne peut pas juste écrire `await monModel.findAll()` dans un fichier et l'exécuter. Il faut utiliser `.then(console.table)` pour dire que lorsque la promesse de résultat sera remplie, on veut afficher le résultat dans un tableau dans la console.

Exécutez le fichier, si vous voyez vos variétés et vos espèces, c'est gagné.

## findOne

Même principe mais la fonction _findOne_ attend un paramètre, un id, pour ne retourner qu'une seule instance de model.

Testez dans votre fichier avec un id dont vous vous serez assurés de l'existence avant en allant regarder depuis pgAdmin.

## insert et destroy

Ces deux nouvelles méthodes (quatre, si on compte qu'elles doivent exister pour chaque model) attendent un paramètre, mais pas du même type. destroy attend un id, pour ne supprimer qu'une unique ligne dans la db. insert attend un objet, dont les propriétés deviendront les champs d'une nouvelle ligne en SQL.

Là encore, testez jusqu'à ce que tout fonctionne. Petite astuce, testez d'abord les insertions. Dans pgAdmin, récupérez les id des données insérées, vous pourrez les utiliser pour tester la suppression.

## update

Le dernier de la famille, celui qui peut s'avérer délicat quand on fait tout avec le connecteur _pg_ mais qui est une simple formalité avec les autres. Heureusement qu'on utilise Knex, ici, pas vrai ?

La méthode update attend 2 paramètres, un id d'abord pour préciser quelle est la ligne qu'on veut mettre à jour ; puis un objet qui contient les modifications.

Ici encore, tester sera essentiel pour vous assurer que tout marche. Mais puisque vous avez à présent un CRUD complet pour chaque model, pourquoi ne pas chercher un id pertinent dans chaque table via pgAdmin, puis faire, dans cet ordre, findOne > update > findOne. Vous allez voir 2 tableaux apparaître, celui contenant votre ligne avant modification et celui après.

Attention ici, la temporalité est primordiale. Si vous écrivez simplement ce qui suit :

```js
myModel.findOne(4).then(console.table);

myModel.update(4, { champ1: 'nouvelle valeur', champ2: 'nouvelle valeur' });
// les 3 requêtes vont partir quasiment en même temps, findOne va récupérer l'ancienne version de la ligne, avant update
myModel.findOne(4).then(console.table);
```

Vous allez voir 2 fois la même ligne, vous aurez l'impression que l'update n'a pas marché. Pourtant, il y a des chances qu'il ait bel et bien fonctionné, vous n'avez juste pas attendu que l'update soit terminé pour faire le _findOne_. Comment attendre ? Eh bien, toujours avec then :

```js
myModel.findOne(4).then(console.table);

myModel.update(4, { champ1: 'nouvelle valeur', champ2: 'nouvelle valeur' }).then(() => {
  // l'update est terminé, findOne va récupérer la nouvelle version de la ligne d'id 4
  myModel.findOne(4).then(console.table);
});
```

## Finish line

![gif de Salamèche épuisé](https://media.giphy.com/media/PiiQ5B1XxxiX6/giphy.gif)

Pfiou, si vous avez assez écrit de JS et de SQL pour la journée, bonne nouvelle, c'est tout ce que j'attendais de vous pour aujourd'hui. S'il vous reste encore un peu d'énergie, prenez une pause et tentez [les bonus du jour](./bonus2.md)

# Jour 3 - méthodes spécifiques

On a maintenant un CRUD complet de nos deux tables via nos deux models. On peut ajouter des espèces, modifier une variété, supprimer une espèce et... ah tiens, non, on ne peut pas vraiment supprimer une espèce. Je vous ai volontairement fait supprimer des données que vous veniez d'insérer hier, mais si vous essayez de supprimer l'espèce d'id 3 par exemple (le Citrus maxima, mieux connu sous le nom de pamplemousse), le SGBD ne se laisse pas faire et prétend qu'on viole une contrainte de clé étrangère, allons bon.

C'est en fait bel et bien le cas : si vous retirez l'espèce pamplemousse, que va-t-il advenir des cultivars Honey, Chandler et Sweetie ? Ces 3 variétés ont un *species_id* qui contient 3... Et 3, ça ne désigne plus rien dans la table *species*, c'est donc normal que la clé étrangère vous empêche de supprimer cette espèce.

Pas de panique, ce n'est pas un bug, c'est une fonctionnalité. Les clés étrangères peuvent agir de plusieurs manières lorsqu'on supprime des valeurs de la colonne à laquelle elles font référence, et par défaut, leur comportement est _RESTRICT_, c'est à dire qu'elles se manifestent pour empêcher la suppression.

On peut aussi leur demander de mettre leur valeur à _NULL_ si on suppprimer leur valeur de référence. Mais ici, un cultivar n'ayant pas d'espèce, c'est étrange. C'est bien pour ça qu'on a mis une contrainte _NOT NULL_ sur *species_id*.

On peut enfin demander aux clés étrangères de supprimer les lignes "enfants" lorsqu'on supprime un parent, avec le comportement _CASCADE_ : vous supprimez une ligne de _species_ (le pamplemousse, par exemple) et ça supprime _x_ lignes de _variety_ ayant le *species_id* correspondant (dans ce même exemple, les variétés Honey, Chandler et Sweetie). C'est un comportement pratique mais dangereux, car avec suffisamment de cascades dans une grande base de données, la suppression d'une seule ligne peut en engendrer des centaines d'autres.

Voilà pourquoi le comportement par défaut est _RESTRICT_ et c'est très bien comme ça. Si on demande à Gustave ce qu'il doit se passer lorsqu'on supprime une espèce, je pense qu'il vous répondra le plus simplement du monde : pour quelle obscure raison voudrait-on supprimer une espèce ? Si la société Hybrid'agrume mentionne une espèce dans son catalogue, c'est parce qu'elle propose une ou plusieurs de ses variétés (et qu'elle fait des recherches pour en développer d'autres, probablement).

La méthode `species.destroy` va donc couvrir un seul cas d'usage : celui de la suppression d'une espèce que vous venez d'ajouter par erreur, et qui n'a donc pas de variété.

Pourquoi je vous parle de tout ça ? C'est de la culture générale, c'est toujours bon à savoir :slightly_smiling_face:

Et comment on change ce comportement, si jamais vous en avez besoin un jour ? On ne peut pas une fois la clé étrangère créée, il faut :
- soit le prévoir au départ
- soit retirer la clé étrangère avec puis la recréer

Pour ces deux cas, voilà la syntaxe :

```sql
-- cas de la création d'une table
CREATE TABLE child (
  ...
  parent_id int NOT NULL REFERENCES parent (id) ON DELETE CASCADE, -- ou ON DELETE SET NULL, mais il faudra retirer la contrainte NOT NULL
  ... 
);

-- cas de la modification d'une table existante
-- suppression de la clé étrangère précédente
-- notez qu'il faut connaître son nom, l'explorateur de pgAdmin peut vous aider pour ça 
ALTER TABLE child DROP CONSTRAINT child_parent_id_fkey; -- le nom par défaut : table + underscore + champ + underscore + fkey
-- puis création de la nouvelle
ALTER TABLE child ADD FOREIGN KEY parent_id REFERENCES parent (id) ON DELETE CASCADE; --ou ON DELETE SET NULL, même remarque concernant l'incompatibilité avec NOT NULL
```

On commence l'énoncé d'aujourd'hui ?

## INSERT qui retourne quelque chose

REST, parmi ses nombreuses conventions pas toutes très simples à suivre, en définit une qu'on peut respecter facilement : *une route PUT doit retourner la ressource fraîchement insérée, avec une preuve de son insertion*. Ici, la preuve, c'est la présence d'un id. Dans une db relationnelle bien formée, toute donnée qui y est présente possède un id. Si j'envoie un payload pour insérer un cultivar, et qu'on me répond avec les mêmes données que mon payload + un id, je serai sûr et certain que la variété a été insérée.

Mais comment retrouver l'id qui vient d'être inséré ? Et d'éventuelles valeurs par défaut (qu'on ne précise pas dans le payload, donc) ? Il faudrait que l'endpoint d'insertion nous réponde avec toutes les propriétés de l'objet.

Je vous laisse chercher dans [la documentation d'INSERT](https://www.postgresql.org/docs/14/sql-insert.html) ce qui pourrait permettre de _retourner_ des données issues de l'insertion.

Côté Knex, cherchez le mot clé dans la doc, il existe en méthode chaînable :heart_eyes:

Précision utile : ce que je demande ici, ce n'est pas de coder le serveur Express et sa route _PUT_, uniquement de faire en sorte que les méthodes d'insertion retournent la ressource insérée. Ce qui nous facilitera la tâche quand on créera le serveur.

## Filtrer par amertume ou par jutosité

Un des cas d'usage de l'application de Gustave, c'est l'utilisation en tant que catalogue par les plantations qui achètent des arbres fruitiers à Hybrid'agrume. Ils ont alors besoin de retrouver rapidement des variétés et notamment de pouvoir les filtrer en fonction de leurs deux scores.

Vous allez implémenter les quatres méthodes suivantes (elles attendent toutes un nombre entre 0 et 5 en guise de param) :
- `findByMinJuiciness(minJu)` qui ne retourne que les variétés dont la jutosité est supérieure ou égale à _minJu_
- `findByMaxJuiciness(maxJu)` qui ne retourne que les variétés dont la jutosité est inférieure ou égale à _maxJu_
- `findByMinBitterness(minBi)` qui ne retourne que les variétés dont la jutosité est supérieure ou égale à _minBi_
- `findByMaxBitterness(minBi)` qui ne retourne que les variétés dont la jutosité est inférieure ou égale à _maxBi_

Oui, vous vous en doutez, ça va créer du code qui se répète. Mais ici, difficile de factoriser sans rendre votre code beaucoup plus complexe, donc tant pis, répétez votre code, profitez-en même pour utiliser le copier/coller pour coder les 3 autres une fois que la première est codée.

Attention, tout doit être testé. Mais là encore, vous pourrez copier/coller vos tests pour gagner du temps.

## Les espèces par famille, les variétés par nom d'espèce

Dans le catalogue, il y aura aussi un champ de recherche textuelle. La recherche textuelle dans une application frontend, c'est une chouette fonctionnalité. Côté backend, ça peut vite devenir un cauchemar quand un unique champ permet de chercher des infos issues de 20 colonnes différentes.

Pour l'instant, on n'y est pas. Ce champ va juste permettre de filtrer des espèces par famille lorsqu'on est sur la page qui liste les familles ; et des variétés par espèce lorsqu'on a sous les yeux la liste des espèces. Pas par *species_id*, non non, par *nom d'espèce*. Si je tape _pamplemousse_ dans le champ, seules les 3 variétés de pamplemousse Honey, Chandler et Sweetie doivent s'afficher. Pour ça, vous aurez besoin d'une jointure, tout simplement. Entraînez-vous en SQL depuis pgAdmin avant de coder ça en JS.

Vous pouvez nommer ces fonctions `findByFamily(family)` et `findBySpecies(speciesName)` respectivement.

## La même, mais avec de la recherche progressive

Ce qu'on appelle la recherche progressive en UX, c'est le fait que la recherche se lance dès qu'on saisit les quelques premiers caractères de notre critère dans le champ de recherche. Au fur et à mesure qu'on tape, la recherche s'affine.

Ce que ça signifie concrètement côté backend, c'est qu'on va recevoir des choses comme `pampl` en guise de recherche et qu'il va falloir s'en contenter pour trouver les bonnes variétés. Comme il y a assez peu d'espèces dans notre base, la plupart commence par des lettres différentes mais vous pourrez tester en tapant `citr` par exemple, qui devra retourner les variétés de **citr**on vert ET celles de **citr**on jaune, soit dans un même array : le 'Bonnie Brae', le 'Eureka' et le sur 'Macrophylla'.

Et comment on fait ça en SQL, rechercher un chaîne *qui commence* par des caractères. Eh bien, vous allez le trouver par vous-même :wink:

On n'oublie pas de tester pour s'assurer que ça marche, siouplaît.

## Finish line

![gif de victoire tranquille](https://media.giphy.com/media/yjukPn2GGbMC4/giphy.gif)

Bravo, vous y êtes arrivé.e, ça vaut bien une petite pause pour respirer le bon air frais de l'extérieur et boire un café, un thé ou un apéro en fonction de l'heure. Par contre, s'il est encore trop tôt pour un apéro, il est aussi trop tôt pour s'arrêter en si bon chemin. Place aux [bonus](./bonus3.md)

# Jour 4 - API REST

L'application fonctionne à merveille, tout est là. Tout, sauf une interface web pour interagir avec nos données. Puisque tout est là _côté données_ et que vous avez déjà eu quelques occasions d'utiliser Express et ses middlewares, il ne devrait pas vous falloir tant de temps que ça pour créer l'API web d'Hybrid'agrume.

Le développeur frontend a déjà fini son application mais vous ne pouvez pas y avoir accès car il ne l'a pas encore livrée. Puisqu'il a fini son travail, c'est lui qui a décidé du nom des endpoints que vous allez créer. Ce n'est pas un souci car il est parti du principe que vous alliez respecter les conventions REST en termes de nommage, d'utilisation des méthodes HTTP etc.

Il a fourni une magnifique documentation Swagger (un outil qui sert principalement à formater la doc d'une API REST) disponible [ici](https://jpruliere.github.io/projet-imts-hybridagrume/). Vous trouverez, en explorant cette documentation, toutes les infos dont vous avez besoin pour mettre en place l'API qui fonctionnera parfaitement avec le frontend.

## Quelques petits conseils quand même

- Procédez route par route et testez avec Postman.
- Ignorez pour l'instant les différents [codes de réponse](https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP) pour chaque endpoint.
- Vérifiez bien le nom de chaque endpoint, il doit correspondre parfaitement, sinon l'app front essayera de contacter des endpoints qui n'existent pas dans votre API.
- Si vous n'avez pas codé la méthode `findBetween` (bonus du jour 3), vous pouvez la reprendre de la correction pour vous permettre de coder l'endpoint correspondant.

## Une fois que c'est fini

Cet après-midi, vous allez présenter votre travail. S'il est midi et quelques au moment où vous terminez votre API, restez-en là, refaites un tour de l'application, commentez les parties un peu obscures dont vous n'êtes pas complètement sûr.e du fonctionnement. Sinon, vous pouvez commencer à gérer les différents codes de réponse des endpoints.

- Pour les routes GET, qui retournent soit une ressource soit un ensemble de ressources, le code est 200, mais c'est le code par défaut, il n'y a rien à modifier.
- Idem pour les routes PUT, qui retournent la ressource modifiée en guise de preuve qu'elle a bien été modifiée.
- 201 et 204 sont des codes de succès indiquant chacun une particularité de la réponse :
  - 201 signifie que la ressource a été créée (routes POST), et la ressource retournée, avec son id, en est bien la preuve.
  - 204 signifie qu'on n'envoie pas de contenu, juste le code, ce qui est cohérent pour les routes DELETE, vu que le contenu... vous venez de le supprimer.
- 404, vous connaissez bien ce code normalement, ici il va permettre de prévenir le client qu'il essaye d'accéder à une ressource qui n'existe pas (= dont l'id ne correspond à rien dans la db). Le plus simple pour gérer correctement ces cas, c'est de lancer un `findOne` avec l'id demandé avant de réaliser l'action attendue de l'endpoint. Si cet appel ne retourne rien, vous pouvez interrompre le middleware et répondre 404.
  - Les endpoints de type `GET /ressources/:id`, utilisent déjà `findOne` pour retourner la ressource. Pas besoin d'invoquer `findOne` avant de relancer la même fonction, gérez plutôt ce qu'elle retourne : si elle retourne quelque chose, renvoyez 200, si elle ne retourne rien (qui est assimilable à _false_), renvoyez 404.
- 400, c'est pour tous les cas où les données envoyées par le client (un id dans l'url, un objet dans le body etc.) sont malformées. Ex: `GET /varieties/tralala`, cet endpoint s'attend à recevoir un nombre, l'id d'une variété, mais il a reçu "tralala" : ça ne va pas marcher, il faut renvoyer une 400.
  - Pour les vérifications simples, comme l'id, vous pouvez utiliser du JS natif (`parseInt` par exemple)
  - Pour vérifier le format d'un payload, penchez plutôt pour Joi.

## True finish line

![gif de véritable victoire](https://media.giphy.com/media/u3xrWx0ni9EZy/giphy.gif)

Si vous arrivez à réaliser tout ça avant la présentation de cet après-midi, chapeau ! Sinon, c'est pas grave, vous pourrez tout de même finir ça tranquillement quand vous trouverez le temps. Ca fera un beau projet dans votre portfolio.