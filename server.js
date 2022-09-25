//require
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const expressLayouts = require('express-ejs-layouts')
const devsRouter = require('./routes/devs')


//environment setup
dotenv.config()
const port = process.env.PORT || 4040

//init express
const app = express()

//data manage
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//init ejs
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.set('layout', 'layouts/app')

//static folder
app.use(express.static('public'))

//routing
app.use('/devs', devsRouter)

//server listen
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`.bgGreen.yellow);
})