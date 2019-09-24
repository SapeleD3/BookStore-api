const express = require('express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors')


const app = express();

app.use(cors());

const passport = require('passport')
const keys = require('./config/keys')
const auth = require('./routes/auth')

require('./models/Users')

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
//middleware
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));


//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.usertoken = req.usertoken || null;
    next();
})


require('./config/passport')(passport)

//routes
app.use('/auth', auth)


app.get('/', (req, res) => {
    res.send('Hello World')
})


const port = process.env.PORT || 6536
app.listen(port, () => {
    console.log(`App is Running on Port: ${port}`)
})