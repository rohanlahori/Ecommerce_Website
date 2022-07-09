const express=require('express')
const router=express.Router()
const {getAllProducts,createProduct,updateProducts,deleteProduct,getSingleProduct}=require('../controllers/productController')

router.route('/products').get(getAllProducts)
router.route('/product/new').post(createProduct)
router.route('/product/:id').put(updateProducts).delete(deleteProduct).get(getSingleProduct)

module.exports=router