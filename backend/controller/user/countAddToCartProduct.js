const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req,res) =>{
    try{

        const userId = req.userId;

        const count = await addToCartModel.countDocuments({
            userId:userId
        });

        return res.status(200).json({
            data:{
                count:count
            },
            message: "okay",
            error: false,
            success: true


        });

    }catch(err){
        res.status(400).json({

            message: err.message || err,
            error: true,
            success: false


        });
    }
}

module.exports = countAddToCartProduct