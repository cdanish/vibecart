const addToCartModel = require("../../models/cartProduct");

const deleteAddToCartProduct = async(req,res)=>{
    try{

        const currentUserId = req.userId;

        const addToCartProductId = req.body._id;

        //console.log(addToCartProductId);

        const deletePoduct = await addToCartModel.findOneAndDelete(
            {
                _id:addToCartProductId
            }

        )

        res.status(200).json({

            message: "product deleted",
            error: false,
            success: true,
            data:deletePoduct


        });



    }catch(err){

         res.status(400).json({

            message: err.message || err,
            error: true,
            success: false


        });

    }
}


module.exports = deleteAddToCartProduct;