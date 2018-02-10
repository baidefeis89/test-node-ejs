const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const index = require('./routes/index');
const tipos = require('./routes/tipos');
const inmuebles = require('./routes/inmuebles');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/inmuebles');

let app = express();
app.set('view engine','ejs');

app.use(fileUpload());

app.use('/', express.static('./public'));

app.use('/', index);
app.use('/inmuebles', inmuebles);
app.use('/tipos', tipos);

app.listen(8080);
