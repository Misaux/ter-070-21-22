# TER 070 2021


## Branches

| Branch | Status |
| ------ | ------ |
| [main](https://github.com/pns-si5-al-course/al-drone-21-22-e/tree/main) | [![main]()]() |
| [dev](https://github.com/pns-si5-al-course/al-drone-21-22-e/tree/develop) | [![dev]()]() |
| [single-spa-test](https://github.com/Misaux/ter-070-21-22/tree/single-spa-test) | [![single-spa-test]()]() |

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
### App web
Notre api est accessible sur l'url http://localhost:3010. </br>
Afin de rajouter un nouveau composant, former une requête avec un message JSON a l'adresse suivante http://localhost:3010/new. </br>
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

## Exemples

En lançant notre docker-compose, quelques micro-services et micro-frontends tournerons afin de tester l'app.

````shell
docker-compose build
docker-compose up -d
`````
micro-frontends:
* exemple(localhost:4000):
  * retourne un texte + video + audio
* exemple-bis (localhost:4001)
  * retourne un texte
* map (localhost:4002)
  * retourne une carte

micro-service:
* exemple(localhost:3000):
  * / -> retourne une string "hello"
  * /video -> retourne un lien video
  * /audio -> retourne un lien audio
* exemple-bis(localhost:3001)
  * / -> retourne une string "légende"
  * /2 -> retourne une string "bienvenue"
* html-provider(localhost:3002)
  * / -> retourne une page html NestJS
* video-provider(localhost:3003)
  * /{titre} -> retourne un stream vidéo selon le titre (la video doit être présente dans le repertoire assets de services/video-provider)
* audio-provider(localhost:3004)
  * /{titre} -> retourne un stream audio selon le titre (l'audio doit être présent dans le repertoire assets de services/video-provider)


