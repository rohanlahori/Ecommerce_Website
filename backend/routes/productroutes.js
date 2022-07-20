const express=require('express')
const router=express.Router()
const {getAllProducts,createProduct,updateProducts,deleteProduct,getSingleProduct}=require('../controllers/productController')
const { isAuthenticatedUser,authorizeRoles} = require('../middleware/auth')

router.route('/products').get(getAllProducts)
router.route('/product/new').post(isAuthenticatedUser,authorizeRoles("admin"),isAuthenticatedUser,createProduct)
router.route('/product/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateProducts).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct).get(getSingleProduct)

router.route('/product/:id').get(getSingleProduct);
module.exports=router

