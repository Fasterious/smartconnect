# SmartConnect

SmartConnect est une application web simple pour la surveillance et la gestion de gateways IoT. Cette application permet de visualiser les données collectées par des capteurs connectés à des gateways, d'analyser les performances via des KPIs et de gérer les paramètres de l'application.

## Aperçu

![Aperçu de SmartConnect](https://api.microlink.io/?url=https://fasterious.github.io/smartconnect/&screenshot=true&meta=false&embed=screenshot.url)

## Démo en ligne

Une démo en ligne est disponible [ici](https://fasterious.github.io/smartconnect/).

## Fonctionnalités

- **Dashboard des Gateways** : Visualisez l'état de vos gateways et les données des capteurs en temps réel.
- **Ajout et Groupement** : Ajoutez de nouvelles gateways et organisez-les en groupes.
- **KPIs** : Consultez les indicateurs clés de performance pour surveiller l'état global du système.
- **Paramètres** : Configurez l'application selon vos besoins.

## Structure du Projet

```
smartconnect/
├── index.html            # Page d'accueil (Dashboard)
├── kpis.html             # Page des KPIs
├── settings.html         # Page des paramètres
├── css/
│   └── style.css         # Styles CSS
├── js/
│   ├── data.js           # Données de démo
│   ├── app.js            # Logique principale
│   ├── kpis.js           # Logique pour la page KPIs
│   └── settings.js       # Logique pour la page paramètres
└── README.md             # Documentation
```

## Installation et Utilisation

Aucune installation spéciale n'est nécessaire. Cette application utilise du HTML, CSS et JavaScript vanilla sans dépendances externes.

1. Clonez ou téléchargez ce dépôt
2. Ouvrez le fichier `index.html` dans votre navigateur pour accéder à l'application

## Notes sur l'Application de Démonstration

Cette application est une démonstration fonctionnelle des interfaces demandées. Dans un environnement de production, plusieurs améliorations seraient nécessaires :

- **Backend** : Développement d'une API pour stocker et récupérer les données des gateways et des capteurs
- **Authentification** : Mise en place d'un système d'authentification
- **Graphiques avancés** : Utilisation d'une bibliothèque de graphiques pour des visualisations plus riches
- **Temps réel** : Ajout de WebSockets pour des mises à jour en temps réel
- **Optimisation** : Amélioration des performances et de l'expérience utilisateur

## Fonctionnement

L'application simule un système où chaque gateway est connectée à plusieurs capteurs (température, humidité, etc.). Les données sont affichées dans des cartes sur le dashboard principal, et des statistiques globales sont disponibles sur la page KPIs.

### Le Dashboard

Le dashboard principal affiche toutes les gateways enregistrées, leur statut, et les données de leurs capteurs. Vous pouvez :

- Rechercher des gateways par nom, emplacement ou adresse IP
- Ajouter une nouvelle gateway
- Créer un groupe de gateways
- Voir les détails d'une gateway ou la supprimer

### Les KPIs

La page KPIs affiche des indicateurs clés de performance pour surveiller l'état global du système. Vous pouvez filtrer les données par période (jour, semaine, mois, année).

### Les Paramètres

La page des paramètres vous permet de configurer l'application selon vos besoins. Elle est divisée en plusieurs sections :

- **Général** : Paramètres généraux de l'application
- **Notifications** : Configuration des alertes
- **Sécurité** : Gestion des mots de passe et de l'authentification
- **Données** : Configuration de la rétention et sauvegarde des données
- **Utilisateurs** : Gestion des utilisateurs de l'application 