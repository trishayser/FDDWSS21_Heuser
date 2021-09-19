# FDDWSS21_Heuser
Das Projekt ist für FDDW im Studiengang Medieninformatik der TH Köln von Tristan Heuser. Es wurde alleine ohne weitere Studenten umgesetzt.

Deployed (Derzeit offline): http://167.172.162.34:8080 (Web-Anwendung)

## Projekt
In dieser Webanwendung ist es möglich einzelne Aufzüge oder Rolltreppen zu abonnieren und daraufhin Nachrichten zu bekommen. 

## Setup


```shell
docker-compose up -d
```

Sometimes some docker container won't start. You have to restart it manually.

All services can also be deployed individually. For Every Service there is a Dockerfile.


### Anmerkungen
* Da es nicht viele Statusupdates pro Tag gibt, ist es schwer die Webanwendung zu testen. Es ist möglich einen PUT-Request auf ein Element der ```facilities``` im Facility Service zu machen und den Status daraufhin zu ändern. Darauffolgend wird eine Nachricht für den test-User (bzw. alle anderen, welche die Facility subscribed haben) generiert

### NodeJS Components
#### Requirements
NodeJS

#### Installation

```shell
npm install

npm start
```

### VueJS
#### Project setup
```
npm install
```

##### Compiles and hot-reloads for development
```
npm run serve
```

##### Compiles and minifies for production
```
npm run build
```

##### Lints and fixes files
```
npm run lint
```

##### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Known Bugs: 

#### User Bug
There is no User Management at this time. You have to create a test user with this POST Request in local environment to: http://localhost:16337/users/

```json
{
  "user_id": "test",
  "user": "Test User",
  "subscriped": []
}
```

## Documentation
Das Projekt wurde hauptsächlich mit NodeJS (JavaScript), VueJS und RabbitMQ umgesetzt.


### Anmerkungen
* Die Dienste ```routes``` und ```reports``` konnten aus Zeitmangel nicht umgesetzt werden. 
* Es stehen gerade nur Daten der KVB zur Verfügung. Die Daten der Deutschen Bahn konnten aus Zeitmangel nicht hinzugefügt werden.


### Architektur / Microservices

#### Facility

speichert Daten zu den einzelnen Stationen (```stations```) und Aufzüge / Rolltreppen (```facilities```) in einer MongoDB (```mongo-fac```)

sendet Benachrichtigungen an eine RabbitMQ Queue (```rabbit1```) 

überprüft Status Updates der (```facilities```) bzw. Nachrichten der (```rabbit-status```) Queue und ändert diese Daten in der MongoDB (```mongo-fac```)

##### Datenmodelle

###### Facility

```json
{
  "facility_id": String,
  "name": String,
  "description": String,
  "station_id": String,
  "type": String,
  "status_info": {
    "status": Number,
    "last_updated_user": String,
    "last_updated_company": String,
    "last_updated": String
  },
  "foreign_id": String,
  "foreign_station_id": String,
  "company": String,
  "last_updated": String,
  "created": String,
  "geo": {
    "coordinates": String,
    "typ": String,
    "name": String
  }

}
```


###### Station

```json
{
  "station_id": String,
  "name": String,
  "company": String,
  "foreign_id": String,
  "last_updated": String,
  "created": String,
  "geo": {
    "coordinates": String,
    "typ": String,
    "name": String
  },
  "stops": [{
    "name": String,
    "lines": String,
    "foreign_id": String,
    "geo": {
      "coordinates": String,
      "typ": String,
      "name": String
    }
  }]

}
```

#### User

speichert Daten zu den Benutzern (```users```) in einer MongoDB (```mongo-usr```)


##### Datenmodell

```json
{
    "user_id": String,
    "user": String,
    "subscribed": [String]
}
```

#### Message
speichert Daten zu den Benutzern (```messages```) in einer MongoDB (```mongo-mes```)


##### Datenmodell

```json
{
  "user": String,
  "timestamp": String,
  "payload": String
} 
```

#### Facility Monitor
überprüft in regelmäßigen Zeitabständen nach Updates zu den Störungen der einzelnen Facilities und zu Updates zu den einzelnen Stationen

Bei einem Statusupdate wird eine Nachricht an ```rabbit-status``` gesendet

#### Message Monitor
Wartet auf Nachrichten der ```rabbit1``` Queue und sendet diese weiter an ```messages```