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


export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category
        });
    } catch (error) {
        console.log("Error in get-all Category Controller: ", error);
        res.status(500).send({
            success: false,
            message: "Error in getting all categories",
            error
        });
    }
};

export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({slug: req.params.slug});

        res.status(200).send({
            success: true,
            message: "Get Singal Category Successfull",
            category
        });
    } catch (error) {
        console.log("Errot in single category controller");
        res.status(500).send({
            success: false,
            message: "Error while getting single category",
            error
        });
    }
};



export const deleteCategoryController = async (req, res) => {
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        console.log("Error in delete category controller", error);
        res.status(500).send({
            success: false,
            message: "Error in deleting category"
        });
    }
};