const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
    try {

        const { productId } = req?.body;
        const currentUser = req.userId;

        const isProductAvailable = await addToCartModel.findOne({ productId });

       // console.log(isProductAvailable)
        if (isProductAvailable) {
            return res.json({
                message: "Already Exists in Add to Cart",
                success: false,
                error: true
            })
        }



        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        }


        const newAddToCart = new addToCartModel(payload);

        const saveProduct = await newAddToCart.save();


        return res.json({
            message: "Product add Successfully",
            success: true,
            error: false,
            data: saveProduct
        })




    } catch (err) {
        res.status(400).json({

            message: err.message || err,
            error: true,
            success: false


        });
    }
}

module.exports  = addToCartController;