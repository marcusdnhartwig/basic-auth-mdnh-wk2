'use strict';

const foodModel = (sequelize, DataTypes) => sequelize.define('Comida', {
  name: { 
    type: DataTypes.STRING, 
    required: true 
  },
  calories: { 
    type: DataTypes.NUMBER, 
    required: true },
  type: { 
    type: DataTypes.ENUM('tacos', 'suprise packages', 'mole', 'black stuff'), 
    required: true }
});

module.exports = foodModel;