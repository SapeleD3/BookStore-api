const express = require('express');
const mongoose = require('mongoose')
const app = express();
const passport = require('passport')

require('./config/passport')(passport)

const auth = require('./routes/auth')

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/auth', auth)



const port = process.env.PORT || 6536
app.listen(port, () => {
    console.log(`App is Running on Port: ${port}`)
})