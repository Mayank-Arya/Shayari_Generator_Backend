const express = require('express')
const app = express()
const cors = require('cors')
const {Router} = require('./Routes/chatbot.routes');
require('dotenv').config()
app.use(express.json())
app.use(cors())

app.get('/',(req,res) => {
    res.send('Home Page!')
})

app.use('/find',Router)

app.listen(process.env.PORT,()=>{
    console.log('Server Running at',process.env.PORT)
})