'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Details.init({
    role:DataTypes.STRING,
    user_id:DataTypes.INTEGER,
    startupsInvesting:DataTypes.TEXT,
    fName:DataTypes.STRING,
    lName:DataTypes.STRING,
    email:DataTypes.STRING,
    linkdinId:DataTypes.STRING,
    teamMembers:DataTypes.JSON,
    isAdmin:DataTypes.BOOLEAN,
    isStarred:DataTypes.BOOLEAN,
    additionalRead:DataTypes.JSON,
    profileImageUrl:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Details',
  });
  return Details;
};