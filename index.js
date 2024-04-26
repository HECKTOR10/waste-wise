require('dotenv').config()
const express = require('express')
const EJS = require('ejs')
const jsonwebtoken = require('jsonwebtoken')
const path = require('path')
const app = express()
const PORT = 80
const mongo_url = 'mongodb+srv://samyak:KBiJc2IL7vFkzzgk@cluster0.ls7l2eq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const userRoute = require('./routes/user')
const mongoose = require('mongoose')
const cookieParser= require('cookie-parser')
const {checkForAuthCookie}=require('./middlewares/auth')
mongoose.connect(mongo_url).then(e=>{
    console.log('MongoDB Connected  ')
})
app.set('view engine','ejs') 
app.set('views',path.resolve("./views"))
app.use(express.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname,'public')))  
app.use(cookieParser());
app.get('/',(req,res)=>{
     res.render('index',{
        user : req.user
     })
})
app.get('/rewards',(req,res)=>{
    res.render('reward')
})
app.get('/book',(req,res)=>{
    res.render('book')
})
app.post('/book',(req,res)=>{
    return res.render('success')
})
app.use('/user',userRoute)
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})  
