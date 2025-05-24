const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

async function userSignInController(req,res){

    try{

        const {email,password} = req.body;

        if(!email){

            throw new Error("please provide email")

        }
        if(!password){

            throw new Error("please provide password")

        }

        const user = await userModel.findOne({email});

        if(!user){
            throw new Error("User not Found");
        }

        const checkPassword = await bcrypt.compare(password,user.password);

        //console.log(checkPassword);

        if(checkPassword){

            const tokenData={
                _id:user._id,
                email:user.email,
            }

            const token = await jwt.sign(tokenData,process.env.TOKEN_SECERET,{expiresIn:60*60*8})

            const tokenOption = {
                httpOnly :true,
                secure:true
            }

            res.cookie("token",token,tokenOption).status(201).json({
                data:token,
                success:true,
                error:false,
                message:"Login Successfully!!"
    
            })


        }else{
            throw new Error("please check this password");
        }




    }catch(err){
        res.status(401).json({
            message:err.message||err,
            error:true,
            success:false
        })
    }
}

module.exports = userSignInController