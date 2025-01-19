const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const mongodb = require('./configs/db');

const port = process.env.PORT || 3000;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
  })
  .use('/contacts', require('./routes/contacts'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  }
  else {
    app.listen(port);
    console.log(`Server is running on port ${port}`)
  }
});
