import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCountController, productListController, productPhotoController, productfiltersController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
import formidable from 'express-formidable';

const router = express.Router();

//create product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

//get products
router.get('/get-product', getProductController);

//get-single product
router.get('/get-product/:slug', getSingleProductController);

//get product photo
router.get('/product-photo/:pid', productPhotoController);

//delete product
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController);

//filter products
router.post('/product-filters', productfiltersController);

//product count
router.get('/product-count', productCountController);

//product-list per page
router.get('/product-list/:page', productListController);

//search product
router.get('/search/:keyword', searchProductController);

//related products
router.get('/related-product/:pid/:cid', relatedProductController);


export default router;