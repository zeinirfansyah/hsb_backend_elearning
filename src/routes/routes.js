const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { listKelas } = require("../controllers/kelas.controller");
const { listMataPelajaran } = require("../controllers/matapelajaran.controller");
const { listBab } = require("../controllers/bab.controller");

router.get("/kelas", verifyToken, listKelas);
router.get("/mata-pelajaran", verifyToken, listMataPelajaran);
router.get("/bab/", verifyToken, listBab);

module.exports = router;
