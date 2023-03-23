const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const CLIENT_ID = '85978a1a65de96401ae0';
const CLIENT_SECRET = '5a6b2649eed3e02e078c50c47e2eb883b504e3d5';

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// getAccessToken called from frontend
// code passed from frontend
app.get('/getAccessToken/', async (req, res) => {
  const CODE = req.query.code;

  const params =
    '?client_id=' +
    CLIENT_ID +
    '&client_secret=' +
    CLIENT_SECRET +
    '&code=' +
    CODE;

  return await fetch('https://github.com/login/oauth/access_token' + params, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return res.json(data);
    });
});

// getUserData called from frontend
// access token is going to be passed in as Authorization header
app.get('/getUserData', async (req, res) => {
  const ACCESS_TOKEN = req.get('Authorization'); // Bearer ACCESSTOKEN
  await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: ACCESS_TOKEN, // Bearer ACCESSTOKEN
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return res.json(data);
    });
});

app.listen(3000);
