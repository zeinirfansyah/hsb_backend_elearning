const {subbab} = require("../models");

const listSubBab = async (req, res, next) => {
  const { id_bab } = req.query;

  if (!id_bab) {
    return res.status(400).send({
      message: "id_bab is required",
      data: null,
    });
  }

  try {
    const subBabList = await subbab.findAll({
      where: {
        id_bab: id_bab,
      }
    });

    if (!subBabList.length) {
      return res.status(404).send({
        message: "No sub-bab found",
        data: [],
      });
    }

    return res.status(200).send({
      message: "Success",
      data: subBabList,
    });
  } catch (error) {
    console.error("Error fetching sub-bab:", error);
    return res.status(500).send({
      message: "Internal server error",
      data: null,
    });
  }
};

module.exports = { listSubBab };
