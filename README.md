Enoncés :
- [énoncé du jour 1](#jour-1---mise-en-place)
- [énoncé du jour 2](#jour-2---crud)

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