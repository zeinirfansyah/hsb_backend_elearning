'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class materials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here


      materials.belongsTo(models.subbab, {
        foreignKey: 'id_sub'
      })

      materials.hasMany(models.progres, {
        foreignKey: 'id_materi'
      })
    }
  }
  materials.init({
    nama_materi: DataTypes.STRING,
    gold: DataTypes.INTEGER,
    exp: DataTypes.INTEGER,
    tipe_materi: DataTypes.STRING,
    id_sub: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'materials',
  });
  return materials;
};