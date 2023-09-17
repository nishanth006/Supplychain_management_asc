const mongoose=require("mongoose")

const newSchema=new mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const division = mongoose.model("division",newSchema)

module.exports=division