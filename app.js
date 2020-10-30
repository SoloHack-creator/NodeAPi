const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//import router

const getRoute = require('./routes/index');
const authRoute = require('./routes/auth');

//passport config
require('./config/passport')(passport);

//load config
dotenv.config({ path: './config/config.env' });

//connect db
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

//logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));

//Sessions
app.use(
  session({
    secret: 'keyborad cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//passport middleware

app.use(passport.initialize());
app.use(passport.session());

//Routes

app.use('/', getRoute);
app.use('/auth', authRoute);

app.listen(PORT, () => {
  console.log(
    `Server runing in ${process.env.NODE_ENV} mode on port ${PORT} \u2601 `
  );
});
