const {materials} = require("../models");

const listMaterial = async (req, res, next) => {
    const { id_sub_bab } = req.query;

    if (!id_sub_bab) {
        return res.status(400).send({
            message: "id_sub_bab is required",
            data: null,
        });
    }

    try {
        const materialList = await materials.findAll({
            where: {
                id_sub: id_sub_bab
            }
        });

        if (!materialList.length) {
            return res.status(404).send({
                message: "No material found",
                data: [],
            });
        }

        return res.status(200).send({
            message: "Success",
            data: materialList,
        });
    } catch (error) {
        console.error("Error fetching material:", error);
        return res.status(500).send({
            message: "Internal server error",
            data: null,
        });
    }
}

module.exports = { listMaterial }