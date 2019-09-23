const express = require('express');
const mongoose = require('mongoose')
const app = express();
const passport = require('passport')
const keys = require('./config/keys')

require('./config/passport')(passport)

// mongoose.Promise = global.Promise;

// mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err));

const auth = require('./routes/auth')

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/auth', auth)


const port = process.env.PORT || 6536
app.listen(port, () => {
    console.log(`App is Running on Port: ${port}`)
})