const mongoose=require('mongoose')

const learnerSchema= new mongoose.Schema({
    learner_name:{
        type:String,
        min:6,
        max:70,
        required:true
    },
    learner_email:{
        type:String,
        min:6,
        max:100,
        required:true
    },
    learner_password:{
        type:String,
        required:true,
        min:5,
        max:50
    },
    date:{
        type:Date,
        default:Date.now()
    }

})

module.exports=mongoose.model('Learner_details',learnerSchema)