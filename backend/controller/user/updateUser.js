const userModel = require("../../models/userModel");

async function updateUser(req,res) {
    try{

        const sessionUser = req.userId;

        const {userId,email,name,role} = req.body;

        console.log(name,role,email);

        const payload = {
            ...(email && {name:name}),
            ...(name && {email:email}),
            ...(role && {role:role})
        }

        const user = await userModel.findById(sessionUser)

        console.log(user.role)

        const updateUser = await userModel.findByIdAndUpdate(userId,payload,{ new: true });

        res.status(200).json({
            message:"user Updated",
            success:true,
            error:false,
            data:updateUser
        })
    }catch(err){
        res.status(400).json({

            message: err.message || err,
            error: true,
            success:false


        });
    }
}

module.exports = updateUser