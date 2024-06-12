const { Kelas, modePembelajaran } = require("../models");

const listKelas = async (_req, res, _next) => {
  try {
    const kelas = await Kelas.findAll({
      include: [
        {
          model: modePembelajaran,
          as: "modepembelajarans",
          attributes: ["nama_mode"],
          through: { attributes: [] },
        },
      ],
      attributes: ["nama_kelas"],
    });

    if (!kelas.length) {
      return res.status(404).send({
        message: "No kelas found",
        data: [],
      });
    }

    const formattedData = kelas.map((k) => ({
      nama_kelas: k.nama_kelas,
      modepembelajarans: k.modepembelajarans.map((mp) => mp.nama_mode),
    }));

    return res.status(200).send({
      message: "Success",
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching list of kelas:", error);
    return res.status(500).send({
      message: "Internal server error",
      data: null,
    });
  }
};

module.exports = { listKelas };
