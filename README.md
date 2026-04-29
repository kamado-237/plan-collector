# 🌿 PhytoScrape — Plateforme d'Analyse des Plantes Médicinales

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![Chart.js](https://img.shields.io/badge/Chart.js-4.x-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-En%20ligne-brightgreen)
![Plantes](https://img.shields.io/badge/Plantes-100+-success)


## 📋 Description

**PhytoScrape** est une plateforme web professionnelle de collecte, d'analyse et de visualisation de données sur les plantes médicinales du monde entier. Développée dans le cadre du TP INF232 EC2, elle combine un moteur de scraping automatique avec un tableau de bord analytique interactif.

L'application intègre une base de **100 plantes médicinales** de démonstration issues de 5 continents, avec des graphiques dynamiques, des statistiques en temps réel et une interface moderne inspirée des plateformes d'analyse de données professionnelles.

##  Fonctionnalités principales

###  Tableau de bord
- Statistiques en temps réel (plantes collectées, familles botaniques, propriétés uniques, régions couvertes)
- Graphique de distribution par famille botanique (barres)
- Graphique de répartition géographique (diagramme en anneau)
- Chronologie de collecte par mois (courbe)
- Sessions de scraping récentes (Wikipedia FR, PubChem, GBIF)
- Liste des 5 dernières plantes ajoutées

### Collecte de données
- Recherche intelligente par nom commun ou scientifique
- Validation stricte côté serveur (200+ plantes reconnues)
- Scraping automatique depuis Wikipedia FR et PubChem
- Affichage enrichi : image, description, formule moléculaire, lien Wikipedia
- Export des données en **JSON** et **CSV**
- Sauvegarde dans la base de données locale

###  Base de données
- Consultation de toutes les plantes collectées
- Affichage : nom commun, nom scientifique, famille botanique, région géographique, date de collecte

###  Analyses statistiques
- 3 onglets : Vue d'ensemble, Propriétés thérapeutiques, Géographie
- Distribution par famille botanique
- Fréquence des propriétés thérapeutiques (anti-inflammatoire, antioxydant, antibactérien...)
- Répartition géographique mondiale

###  Navigation
- Menu latéral (sidebar) avec 4 sections
- Interface responsive (mobile et desktop)
- Animations fluides entre les pages


##  Couverture géographique

| Région | Exemples de plantes |
|--------|-------------------|
| 🌍 Afrique de l'Ouest | Moringa, Baobab, Cola, Parkia, Irvingia, Griffonia |
| 🌍 Afrique Centrale | Hibiscus, Artemisia, Spiruline, Kigelia, Rauvolfia |
| 🌍 Afrique du Sud | Rooibos, Buchu, Hoodia, Harpagophytum, Aloe ferox |
| 🇮🇳 Asie du Sud | Neem, Ashwagandha, Curcuma, Brahmi, Tulsi, Guduchi, Amla |
| 🌏 Asie du Sud-Est | Gingembre, Galanga, Lemongrass, Muscade, Cardamome |
| 🇨🇳 Asie de l'Est | Ginseng, Ginkgo, Reishi, Cordyceps, Astragalus, Goji |
| 🌿 Europe | Lavande, Camomille, Millepertuis, Ortie, Valériane, Arnica |
| 🫒 Méditerranée | Romarin, Thym, Sauge, Fenouil, Ail, Cannelle, Réglisse |
| 🌎 Amériques | Maca, Guarana, Cat's claw, Cranberry, Açaï, Stevia |

## 🗂️ Structure du projet

plant-collector/
├── api/
│   └── scrape.js              ← Fonction serverless Vercel
├── public/
│   ├── index.html             ← Interface PhytoScrape (4 pages)
│   ├── style.css              ← Design professionnel (vert naturel)
│   └── app.js                 ← Logique frontend + 100 plantes démo
├── server.js                  ← Serveur Express + validation 200+ plantes
├── vercel.json                ← Configuration déploiement
├── package.json               ← Dépendances Node.js
└── README.md                  ← Documentation

##  Installation locale

### Prérequis
- Node.js 18+
- npm
- Git

### Étapes

```bash
# Cloner le dépôt
git clone https://github.com/kamado-237/plan-collector.git
cd plan-collector

# Installer les dépendances
npm install

# Lancer le serveur
node server.js
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000) dans le navigateur.

---

##  API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/scrape?plant=Aloe vera` | Collecter les données d'une plante |
| GET | `/api/plantes?q=moringa` | Rechercher dans la liste des plantes |
| GET | `/api/test` | Vérifier que le serveur fonctionne |

### Exemple de réponse `/api/scrape`

```json
{
  "nom": "Aloe vera",
  "description": "Aloe vera est une espèce d'aloès, originaire du sultanat d'Oman...",
  "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Aloe_vera_Lanzarote.jpg",
  "url_wikipedia": "https://fr.wikipedia.org/wiki/Aloe_vera",
  "formule_moleculaire": null,
  "source": "Wikipedia FR + PubChem",
  "date_collecte": "2026-04-29T05:00:00.000Z"
}
```

## Technologies utilisées

| Catégorie | Technologie |
|-----------|-------------|
| Runtime | Node.js 18+ |
| Framework backend | Express.js |
| Requêtes HTTP | Axios |
| Visualisations | Chart.js 4.x |
| Sources de données | API REST Wikipedia FR, PubChem API |
| Frontend | HTML5, CSS3, JavaScript Vanilla |
| Déploiement | Render.com |
| Versioning | Git & GitHub |

##  Architecture technique

┌─────────────────────────────────────────────────────┐
│                   NAVIGATEUR                        │
│  ┌──────────┐  ┌──────────┐  ┌────────────────┐   │
│  │Dashboard │  │ Collecte │  │    Analyses    │   │
│  │Chart.js  │  │  Fetch   │  │   Chart.js     │   │
│  └────┬─────┘  └────┬─────┘  └───────┬────────┘   │
└───────┼─────────────┼────────────────┼─────────────┘
        │             │                │
        └─────────────▼────────────────┘
                      │ HTTP
        ┌─────────────▼────────────────┐
        │       server.js (Express)    │
        │   Validation 200+ plantes    │
        └──────────┬───────────────────┘
                   │
        ┌──────────▼──────────┐
        │   APIs Externes     │
        │  Wikipedia FR REST  │
        │  PubChem API        │
        └─────────────────────┘


## 🛡️ Validation des données

Le serveur valide chaque requête avant de lancer le scraping. Toute recherche hors de la base de 200+ plantes retourne une erreur claire :

```json
{
  "error": "\"Football\" n'est pas dans notre base de plantes médicinales.",
  "suggestion": "Essayez : Aloe vera, Gingembre, Moringa, Curcuma, Neem..."
}

## 📸 Aperçu de l'interface

```
┌─────────────────────────────────────────────────────────┐
│ 🌿 PhytoScrape          [Tableau de bord]               │
│ DATA ANALYTICS                                          │
│─────────────────────────────────────────────────────────│
│ ⊞ Tableau de bord   │  PLATEFORME D'ANALYSE            │
│ 🌐 Collecte         │  Plantes Médicinales & Scraping   │
│ 🌿 Base de données  │─────────────────────────────────  │
│ 📊 Analyses         │  [100] Plantes  [28] Familles     │
│                     │  [200] Propriétés [12] Régions    │
│─────────────────────│─────────────────────────────────  │
│ Base de données     │  [Graphique Familles] [Donut Geo] │
│ 100 plantes ████░░  │  [Chronologie de collecte]        │
│ 6 sources scrapées  │  [Sessions] [Dernières plantes]   │
└─────────────────────────────────────────────────────────┘


## 👨‍💻 Auteur

**BAYOCK PAUL MAGLOIRE DIT MAMADOU**
Étudiant en Informatique — INF232 EC2
Université de Yaoundé, Cameroun

## 📄 Licence

Ce projet est développé dans un cadre académique — INF232 EC2.
© 2026 Bayock Paul Magloire — Tous droits réservés.
