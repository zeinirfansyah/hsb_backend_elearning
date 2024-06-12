const { modePembelajaranKelas, mataPelajaran } = require("../models");

const listMataPelajaran = async (req, res, next) => {
  const { id_kelas, id_mode_pembelajaran } = req.query;

  if (!id_kelas || !id_mode_pembelajaran) {
    return res.status(400).send({
      message: "id_kelas and id_mode_pembelajaran are required",
      data: null,
    });
  }

  try {
    const modePembelajaranKelasInstance = await modePembelajaranKelas.findOne({
      where: {
        id_kelas,
        id_mode: id_mode_pembelajaran,
      },
    });

    console.log("modePembelajaranKelasInstance:", modePembelajaranKelasInstance);

    if (!modePembelajaranKelasInstance) {
      return res.status(404).send({
        message: "No matching modePembelajaranKelas found",
        data: null,
      });
    }

    const mataPelajaranList = await mataPelajaran.findAll({
      where: {
        id_mpk: modePembelajaranKelasInstance.id,
      },
      attributes: ["nama_pelajaran"],
    });

    if (!mataPelajaranList.length) {
      return res.status(404).send({
        message: "No mata pelajaran found",
        data: [],
      });
    }

    return res.status(200).send({
      message: "Success",
      data: mataPelajaranList,
    });
  } catch (error) {
    console.error("Error fetching mata pelajaran:", error);
    return res.status(500).send({
      message: "Internal server error",
      data: null,
    });
  }
};

module.exports = { listMataPelajaran };
