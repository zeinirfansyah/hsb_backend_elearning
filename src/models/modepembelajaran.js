"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class modePembelajaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      modePembelajaran.belongsToMany(models.Kelas, {
        through: models.modePembelajaranKelas,
        as: "kelas",
        foreignKey: "id_mode",
      });
    }
  }
  modePembelajaran.init(
    {
      nama_mode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "modePembelajaran",
    }
  );
  return modePembelajaran;
};
