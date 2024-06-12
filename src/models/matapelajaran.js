'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mataPelajaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      mataPelajaran.belongsTo(models.modePembelajaranKelas, {
        foreignKey: 'id_mpk'
      })

      mataPelajaran.hasMany(models.bab, {
        foreignKey: 'id_pelajaran'
      })
    }
  }
  mataPelajaran.init({
    nama_pelajaran: DataTypes.STRING,
    thumbnail_pelajaran: DataTypes.STRING,
    id_mpk: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'mataPelajaran',
  });
  return mataPelajaran;
};