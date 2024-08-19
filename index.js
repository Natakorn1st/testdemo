const mqtt = require('mqtt');
const express = require('express');
const app = express();
const port = 5050;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// MQTT client variables
let client;
const topicRequest = 'TestingServer';
const topicResponse = 'Server';
const options = {
  username: 'TestServer',
  password: 'Uia34Rf4',
  reconnectPeriod: 1000, // 1 second
  connectTimeout: 60 * 1000, // 30 seconds
};

function connectMQTT() {
  // Connect to MQTT broker
  client = mqtt.connect('tls://79c714236ee04846b256548e4163d8dd.s2.eu.hivemq.cloud:8883', options);

  client.on('connect', () => {
    console.log('Connected!');
    client.subscribe(topicRequest, { qos: 1 }, (err) => {
      if (err) {
        console.error('Subscription error:', err);
      } else {
        console.log('Subscription success');
      }
    });
  });

  client.on('message', (topic, message) => {
    console.log("topic: " + topic + " / msg: " + message);
   
    if(message == "123"){
      client.publish(topicRequest, JSON.stringify({ error: "alive" }), { qos: 2 }, (err) => {
        if (err) {
          console.error('Failed to publish:', err);
        } else {
          console.log('Published invalid format error');
        }
      });
    }

    let eventData;
    try {
      eventData = JSON.parse(message.toString());
    } catch (error) {
      console.error('Failed to parse JSON:', error.message);
      return;
    }

    if (eventData) {
      handleEvent(eventData);
    } else {
      client.publish(topicRequest, JSON.stringify({ error: "Invalid format" }), { qos: 2 }, (err) => {
        if (err) {
          console.error('Failed to publish:', err);
        } else {
          console.log('Published invalid format error');
        }
      });
    }
  });

  client.on('error', (error) => {
    console.error('MQTT Error:', error);
    setTimeout(connectMQTT, 5000); // Wait 5 seconds before attempting to reconnect
  });

  client.on('offline', () => {
    console.log('MQTT client is offline');
  });

  client.on('reconnect', () => {
    console.log('Reconnecting to MQTT broker...');
  });

  client.on('close', () => {
    console.log('MQTT connection closed');
    setTimeout(connectMQTT, 5000); // Wait 5 seconds before attempting to reconnect
  });
}

function handleEvent(eventData) {
  switch (eventData.event) {
    case "addNewPatient":
  
      break;

    default:
      console.error('Unknown event type:', eventData.event);
      break;
  }
}

// Connect to the MQTT broker
connectMQTT();
