import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

//routes

//for creating category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//update category
router.post('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);



export default router;