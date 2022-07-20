const express=require('express')
const router=express.Router()
const {getAllProducts,createProduct,updateProducts,deleteProduct,getSingleProduct, createProductReview, getProductReviews, deleteReview}=require('../controllers/productController')
const { isAuthenticatedUser,authorizeRoles} = require('../middleware/auth')

router.route('/products').get(getAllProducts)
router.route('/product/new').post(isAuthenticatedUser,authorizeRoles("admin"),isAuthenticatedUser,createProduct)
router.route('/product/:id')
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProducts)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
.get(getSingleProduct)

router.route('/product/:id').get(getSingleProduct);

router.route('/review')
.put(isAuthenticatedUser,authorizeRoles("admin"),createProductReview);

router.route('/reviews')
.get(getProductReviews)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteReview)

module.exports=router

