"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class modePembelajaranKelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      modePembelajaranKelas.belongsTo(models.modePembelajaran, {
        foreignKey: "id_mode",
      });

      modePembelajaranKelas.belongsTo(models.Kelas, {
        foreignKey: "id_kelas",
      });

      modePembelajaranKelas.hasMany(models.mataPelajaran, {
        foreignKey: "id_mpk",
      });
    }
  }

  modePembelajaranKelas.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
      id_mode: DataTypes.INTEGER,
      id_kelas: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "modePembelajaranKelas",
    }
  );
  return modePembelajaranKelas;
};
