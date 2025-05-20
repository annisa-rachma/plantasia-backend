'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Height extends Model {
    static associate(models) {
      Height.hasMany(models.Product, {foreignKey : "heightId"})
    }
  }
  Height.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name required'
        },
        notEmpty: {
          msg: 'Name required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Height',
  });
  return Height;
};