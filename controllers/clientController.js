const { Category, Image, Product, User } = require("../models");
const { Op } = require("sequelize");

class ClientController {
  static async getAllProducts(req, res, next) {
    try {
        const { type, feature, height } = req.query; // Destructure all expected query params

        const whereCondition = {};
    
        // Convert and assign `type` (categoryId)
        if (type) {
          const typeArray = Array.isArray(type) ? type : [type];
          whereCondition.categoryId = {
            [Op.in]: typeArray.map(Number),
          };
        }
    
        // Convert and assign `feature` (featureId)
        if (feature) {
          const featureArray = Array.isArray(feature) ? feature : [feature];
          whereCondition.featureId = {
            [Op.in]: featureArray.map(Number),
          };
        }
    
        // Convert and assign `height` (heightId)
        if (height) {
          const heightArray = Array.isArray(height) ? height : [height];
          whereCondition.heightId = {
            [Op.in]: heightArray.map(Number),
          };
        }

      const products = await Product.findAll({
        where: whereCondition,
        include: [
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "asc"]],
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const product = await Product.findOne({
        where: { id: req.params.productId },
        include: [
          {
            model: Image,
            where: { productId: req.params.productId },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: User,
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "password",
                "role",
                "phoneNumber",
                "address",
              ],
            },
          },
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!product) throw { name: "NotFound" };
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = ClientController;
