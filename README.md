# Application de Gestion d'Événements et de Billets

Cette application est construite avec la stack MERN (MongoDB, Express.js, React.js, Node.js) et permet la gestion d'événements et de billets avec une interface moderne et interactive.

## Prérequis

- Node.js (version 14 ou supérieure)
- MongoDB (version 4.4 ou supérieure)
- npm ou yarn

## Structure du Projet

```
mevn_dock/
├── backend/         # Serveur Express.js
├── frontend/       # Application React.js
```

## Installation

### 1. Configuration du Backend

```bash
cd backend

# Installation des dépendances
npm install

# Configuration de l'environnement
# Créer un fichier .env avec les variables suivantes :
MONGODB_URI=mongodb://localhost:27017/event_ticket_db
JWT_SECRET=votre_secret_jwt
PORT=5000

# Démarrer le serveur de développement
npm start
```

### 2. Configuration du Frontend

```bash
cd frontend

# Installation des dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

## Population de la Base de Données

Pour ajouter des données de test :

```bash
cd backend
node seed.js
```

## Fonctionnalités Principales

- 🎫 Création et gestion d'événements
- 🎭 Achat de billets
- 📱 Interface utilisateur moderne et responsive
- 🔐 Authentification JWT
- 🎨 Animations avec Framer Motion
- 📲 Génération de QR Code pour les billets

## Points Importants

1. Assurez-vous que MongoDB est en cours d'exécution sur votre machine
2. Le backend doit être démarré avant le frontend
3. Les variables d'environnement doivent être correctement configurées
4. Le serveur backend tourne sur le port 5000 par défaut
5. Le frontend tourne sur le port 5173 par défaut (Vite)

## Routes API

### Authentification
- POST /api/users/register - Inscription
- POST /api/users/login - Connexion

### Événements
- GET /api/events - Liste des événements
- POST /api/events - Créer un événement (admin)
- GET /api/events/:id - Détails d'un événement

### Billets
- GET /api/tickets/me - Mes billets
- POST /api/tickets/purchase - Acheter un billet
- GET /api/tickets/:id - Détails d'un billet

## Technologies Utilisées

### Backend
- Express.js
- MongoDB avec Mongoose
- JWT pour l'authentification
- bcrypt pour le hachage des mots de passe

### Frontend
- React.js
- Vite
- Tailwind CSS
- Framer Motion pour les animations
- QRCode.react pour la génération de QR codes

## Dépannage

1. Si les modules ne s'installent pas :
   ```bash
   rm -rf node_modules
   npm install
   ```

2. Si la base de données ne se connecte pas :
   - Vérifiez que MongoDB est en cours d'exécution
   - Vérifiez l'URL de connexion dans le fichier .env

3. Si les routes API ne répondent pas :
   - Vérifiez que le backend tourne sur le port 5000
   - Vérifiez les logs du serveur pour les erreurs

## Contribution

1. Fork le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request