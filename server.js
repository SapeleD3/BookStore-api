const express = require('express');
const app = express()

app.use((req, res) => {
    res.send('Hello World')
})



const port = process.env.PORT || 6536
app.listen(port , () => {
    console.log(`App is Running on Port: ${port}`)
})