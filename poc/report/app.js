const readline = require('readline');
const fs = require('fs');
var amqp = require('amqplib/callback_api');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// amqp url
amqp_url = "amqps://rgcgkvdo:OFnwyOy4Tw8L5U16HOqXW3zf1HrXVL1T@cow.rmq2.cloudamqp.com/rgcgkvdo"

// db
const json_file = "report/db_sample.json";
const jsonString = fs.readFileSync(json_file);
const json = JSON.parse(jsonString);

rl.question("Bitte geben Sie ihren Befehl ein: ", (query) => {
  if (query.split(" ")[0] == "REPORT") {
    id = query.split(" ")[1];
    status = query.split(" ")[2];
    reportFacility(id,status);
  } else if (query.split(" ")[0] == "SUB"){
    id = query.split(" ")[1]
  }
})

function sendReport(id, status) {
  amqp.connect(amqp_url, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      var fac_name = json.facilites[id].name

      var queue = 'facility';
      var msg = fac_name + " ist " + status;

      channel.assertQueue(queue, {
        durable: false
      });

      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });
  })
}

function reportFacility(id, status) {
  if (status == "active") {
    json.facilites[id].status = true;
  } else if (status == "inactive"){
    json.facilites[id].status = false;
  }

  fs.writeFile(json_file, JSON.stringify(json), function (err) {
    if (err) return console.log(err);}
  )
  sendReport(id, status)
}
