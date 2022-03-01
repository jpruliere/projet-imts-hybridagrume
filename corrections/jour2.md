# Correction du jour 1

Parce qu'un bon code vaut mieux qu'un long discours, je vais surtout t'inviter à regarder attentivement le contenu du dossier [app_jour2](./app_jour2), notamment les commentaires dans le code.

Pour la mise en place, voici les étapes :
- `npm init -y` pour créer un projet NPM sans poser de questions
- `npm i knex pg dotenv` parce que j'ai tout bonnement besoin de ces 3 paquets pour coder ce qui est demandé
- créer le fichier `.gitignore` pour éviter de commit `node_modules` ainsi que `.env` (parce que mes identifiants de connexion ne fonctionneront pas chez vous)
- je renseigne mon `.env` avec PGDATABASE, PGUSER etc. puis je le c/c en `.env.example` dont je retire les valeurs, je ne laisse que les noms