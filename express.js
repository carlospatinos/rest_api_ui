const express = require('express')
const Request = require('request');
const pug = require('pug')

const app = express()
app.set('view engine', 'pug');
const port = 3000

app.use('/public', express.static(__dirname + '/public'))

console.log(__dirname + '/public');

app.get('/', (req, res) => res.send('Welcome!'))
app.get('/hello', (req, res) => res.redirect('/public/hello.html'))
app.get('/index',function(req,res){
    Request.get('https://say-my-name-carlos.herokuapp.com/showmyname', 
    	function (error, response, body) {
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