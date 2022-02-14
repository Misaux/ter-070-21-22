# TER 070 2021


## Branches

| Branch | Status |
| ------ | ------ |
| [main](https://github.com/pns-si5-al-course/al-drone-21-22-e/tree/main) | [![main]()]() |
| [dev](https://github.com/pns-si5-al-course/al-drone-21-22-e/tree/develop) | [![dev]()]() |

## Auteurs

- [Jessy Dussart](https://github.com/Misaux)
- [Sylvain Marsili](https://github.com/SylvainMarsili)
- [Loïc Filippi](https://github.com/luclys)
- [Enzo Briziarelli](https://github.com/enbriziare)

## Installation
Cloner le repository
Build et installer les dépendances
````shell
./build.sh
````
Lancer les serveurs
````shell
./run.sh
````

## Utilisation
Notre api est accessible sur l'url http://localhost:3010
Afin de rajouter un nouveau composant, former une requête avec un message JSON a l'adresse suivante http://localhost:3010/new
Le message doit avoir la structure suivante : 
````json
{
    "id": "id unique du composant",
    "keyword": "stratégie de merge",
    "components": [ //liste des composants pour former un unique composant
      {
        "name": "nom du composant",
        "url": "url où récupérer les données du composant",
        "fileFormat": "format des données"
      }
    ]
  }
````
Les stratégies de merge disponible sont :
* RANDOM (stratégie order matters)
* merge_texts (uniquement pour des données textes)
* text_over_images (le composant text doit être premier dans la liste des composants, les autres sont des images )

Les types de données supportées sont:
* TEXT (url -> route renvoyant un text)
* IMAGE (url -> lien vers l'image)
* VIDEO (url -> route vers un serveur renvoyant un stream vidéo)
* AUDIO (url -> route vers un serveur renvoyant un stream audio)
* TTS (text to speech, url -> route renvoyant un text)
* HTML (url -> lien vers un site web ou vers un serveur renvoyant un html)

Le front-global de l'app est disponible sur http://localhost:4010

Il est possible de déplacer les composants avec la souris, de les changer de taille en cliquant en bas à droite, ou de les supprimer en haut à droite.

Vous pouvez également modifier, supprimer, ajouter des composants ainsi que leurs données directement depuis le fichier db.json (chemin: services/readers-interface/src/mock/)

L'application web est responsive et fonctionne ainsi sur mobile. 

### App mobile

Notre application possède également une version mobile native.
Lancer le back séparément en lançant le run.sh situé [ici](services\readers-interface)


Afin de lancer l'application mobile suivez les instructions de [React-Native].(https://reactnative.dev/docs/environment-setup)
Et éxecuter la commande suivante dans le repo frontends\FrontAppNative
````shell
npx react-native run-android
````
Les fonctionnalités suivantes n'ont pas été introduite dans l'app native :
*	Drag and Drop
*	Resize
*   TTS
