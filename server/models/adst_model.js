const mongoose=require("mongoose")
const newSchema=new mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    division:{
        type:String,
        required:true,
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

const unit = mongoose.model("unit",newSchema)

module.exports=unit