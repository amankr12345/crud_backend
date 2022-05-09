const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const authRoute=require('./routes/auth')


const app=express()
const Port=8080

app.get('/',(req,res)=>{
    res.send("running on backend server")
})

app.listen(Port,()=>
console.log('Running on server'))

app.use(express.json())
dotenv.config()
mongoose.connect(process.env.DB_CONNECT,{UseNewUrlParser:true},console.log("database Connected"))

app.use('/app/learner',authRoute)
