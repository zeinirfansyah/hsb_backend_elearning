'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class progres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      progres.belongsTo(models.materials, {
        foreignKey: 'id_materi'
      })

      progres.belongsTo(models.User, {
        foreignKey: 'id_user'
      })
    }
  }
  progres.init({
    id_materi: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'progres',
  });
  return progres;
};