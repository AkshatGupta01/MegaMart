import fs from 'fs';
import productModel from '../models/productModel.js';
import slugify from 'slugify';

export const createProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category, quantity, shipping } = req.fields;
        const {photo} = req.files;

        //validation

        switch(true) {
            case !name: return res.status(500).send({error: "Name is required"});
            case !description: return res.status(500).send({error: "Description is required"});
            case !price: return res.status(500).send({error: "Price is required"});
            case !category: return res.status(500).send({error: "Category is required"});
            case !quantity: return res.status(500).send({error: "Quantitiy is required"});
            case photo && photo.size > 1000000: return res.status(500).send({error: "Photo is required and should be less than 1mb"});
        }

        const products = new productModel({...req.fields, slug: slugify(name)});

        if(photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();

        res.status(200).send({
            success: true,
            message: "Product Created Successfully",
            products
        });
        
    } catch (error) {
        console.log("Error in create pproduct controller: ", error);
        res.status(500).send({
            success: false,
            message: "Error in creating product"
        });
    }
};


export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).select("-photo").limit(12).populate("category").sort({createdAt: -1});

        res.status(200).send({
            success: true,
            message: "All Products",
            countTotal: products.length,
            products
        })
    } catch (error) {
        console.log("Error in getProductController: ", error);
        res.status(500).send({
            success: false,
            message: "Error in getting Products",
            error: error.message
        });
    }
};


export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({slug: req.params.slug}).select("-photo").populate("category");

        res.status(200).send({
            success: true,
            message: "Your Product",
            product
        });
    } catch (error) {
        console.log("Error in getSingleProductController", error);

        res.status(500).send({
            success: false,
            message: "Error in getting single Product",
            error
        });
    }
};



export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log("Error in productPhotoController: ", error);
        res.status(500).send({
            success: false,
            message: "Error in getting photo of the Product",
            error
        });
    }
};



export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product deleted Successfully"
        });
    } catch (error) {
        console.log("Error in deleteProductController");
        res.status(500).send({
            success: false,
            message: "Error in deleting Product",
            error
        });
    }
}


export const updateProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category, quantity, shipping } = req.fields;
        const {photo} = req.files;

        //validation

        switch(true) {
            case !name: return res.status(500).send({error: "Name is required"});
            case !description: return res.status(500).send({error: "Description is required"});
            case !price: return res.status(500).send({error: "Price is required"});
            case !category: return res.status(500).send({error: "Category is required"});
            case !quantity: return res.status(500).send({error: "Quantitiy is required"});
            case photo && photo.size > 1000000: return res.status(500).send({error: "Photo is required and should be less than 1mb"});
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid, {...req.fields, slug: slugify(name)}, {new: true});

        if(photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();

        res.status(200).send({
            success: true,
            message: "Product Updated Successfully",
            products
        });
        
    } catch (error) {
        console.log("Error in update product controller: ", error);
        res.status(500).send({
            success: false,
            message: "Error in creating product"
        });
    }
}

export const productfiltersController = async (req, res) => {
    try {
        const {checked, radio} = req.body;

        let args = {};

        if(checked.length > 0) args.category = checked;
        if(radio.length) args.price = {$gte: radio[0], $lte: radio[1]};

        const products = await productModel.find(args);

        res.status(200).send({
            success: true,
            message: "Filtered Products",
            products
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "something went wrong in filtering products",
            error
        });       
    }
}



export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in product count",
            error
        });
    }
}

export const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;

        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({createdAt: -1});
        
        res.status(200).send({
            success: true,
            products,
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in getting product list",
            error
        });
    }
}