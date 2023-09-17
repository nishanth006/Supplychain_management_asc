const express = require("express")
const mongoose=require("mongoose")

const unit = require("./models/adst_model")
const division = require("./models/ddst_model")
const transaction_details=require('./models/transaction_details')

const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose.connect("mongodb://0.0.0.0:27017/scm")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})

app.post("/login/",async(req,res)=>{
    const{role,user_name,password}=req.body

    const data={
        user_name:user_name,
        password:password
    }

    try{
        var check;
        if(role==='adst'){
            check=await unit.findOne({user_name:user_name})
        }
        else
        {
             check=await division.findOne({user_name:user_name})
        } 
        console.log(role);
        console.log(check);
        if(check){
            if(check.password!=password)res.json("wrong");
            else{
                res.json(check)
            }
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})
app.post("/log/",async(req,res)=>{
    const{user_name,password}=req.body
    console.log(user_name)
    const data={
        user_name:user_name,
        password:password
    }

    try{
        var check;
        check=await unit.findOne({user_name:user_name,role:'adst'})
        if(check)
        {
            if(check.password!=password)res.json("wrong");
            else{
                let user_details={
                    division:check.division,
                    user_name:check.user_name,
                    role: 'adst'
                }
                console.log(user_details)
                res.json(user_details);
            }
        } 
        else if(check==null){
            check=await division.findOne({user_name:user_name})
            if(check.password!=password)res.json("wrong");
            else{
                console.log(check.role);
                let user_details={
                    user_name:check.user_name,
                    role: check.role
                }
                res.json(user_details);
            }

        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})
app.post("/Register_unit",async(req,res)=>{
    const{division,user_name,password}=req.body

    const data={
        role:'adst',
        division:division,
        user_name:user_name,
        password:password
    }
    console.log(data);

    try{
        const check=await unit.findOne({user_name:user_name})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await unit.insertMany([data])
            console.log("created")
        }

    }
    catch(e){
        res.json("fail")
    }

})
app.post("/post_transaction",async(req,res)=>{
    const {from,to,transactionHash,gasUsed,role,user_name,request_id,purpose}=req.body


    const data={
        from:from,
        to:to,
        transactionHash:transactionHash,
        gasUsed:gasUsed,
        role:role,
        user_name:user_name,
        req_id:request_id,
        purpose:purpose
    }
    console.log(data);

    try{
        await transaction_details.insertMany([data]);
        res.json("success")

    }
    catch(e){
        res.json("fail")
    }

})
app.post('/Transaction_history',async(req,res)=>{
    try{
        const {user_name}=req.body
        console.log(req.body);
        let check=await transaction_details.find({user_name:user_name});
        if(check){
            console.log(check);
            res.json(check);
        }
        else res.json(err);

    }
    catch(e){
        res.json("fail")
    }
})

app.post("/Register_div/",async(req,res)=>{
    const{user_name,password}=req.body
    const data={
        role:'ddst',
        user_name:user_name,
        password:password
    }
    console.log(data);

    try{
        const check=await division.findOne({user_name:user_name})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            console.log("created")
            await division.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})

app.listen(8000,()=>{
    console.log("port connected");
})