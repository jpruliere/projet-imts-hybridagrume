# Les bonus du jour 2

Tu connais maintenant le principe : aller un peu plus loin aujourd'hui parce que l'heure qu'il est et ton niveau d'énergie restante te le permettent.

Aujourd'hui, on ne va pas prendre de l'avance sur le projet mais plutôt creuser un sujet complexe : automatiser nos tests.

Si tu as oublié de commit ton code, c'est le moment de le faire. En mettant les tests en place, tu pourrais casser ton code alors qu'il fonctionnait bien avant que tu commences les bonus, ça serait dommage.

Si, à un moment, tu as l'impression que c'est le cas et que ton code est cassé mais que tu ne trouves pas pourquoi, utilise `git reset --hard HEAD` pour revenir au dernier commit fonctionnel.

## Jest

Jest est un framework de test unitaire écrit en JS. Il permet de tester facilement tout ce qu'on veut. Ici, on va tester nos models et leur CRUD. Commence par lire un peu de documentation sur le site officiel, puis essaye d'écrire ton premier test dans un fichier `index.test.js` à la racine. En guise de premier test, vérifie que `cor` concaténé à `saire` donne bien `corsaire`. Ca a l'air idiot, mais ça va te permettre de comprendre le principe.

Pour lancer le test, utilise `npm run test` après avoir ajouté le script `test` dans ton _package.json_ comme indiqué dans la documentation.

Pour voir ce que donne un test qui échoue, tu peux tester que `cor` concaténé à `saire` donne `matelot`.

Ok pour le principe ?

Une dernière précision utile : les fichiers de test sont détectés automatiquement par Jest, il suffit qu'ils suivent une règle de nommage simple : qu'ils soient nommés `ceQuiEstTesté.test.js`. Tu vas donc créer 2 fichiers de test, un par model et les nommer comme leur fichier respectif, mais avec `.test.js` en guise d'extension. Tu peux supprimer `index.test.js`, c'était juste le temps de découvrir la syntaxe.

## Test des CRUD

Pour le reste, je te laisse tâtonner et tenter des choses. L'objectif, c'est d'avoir une série de test qui, quand tu la lances, s'assure que toutes les méthodes des 2 models fonctionnent correctement. La doc de Jest est plutôt bien faite, elle est même dispo en français si vraiment tu as du mal avec la langue de Shakespeare. Courage !