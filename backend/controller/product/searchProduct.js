const productModel = require("../../models/productModel");

const searchProduct = async(req,res) =>{
    try{

        const query = req.query.q;

        // console.log(query);

        const regex = new RegExp(query,'i','g');

        const product = await productModel.find({
            "$or" : [
                {
                    productName: regex
                },
                {
                    category :regex
                }
            ]
        })

        res.status(200).json({

            message: "product avaiable",
            error: false,
            success:true,
            data:product


        });

    }catch(err){
         res.status(400).json({

            message: err.message || err,
            error: true,
            success:false,
            


        });
    }
}

module.exports = searchProduct;
