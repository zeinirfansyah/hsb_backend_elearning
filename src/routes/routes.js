const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { listKelas } = require("../controllers/kelas.controller");
const { listMataPelajaran } = require("../controllers/matapelajaran.controller");

router.get("/kelas", verifyToken, listKelas);
router.get("/mata-pelajaran", verifyToken, listMataPelajaran);

module.exports = router;
