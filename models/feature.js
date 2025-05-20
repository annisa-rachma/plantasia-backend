'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feature extends Model {
    static associate(models) {
      Feature.hasMany(models.Product, {foreignKey : "featureId"})
    }
  }
  Feature.init({
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
    modelName: 'Feature',
  });
  return Feature;
};