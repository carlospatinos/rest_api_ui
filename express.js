const express = require('express');
const Request = require('request');
const pug = require('pug');

const app = express()
app.set('view engine', 'pug');
const port = 3000

const REMOTE_URL_API = 'https://say-my-name-carlos.herokuapp.com/showmyname';

app.use('/public', express.static(__dirname + '/public'))
app.get('/', (req, res) => res.send('Welcome!'))
app.get('/hello', (req, res) => res.redirect('/public/hello.html'))
app.get('/index',function(req,res){
    var appInfo = eureka.getInstancesByAppId('rest-service');
    var remote_url="http://" + appInfo[0].hostName + ":" + appInfo[0].port['$'] + "/showmyname";
    console.log("Remote url: " + remote_url);
    Request.get(remote_url, function (error, response, body) {
        if (error) {
            throw error;
        }

        const data = JSON.parse(body);
        console.log(data); 
        res.render('index', { result: data });
    });
    //res.send('Hello world');
    //res.render('index')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


const Eureka = require('eureka-js-client').Eureka;

const eureka = new Eureka({
  instance: {
    app: 'expressservice',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://localhost:8081',
    port: {
      '$': 5000,
      '@enabled': 'true',
    },
    vipAddress: 'localhost',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    }
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/'
  }
});
eureka.logger.level('debug');
eureka.start(function(error){
  console.log(error || 'complete');
  if(!error){
    var appInfo = eureka.getInstancesByAppId('rest-service');
    console.log('appInfo:' + JSON.stringify(appInfo));
    console.log("Rest URL = "+ appInfo[0].hostName + appInfo[0].port['$']);
  }
});