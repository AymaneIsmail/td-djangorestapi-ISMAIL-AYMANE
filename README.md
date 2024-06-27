# Projet Django REST API

## Pour commencer :

### Configuration du Backend
- Générer un environnement virtuel : `python -m venv venv`
- Activer l'environnement virtuel :
  - Sur Windows : `venv\Scripts\activate`
  - Sur macOS/Linux : `source venv/bin/activate`
- Installer les dépendances : `pip install -r requirements.txt`
- Lancer les migrations : `python manage.py makemigrations`
- Exécuter les migrations : `python manage.py migrate`
- Créer un utilisateur admin : `python manage.py createsuperuser` :
    - username : **admin**
    - password : **adminpassword**
- Lancer le server `python manage.py runserver`
- Aller dans le fichier `http.request` et exécuter les requêtes les unes après les autres

### Configuration du Frontend
- Aller dans le dossier front : depuis la racine `cd front`
- Installer les dépendances : `pnpm install`
- Lancer le projet : `pnpm run dev`
- Se connecter avec les identifiants du superadmin :
  - Nom d'utilisateur : `admin`
  - Mot de passe : `adminpassword`