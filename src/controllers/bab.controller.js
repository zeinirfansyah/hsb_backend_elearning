const { bab } = require("../models");

const listBab = async (req, res, next) => {
  const { id_mata_pelajaran } = req.query;

  if (!id_mata_pelajaran) {
    return res.status(400).send({
      message: "id_mata_pelajaran is required",
      data: null,
    });
  }

  try {
    const babList = await bab.findAll({
      where: {
        id_pelajaran: id_mata_pelajaran,
      },
    });

    if (!babList.length) {
      return res.status(404).send({
        message: "No bab found",
        data: [],
      });
    }

    return res.status(200).send({
      message: "Success",
      data: babList,
    });
  } catch (error) {
    console.error("Error fetching bab:", error);
    return res.status(500).send({
      message: "Internal server error",
      data: null,
    });
  }
}

module.exports = { listBab }