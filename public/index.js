var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(8080);

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://tailor.cloudmqtt.com')

client.on('connect', function () {
  client.subscribe('data', function (err) {
    if (!err) {
      client.publish('command', 'light_on')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
