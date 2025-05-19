const { Category, Image, Product, User, sequelize } = require("../models");
const {hashPassword, comparePassword} = require('../helper/bcrypt')
const {signToken, verifyToken } = require('../helper/jwt')
sequelize

class AdminController {
    static async loginUser(req, res, next) {
        try {
            const {email, password} = req.body
            if(!email || !password) throw { name : "InvalidInput" }
    
            const user = await User.findOne({where : {email}})
            if(!user) throw {name : "InvalidEmail/Password"}
            
            const isValidPassword = comparePassword(password, user.password)
            if(!isValidPassword) throw {name : "InvalidEmail/Password"}
            
            const access_token = signToken({id:user.id})
            res.status(200).json({access_token});
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async registerUser(req, res, next) {
        try {
            const {username, email, password, phoneNumber, address} = req.body
            const user = await User.create({username, email, password, phoneNumber, address})
            res.status(201).json({message : "succesfully registered"})
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    
    static async getAllProducts(req, res, next) {
        try{
            const products = await Product.findAll({
                include: [
                    {   model: Category,
                        attributes : {
                            exclude : ['createdAt', 'updatedAt']
                        }
                    },
                    {   model: User,
                        attributes : {
                            exclude : ['createdAt', 'updatedAt', 'password', 'role', 'phoneNumber', 'address']
                        }
                    }
                ],
                attributes : {
                    exclude : ['createdAt', 'updatedAt']
                },
                order : [['id']]
            })
            res.status(200).json(products)
        }
        catch(err) {
            next(err)
        }
    }

    static async getProductById(req, res, next) {
        try {
            const product = await Product.findOne({
                where : {id : req.params.productId},
                include: [
                    {   model: Category,
                        attributes : {
                            exclude : ['createdAt', 'updatedAt']
                        }
                    },
                    {   model: Image,
                        where : {productId : req.params.productId },
                        attributes : {
                            exclude : ['createdAt', 'updatedAt']
                        }
                    },
                    // {   model: User,
                    //     attributes : {
                    //         exclude : ['createdAt', 'updatedAt', 'password', 'role', 'phoneNumber', 'address']
                    //     }
                    // }
                ],
                attributes : {
                    exclude : ['createdAt', 'updatedAt']
                },
            })
            if(!product) throw {name : "NotFound"} 
            res.status(200).json(product)
        } catch (err) {
            console.log(err)
          next(err);
        }
    }

    static async postProduct(req, res, next) {
        const t = await sequelize.transaction();
        try{
            const {name, description, price, mainImg, categoryId, imgUrl} = req.body

            
            const product = await Product.create({
                name, description, price, mainImg, slug : name.split(' ').join('-'), categoryId, authorId : req.user.id, 
            }, { transaction: t })
            
            if(!imgUrl || imgUrl.length === 0 || imgUrl[0].imgUrl === "" ) throw {name : "AdditionImageRequired"} 
            
            let images = imgUrl.map(element => {
                return {
                    productId : product.id,
                    imgUrl : element.imgUrl
                }
            });

            await Image.bulkCreate(images, { transaction: t })

            t.commit();
            res.status(201).json({message: `Successfully added new product`})
        }
        catch(err) {
            console.log(err)
            t.rollback();
            next(err)
        }
    }

    static async putProduct(req, res, next) {
        try{
            const {name, description, price, mainImg, categoryId} = req.body
            if(!name || !description || !price || !mainImg || !categoryId) {
                return res.status(400).json({message : "Input is required"})
            }
            
            await Product.update({
                name, description, price, mainImg, categoryId
            }, {
                where : {id : req.params.productId}
            })

            res.status(200).json({message: `Succesfully edited product`})
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            await Product.destroy({where : {id : req.params.productId}})
            res.status(200).json({message : `Succesfully deleted selected product`})  
        } catch (err) {
            next(err)
        }
    }

    static async getAllCategories(req, res, next) {
        try{
            const category = await Category.findAll({
                order : [['id']],
            })
            res.status(200).json(category)
        }
        catch(err) {
            next(err)
        }
    }

    static async postCategory(req, res, next) {
        try{
            await Category.create(req.body)
            res.status(201).json({message: `Successfully added new category`})
        }
        catch(err) {
            next(err)
        }
    }

    static async getCategoryById(req, res, next) {
        try {
            const category = await Category.findOne({
                where : {id : req.params.categoryId},
                attributes : {
                    exclude : ['createdAt', 'updatedAt']
                }
            })
            if(!category) throw {name : "NotFound"} 
            res.status(200).json(category)
        } catch (err) {
            next(err)
        }
    }

    static async putCategory(req, res, next) {
        try{
            if(!req.body.name) {
                return res.status(400).json({message : "Category name is required"})
            }
            Category.update({name: req.body.name}, {
                where : {id : req.params.categoryId}
            })
            res.status(200).json({message: `Succesfully edited category name`})
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    static async deleteCategory(req, res, next) {
        try {
            await Category.destroy({where : {id : req.params.categoryId}})
            res.status(200).json({message : `Succesfully deleted selected category`})  
        } catch (err) {
            next(err)
        }
    }
}

module.exports = AdminController