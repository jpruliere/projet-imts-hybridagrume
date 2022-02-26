# Les bonus du jour 1

Ok, la base est en place et il n'est pas encore 17h... Et si on prenait un tout petit peu d'avance sur demain ? On va mettre en place un début de structure JS pour manipuler nos données.

Comme c'est un bonus, le guidage sera moindre par rapport à l'énoncé, je préfère prévenir.

Il faut que je commence par te révéler une info que je donnerai dans l'énoncé de demain : pour ce projet, tu vas utiliser Knex. Pas le choix. Tu peux écrire autant de SQL brut que tu veux avec `knex.raw`, ou utiliser systématiquement les méthodes chaînables, mais pas de connecteur pg ni de Sequelize pour ce projet :no_good:

## mise en place

Dans ton dossier de travail, initialise npm et installe de quoi te connecter à une base Postgres (+ de quoi renseigner des identifiants locaux sans les versionner). Pense à créer un `.gitignore` pour ne pas versionner *node_modules* non plus.

## findAll

Crée un nouveau dossier `models`. On ne va pas utiliser Sequelize mais c'est un nom qu'on a tendance à donner systématiquement aux modules qui nous servent à gérer nos données.

Dans ce dossier, après avoir créé un connecteur à la base dans un fichier séparé, importe-le dans 2 autres nouveaux fichiers, un par table. Ecris la méthode `findAll` de chacun de ces 2 modules (pense à l'exporter).

## findAll avec jointure

La table des variétés devrait logiquement être liée à celle des espèces dans ta base. Fais en sorte que le `findAll` de ce model retourne également l'espèce associée. Attention, si tu ne précises pas les colonnes, tu vas récupérer 2 id et le second écrasera le premier.

Si en récupérant la variété 17, tu vois qu'elle a un id 10, c'est que l'id de l'espèce a remplacé celui de la variété. Le 10 doit se trouver uniquement dans la colonne de clé étrangère.