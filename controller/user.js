const User=require('../model/User')

const Course=require('../model/course')
const bcrypt=require('bcryptjs')
const joi =require('@hapi/joi')
 

exports.signUp= async (req,res)=>{
     const emailExist=await User.findOne({learner_email:req.body.learner_email})
     
     if(emailExist){ 
         res.status(400).send('email Id already exist')
         return;
     }

     const salt= await bcrypt.genSalt(10)
     const hashedPassword=await bcrypt.hash(req.body.learner_password,salt)
     const user= new User({
         learner_name:req.body.learner_name,
         learner_email:req.body.learner_email,
         learner_password:hashedPassword
     })

     try{
         const signUpSchema=joi.object({
            learner_name:joi.string().min(3).max(255).required(),
            learner_email:joi.string().min(3).max(255).required().email(),
            learner_password:joi.string().min(8).max(255).required()
         })
         const {err}= await signUpSchema.validateAsync(req.body)
         if(err){
             res.status(400).send(err.details[0].message)
             return;
         }
         else{
             const saveUser= await user.save()
         }

     }catch(err){
            res.status(500).send(err)
     }
}

exports.login= async (req,res)=>{
    const user= await User.findOne({learner_eamil:req.body.learner_email})
    if(!user) return res.status(400).send("Invalid email id")
    const validatePassword= await bcrypt.compare(req.body.learner_password,user.learner_password)
    if(!validatePassword) return res.status(400).send("Incoorect password")
    try{
        const loginSchema=joi.object({
            learner_email:joi.string().min(3).max(255).required().email(),
            learner_password:joi.string().min(8).max(50).required()
        })
        const {err}= await loginSchema.validateAsync(req.body)
        if(err)
        {
            res.status(400).send(err.details[0].message)
            return;
        }
        else{
            const token=jwt.sign({id:user._id},process.env.TOKEN_SECRET)
            res.send(token)
            res.send("logged succesfully")
        }

    }catch(err)
    {

    }
}

exports.getLearner= async (req,res)=>{
    const allLearner= await User.find()
    try{
        res.status(200).send(allLearner)
    }
    catch(err){
        res.status(500).send(err)
    }
}
exports.createCourse=async (req,res)=>{
    const course= new Course({
        course_name:req.body.course_name,
        course_description:req.body.course_description
    })
    try{
        const courseSchema=joi.object({
            course_name:joi.string().min(10).max(255).required(),
            course_description:joi.string().min(10).max(255).required()
        })
        const {err}= await courseSchema.validateAsync(req.body)
        if(err){
            res.status(400).send(err.details[0].message)
            return;
        }
        else{
            const saveUser=course.save()
        }

    }catch(err)
    {
        res.status(500).send(err)
    }
}

exports.getCourse=async (req,res)=>{
    const allCourse= await Course.find()
    try{
        res.status(200).send(allCourse)

    }catch(err){
            res.status(500).send(err)
    }
}