import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
    try {
        const {name} = req.body;

        if(!name) {
            res.status(401).send({message: "Name is required"});
        }

        const existingCategory = await categoryModel.findOne({name});
        
        if(existingCategory) {
            res.status(200).send({
                success: true,
                message: "Category already exist"
            });
        }

        const category = await new categoryModel({name, slug: slugify(name)}).save();
        
        res.status(200).send({
            success: true,
            message: "Category created successfully",
            category
        });

    } catch (error) {
        console.log("Error in create category controller: ", error);
        res.status(500).send({
            success: false,
            message: "Error in Category",
            error
        });
    }
};



export const updateCategoryController = async (req, res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;

        const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true});

        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category
        });
        
    } catch (error) {
        console.log("Error in update category controller: ", error);
        res.status(500).send({
            success: false,
            message: "Error in update category",
            error
        });
    }
};