'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('./clothes/models.js');
const foodModel = require('./food/models.js');
const userModel = require('./users/users.js');
const Collection = require('./collection.js');

// Updated the below
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

const sequelize = new Sequelize(DATABASE_URL);
const clothes = clothesModel(sequelize, DataTypes);
const food = foodModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users,
  food: new Collection(food),
  clothes: new Collection(clothes),
}