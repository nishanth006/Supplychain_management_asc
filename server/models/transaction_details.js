const mongoose=require("mongoose")
const newSchema=new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true
    },
    transactionHash:{
        type:String,
        required:true
    },
    gasUsed:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        required:true
    },
    req_id:{
        type:String,
        required:true 
    },
    purpose:{
        type:String,
        required:true
    }
    
})

const transaction_details = mongoose.model("transaction_details",newSchema)

module.exports=transaction_details