const express = require('express');
const mongoose = require('mongoose')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})



const port = process.env.PORT || 6536
app.listen(port, () => {
    console.log(`App is Running on Port: ${port}`)
})