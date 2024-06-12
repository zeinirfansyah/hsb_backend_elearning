'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      bab.belongsTo(models.mataPelajaran, {
        foreignKey: 'id_pelajaran'
      })

      bab.hasMany(models.subbab, {
        foreignKey: 'id_bab'
      })
    }
  }
  bab.init({
    nama_bab: DataTypes.STRING,
    thumbnail_bab: DataTypes.STRING,
    sub_bab_gratis: DataTypes.DOUBLE,
    id_pelajaran: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bab',
  });
  return bab;
};