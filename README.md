# Hybrid'agrume

La société Hybrid'agrume vous contacte pour son projet d'application. Il s'agit d'une entreprise de biochimie qui travaille dans le croisement d'espèces de fruit, spécialisée dans les agrumes.

Actuellement, leurs chimistes travaillent avec un fichier Excel partagé dans le cloud mais certaines restrictions deviennent gênantes avec la croissance de l'équipe : la principale, c'est que la synchronisation du fichier local avec le cloud ne se fait qu'à l'enregistrement.

Si Daniel récupère le fichier pour ajouter une espèce, mais qu'Eric l'avait déjà récupéré pour supprimer 2 cultivars :
- Lorsque Daniel sauvegarde, le fichier contenant une nouvelle espèce est envoyé sur le cloud, mais Eric ne le récupère pas car il est déjà en train de travailler sur sa copie du fichier (copie devenue obsolète maintenant)
- Lorsqu'Eric sauvegarde, le fichier contenant 2 cultivars de moins mais pas la nouvelle espèce est envoyé sur le cloud, et Daniel a alors perdu son travail.

Lorsque les chercheurs n'étaient que 3 et travaillaient dans le même labo, souvent sur le même ordinateur, ça ne posait pas de problème. Mais la société compte maintenant 15 chercheurs, dont 2 boliviens et 1 australien, et 5 de ces chercheurs sont rattachés à des universités et travaillent depuis leur laboratoire universitaire. Il arrive fréquemment que quelqu'un récupère sa copie du fichier très tôt le matin (notamment à cause des différents fuseaux horaires) mais ne le sauvegarde qu'en fin de journée ou le lendemain matin : tout le monde perd alors une journée de travail...

Vous l'aurez compris, il va falloir un système vraiment centralisé, qui permet d'accéder aux données en temps réel, mais aussi de pouvoir les modifier sans impacter le travail des autres.

Un développeur frontend a été mis sur le coup, vous n'avez qu'à vous soucier du backend, donc de la base de données et de l'API.