const uploadProductPermission = require("../../helpers/Permission");
const productModel = require("../../models/productModel");

async function UploadProductController(req,res) {

    try{

        const sessionUserId = req.userId;
        //console.log(sessionUserId);
        //const me = uploadProductPermission(sessionUserId);
        //console.log(me);

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission Denied");
        }

        const uploadProduct = await new productModel(req.body);

        const saveProduct = await uploadProduct.save();

        res.status(200).json({
            message:"Product upload Successfully",
            error:false,
            success:true,
            data:saveProduct
        })

    }catch(err){
        res.status(400).json({

            message: err.message || err,
            error: true,
            success:false


        });
    }
    
}


module.exports = UploadProductController;