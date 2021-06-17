const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const fcm=require('fcm-push')
//const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler').errorHandler;
const passport=require('passport')
const cookieSession=require('cookie-session')
app.use(compression());
app.use(cookieSession({
    name:'session',
    keys:['key1','key2']
  }))
  app.use(passport.initialize());
  app.use(passport.session());

app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
//app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');


app.use(`/categories`, categoriesRoutes);
app.use(`/products`, productsRoutes);
app.use(`/users`, usersRoutes);
app.use(`/orders`, ordersRoutes);
app.use(errorHandler);


//Database
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
     useUnifiedTopology: true,
      useFindAndModify: false,
       useCreateIndex: true,

    dbName: 'eshop-database'
})

//Server
app.listen(3000)