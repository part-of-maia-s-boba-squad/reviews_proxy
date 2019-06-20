const relic = require('newrelic');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
proxy = require('http-proxy-middleware');
const cors = require ('cors');

const app = express();
// !!!!!!!!! DONT PARSE WHEN SENDING FROM PROXY FOR POST
// app.use(bodyParser.json());
app.use(cors());
const port = 3010;
const publicDir = path.join(__dirname, '../public/');

app.use(express.static(publicDir));
app.use('/review/', proxy('http://18.221.71.152/review/'));
app.use('/addReview', proxy('http://18.221.71.152/addReview'));

app.get('/:id', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public') + '/index.html');
});

app.listen(port, () => console.log('Listening on Port:', port));

// var resOptions = {
//     target: 'http://localhost:3010/', // target host
//     changeOrigin: true, // needed for virtual hosted sites
//     ws: true, // proxy websockets
// }
   
// app.use('/reservations', proxy(resOptions));

// var menuOptions = {
//     target: 'http://localhost:3003/', // target host
//     changeOrigin: true, // needed for virtual hosted sites
//     ws: true, // proxy websockets
// }

// app.use('/API/restaurant', proxy(menuOptions));

// var picOptions = {
//     target: 'http://localhost:3002/', // target host
//     changeOrigin: true, // needed for virtual hosted sites
//     ws: true, // proxy websockets
// }

// app.use('/restaurants', proxy(picOptions));