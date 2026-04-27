
# 🌿 Plant Collector — INF232 EC2

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-En%20ligne-brightgreen)

## Description

**Plant Collector** est une application web de collecte automatique de données sur les plantes médicinales. Développée dans le cadre du TP INF232 EC2, elle permet de rechercher et d'extraire des informations botaniques et chimiques à partir de sources fiables en ligne (Wikipedia FR et PubChem).

L'application intègre une base de plus de **300 plantes médicinales** reconnues à travers le monde (Afrique, Inde, Chine, Europe, Amériques) et valide chaque requête avant de lancer la collecte.

## Fonctionnalités

- **Recherche intelligente** de plantes médicinales par nom commun ou scientifique
- **Validation stricte** — seules les plantes médicinales reconnues sont acceptées (300+ plantes)
-  **Scraping automatique** depuis Wikipedia FR et PubChem
-  **Affichage enrichi** avec image, description, formule moléculaire et lien Wikipedia
-  **Export des données** en JSON et CSV
-  **Historique des collectes** sauvegardé localement
-  **Interface responsive** adaptée mobile et desktop

---

##  Sources de données

| Source | Données collectées |
|--------|-------------------|
| Wikipedia FR | Nom, description, image, URL |
| PubChem | Formule moléculaire |



##  Structure du projet

```
plant-collector/
├── api/
│   └── scrape.js          ← Fonction serverless (Vercel)
├── public/
│   ├── index.html         ← Interface utilisateur
│   ├── style.css          ← Design et mise en page
│   └── app.js             ← Logique frontend
├── server.js              ← Serveur Express principal
├── vercel.json            ← Configuration déploiement Vercel
├── package.json           ← Dépendances Node.js
└── README.md              ← Documentation
```

---

##  Installation locale

### Prérequis
- Node.js 18+
- npm

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

##  Plantes supportées (exemples)

| Région | Exemples |
|--------|----------|
| Afrique | Moringa, Baobab, Neem, Hibiscus, Aloe ferox |
|  Inde | Ashwagandha, Curcuma, Tulsi, Brahmi, Shatavari |
|  Chine | Ginseng, Ginkgo, Reishi, Astragalus, Dong quai |
|  Europe | Lavande, Romarin, Camomille, Millepertuis, Valériane |
|  Amériques | Cat's claw, Maca, Guarana, Yerba mate, Cranberry |


## API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/scrape?plant=Aloe vera` | Collecter les données d'une plante |
| GET | `/api/plantes?q=moringa` | Rechercher dans la liste des plantes |
| GET | `/api/test` | Vérifier que le serveur fonctionne |

### Exemple de réponse `/api/scrape`

json
{
  "nom": "Aloe vera",
  "description": "Aloe vera est une espèce d'aloès, originaire du sultanat d'Oman...",
  "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Aloe_vera_Lanzarote.jpg",
  "url_wikipedia": "https://fr.wikipedia.org/wiki/Aloe_vera",
  "formule_moleculaire": null,
  "source": "Wikipedia FR + PubChem",
  "date_collecte": "2026-04-27T05:00:00.000Z"
}



## Technologies utilisées

| Catégorie | Technologie |
|-----------|-------------|
| Runtime | Node.js 18+ |
| Framework backend | Express.js |
| Requêtes HTTP | Axios |
| Sources de données | API REST Wikipedia FR, PubChem API |
| Frontend | HTML5, CSS3, JavaScript Vanilla |
| Déploiement | Render.com |
| Versioning | Git & GitHub |

##  Aperçu de l'application

┌─────────────────────────────────────────────┐
│  🌿 Plant Collector                         │
│  Collecteur intelligent de données          │
│─────────────────────────────────────────────│
│  [ Aloe vera              ] [ 🔍 Collecter ]│
│                                             │
│  Suggestions: Aloe vera | Gingembre | ...   │
│─────────────────────────────────────────────│
│  Aloe vera                               │
│  [Image]  Description botanique...          │
│           🧪 Formule : C₁₂H₁₈O₇           │
│           📡 Source : Wikipedia FR          │
│           🔗 Voir l'article complet         │
│                                             │
│  [ ⬇️ JSON ] [ 📄 CSV ] [ 💾 Sauvegarder ] │
└─────────────────────────────────────────────┘
```


##  Validation des données

L'application n'accepte que les plantes médicinales reconnues. Toute recherche hors de la base retourne un message d'erreur clair :

json
{
  "error": "\"Paris\" n'est pas dans notre base de plantes médicinales.",
  "suggestion": "Essayez : Aloe vera, Gingembre, Moringa, Curcuma, Neem..."
}



##  Auteur

**BAYOCK PAUL MAGLOIRE DIT MAMADOU**  
Étudiant en Informatique — INF232 EC2  
Université de Yaoundé, Cameroun

##  Licence

Ce projet est développé dans un cadre académique — INF232 EC2.  
2026 Bayock Paul Magloire — Tous droits réservés.
