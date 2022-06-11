# Football-API

Ce répertoire contient l'API utilisant elle-même une api externe, permettant de récupérer l'ensemble des données sur les matchs et les équipes (scores,côtes,...).

Cette API est codée en javascript grâce au framework express.

Nous utilisons l'API https://apifootball.com/documentation/ comme source de données. Nous utilisons le plan gratuit donc nous sommes limités à 180 requêtes par heure, mais nous sommes également limités sur certaines ligues et matchs.

Cette API contient 3 méthodes principales :

- getNextMatch/:teamId

Cette méthode permet de récupérer le prochain match d'une équipe à partir de son teamId (défini par l'API externe que nous utilisons). Elle affiche le prochain match de l'équipe s'il n'a pas commencé, dans le cas contraire, elle appelle le prochain chemin que je vais présenter.

- getCurrentMatch/:matchId

Cette méthode permet de récupérer les informations sur un match en cours à partir de son ID. Elle retourne un certain nombre d'informations comme le score, la minute de jeu, l'heure de début...

- getLastMatches/:teamId

Cette méthode permet de récupérer les informations des 5 derniers matchs d'une équipe.

- getFinishedMatch

Cette méthode permet de récupérer les informations d'un match terminé, notamment pour connaître le gagnant d'un match. Elle est notamment utilisée dans WorkAdventure pour la partie résultats de paris.

- getOdds/:teamId

Cette méthode permet de récupérer les côtes des victoires ainsi que du match nul pour le match en cours, s'il y en a un, de l'équipe donnée. Cette méthode est notamment utilisée côté WorkAdventure pour la partie prise de paris.

Autrement, l'API est principalement utilisée sur le site https://foot.kreyzix.com. Le code source de ce dernier est disponible sur le répertoire suivant : https://github.com/jrivo/football-website


