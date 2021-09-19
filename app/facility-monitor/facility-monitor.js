const axios = require('axios');
const https = require('https');
const amqp = require('amqplib/callback_api');


var kvb_urls = {
    "elevator": "https://data.webservice-kvb.koeln/service/opendata/aufzuege/json",
    "escalator": "https://data.webservice-kvb.koeln/service/opendata/fahrtreppen/json",
    "station": "https://data.webservice-kvb.koeln/service/opendata/haltestellen/json",
    "elevator_disorder": "https://data.webservice-kvb.koeln/service/opendata/aufzugsstoerung/json",
    "escalator_disorder": "https://data.webservice-kvb.koeln/service/opendata/fahrtreppenstoerung/json",
    "station_areas": "https://data.webservice-kvb.koeln/service/opendata/haltestellenbereiche/json"
}

var db_urls = {
    "facilities": "http://api.deutschebahn.com/fasta/v2/facilities",
    "stations": "http://api.deutschebahn.com/fasta/v2/station",
}
console.log("start");

function getKVBData() {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    const req_elevator = axios.get(kvb_urls.elevator, {httpsAgent});
    const req_escalator = axios.get(kvb_urls.escalator, {httpsAgent});
    const req_station = axios.get(kvb_urls.station, {httpsAgent});
    const req_station_areas = axios.get(kvb_urls.station_areas, {httpsAgent});
    const req_elevator_disorder = axios.get(kvb_urls.elevator_disorder, {httpsAgent});
    const req_escalator_disorder = axios.get(kvb_urls.escalator_disorder, {httpsAgent});

    axios.all([req_elevator, req_escalator, req_station, req_station_areas, req_elevator_disorder, req_escalator_disorder]).then(axios.spread((...responses) => {
        console.log("start");

        const res_elevator = responses[0];
        const res_escalator = responses[1];
        const res_station = responses[2];
        const res_station_areas = responses[3];
        const res_elevator_disorder = responses[4];
        const res_escalator_disorder = responses[5];

        const elevators = res_elevator.data.features;
        const escalators = res_escalator.data.features;
        const stations = res_station.data.features;
        const station_areas = res_station_areas.data.features;
        const elevator_disorder = res_elevator_disorder.data.features;
        const escalator_disorder = res_escalator_disorder.data.features;

        var disorders = [];
        for (let l=0; i<elevator_disorder.length; l++) {
            disorders.push("KVB-" + elevator_disorder[l].properties.Kennung)
        }
        for (let k=0; i<escalator_disorder.length; k++) {
            disorders.push("KVB-" + escalator_disorder[k].properties.Kennung)
        }


        console.log("stations loaded");
        for (var i=0; i<station_areas.length; i++) {
            console.log("STAT: " + "KVB-" + station_areas[i].properties.Haltestellenbereich + " object created");



            var station = {
                "station_id": "KVB-" + station_areas[i].properties.Haltestellenbereich,
                "name": station_areas[i].properties.Haltestellenname,
                "company": "KVB",
                "foreign_id": station_areas[i].properties.Haltestellenbereich,
                "last_updated": Date.now
            }
            createOrUpdateStation(station);
        }

        for (var j=0; j<elevators.length; j++) {
            var status = 0;
            console.log("FAC EL: " + "KVB-" + elevators[j].properties.Kennung + " object create");
            if (disorders.includes("KVB-" + elevators[j].properties.Kennung)) {
                status = 1;
            } else {
                status = 2;
            }
            try {
                var elevator = {
                    "facility_id": "KVB-" + elevators[j].properties.Kennung,
                    "name": elevators[j].properties.Bezeichnung,
                    "description": elevators[j].properties.Bezeichnung,
                    "station_id": "KVB-" + elevators[j].properties.Haltestellenbereich,
                    "type": "ELEVATOR",
                    "foreign_id": elevators[j].properties.Kennung,
                    "foreign_station_id": elevators[j].properties.Haltestellenbereich,
                    "company": "KVB",
                    "last_updated": Date.now(),
                    "geo": {
                        "coordinates": elevators[j].geometry.coordinates[0].toString() + ", " + elevators[j].geometry.coordinates[1].toString(),
                        "typ": elevators[j].geometry.type,
                        "name": elevators[j].geometry_name
                    },
                    "status_info": {
                        "status": status,
                        "last_updated": Date.now()
                    }
                }
            } catch (e) {
                console.log(e)
            }

            createOrUpdateFacility(elevator);
        }

        for (var h=0;h<escalators.length;h++) {
            console.log("FAC ES: " + "KVB-" + escalators[h].properties.Kennung + " object created");
            try {
                var escalator = {

                    "facility_id": "KVB-" + escalators[h].properties.Kennung,
                    "name": escalators[h].properties.Bezeichnung,
                    "description": escalators[h].properties.Bezeichnung,
                    "station_id": "KVB-" + escalators[h].properties.Haltestellenbereich,
                    "type": "ESCELATOR",
                    "foreign_id": escalators[h].properties.Kennung,
                    "foreign_station_id": escalators[h].properties.Haltestellenbereich,
                    "company": "KVB",
                    "last_updated": Date.now(),
                    "geo": {
                        "coordinates": escalators[h].geometry.coordinates[0].toString() + ", " + escalators[h].geometry.coordinates[1].toString(),
                        "typ": escalators[h].geometry.type,
                        "name": escalators[h].geometry_name
                    }
                }
            } catch (e) {
                console.log(e)
            }

            createOrUpdateFacility(escalator);
        }


    })).catch(function (error) {
        console.log(error);
    });

}

function getKVBDisorders() {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    const req_elevator_disorders = axios.get(kvb_urls.elevator_disorder, {httpsAgent});
    const req_escalator_disorders = axios.get(kvb_urls.escalator_disorder, {httpsAgent});

    axios.all([req_elevator_disorders, req_escalator_disorders]).then(axios.spread((...responses) => {
        const res_elevator_disorders = responses[0];
        const res_escalator_disorders = responses[1];

        const elevators = res_elevator_disorders.data.features;
        const escalators = res_escalator_disorders.data.features;

        for (let i=0; i < elevators.length; i++) {
            var el_id = "KVB-" + elevators[i].properties.Kennung;
            var el_timestamp = elevators[i].properties.timestamp;
            var el_status = 1;
            sendDisorderMessage(el_id, el_timestamp, el_status);
        }

        for (let i=0; i < escalators.length; i++) {
            var ev_id = "KVB-" + escalators[i].properties.Kennung;
            var ev_timestamp = escalators[i].properties.timestamp;
            var ev_status = 1;
            sendDisorderMessage(ev_id, ev_timestamp, ev_status);
        }

    }));

}

function sendDisorderMessage(id, timestamp, status) {

    amqp.connect('amqp://rabbit-status:5672', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'status';
            var msg = id + ';' + timestamp + ';' + status;

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
        });
        setTimeout(function() {
            connection.close();
        }, 500);
    });
}


function getDBData() {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    let config = {
        headers: {
            "Authorization": "Bearer 090924756893958f92c5b064b3aa0d1f"
        }
    }

    axios.get(db_urls.facilities, config).then(function (res) {
        const facilities = res.data;

        for (let i=0; i < facilities.length; i++) {

            var facility = {
                "facility_id": "DB-" + facilities[i].equipmentnumber,
                "name": facilities[i].description,
                "description": facilities[i].description,
                "station_id": "DB-" + facilities[i].stationnumber,
                "type": facilities[i].type,
                "foreign_id": facilities[i].equipmentnumber,
                "foreign_station_id": facilities[i].stationnumber,
                "company": "DB",
                "last_updated": Date.now(),
                "geo": {
                    "coordinates": facilities[i].geocoordX + ', ' + facilities[i].geocoordY,
                    "type": "Point",
                    "name": "Koordinate"
                }
            }
            createOrUpdateFacility(facility);
        }

        console.log(facilities);
    })







}

function getDBDisorders() {
    //TODO Störungen hinzufügen
}

function createOrUpdateFacility(facility) {
    var fac_url = "http://facilities:13773/facilities";

    axios.get(fac_url + "/" + facility.facility_id).then(function (response_fac) {
        if (response_fac.data.length == 0) {
            axios.post(fac_url, facility).then(function (response) {
                console.log("FAC " + facility.facility_id + " sended");
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            axios.put(fac_url + "/" + facility.facility_id, facility).then(function (response) {
                console.log("FAC " + facility.facility_id + " updated");

            }).catch(function (error) {
                console.log(error);
            });
        }
    });


}

function createOrUpdateStation(station) {
    var stat_url = "http://facilities:13773/stations";

    axios.get(stat_url + "/" + station.station_id).then(function (response_stat) {
        if (response_stat.data.length == 0) {
            axios.post(stat_url, station).then(function (response) {
                console.log("STAT " + station.station_id + " sended");
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            axios.put(stat_url + "/" + station.station_id, station).then(function (response) {
                console.log("STAT " + station.station_id + " updated");
            }).catch(function (error) {
                console.log(error);
            });
        }
    });
}


setInterval(() => {
    console.log("START GET DATA");
    getKVBData();
}, 1200000);

setInterval(() => {
    getKVBDisorders();
}, 60000);

getKVBData();

//getKVBData();
console.log("Monitor running");