const mongoose=require('mongoose')

const courseSchema= new mongoose.Schema({
    course_name:{
        type:String,
        required:true,
        min:10,
        max:200
    },
    course_description:{
        type:String,
        required:true,
        min:10,
        max:200
    },
})

module.exports=mongoose.model('courses',courseSchema)