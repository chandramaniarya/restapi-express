const db = require("../models");
const Joi = require('joi');
const { Op } = require('sequelize');

const Category =    db.category;
const createCategorySchema = Joi.object({
    category_name: Joi.string().required().messages({
      'any.required': 'Category name is required',
      'string.base': 'Category name must be a string',
    }),
    parent_id: Joi.number().optional().messages({
      'number.base': 'Parent ID must be a number',
    }),
    category_icon: Joi.string().optional().messages({
      'string.base': 'Category icon must be a string',
    }),
    category_status:Joi.number().optional()
});

const createCategory = async(req,res) => {
    try {
        const { error, value } = createCategorySchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                status: 400,
                message: "Validation failed",
                errors: error.details.map(err => err.message),
            });
        }
        const { category_name, parent_id } = value;
        const category_icon = req.file ? req.file.filename : null;

        // Check for duplicate category
        const checkDuplicateCategory = await Category.findOne({
            where: { category_name }
        });

        if (checkDuplicateCategory) {
            return res.status(400).send({
                status: 400,
                message: 'This category already exists in the record'
            });
        }

        const newCategory = await Category.create({
            category_name,
            parent_id,
            category_icon,
            category_status:1
        });

        return res.status(201).json({
            status: 201,
            message: 'Category created successfully',
            data: newCategory
        });


    } catch (error) {
        return res.status(400).send({
            status:400,
            message:error.message
        })
    }
}

const categoryList =    async(req,res) =>{
    try {
        const categories = await Category.findAll({
            where: { parent_id: 0 }
        });
        let catSubCatArray  =   [];
        await Promise.all(categories.map(async (category) => {
            let subCategory     =   await Category.findAll({
                where:{
                    parent_id:category.id
                },
                attributes:['id','category_name','parent_id','category_icon']
            })
            let newRow =    {
                id:category.id,
                category_name:category.category_name,
                category_icon:category.category_icon,
                subCategory:subCategory
            }
            catSubCatArray.push(newRow);
        }))

        return res.status(200).json({
            status: 200,
            message: "Categories fetched successfully",
            data: catSubCatArray,
        });
    } catch (error) {
        return res.status(400).send({
            status:400,
            message:error.message
        })
    }
}

module.exports = {
    createCategory,
    categoryList
}