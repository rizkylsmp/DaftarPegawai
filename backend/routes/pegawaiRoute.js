import express from "express";
import {
  getPegawai,
  createPegawai,
  updatePegawai,
  deletePegawai,
} from "../controllers/pegawaiController.js";

const router = express.Router();

router.get("/pegawai", getPegawai);
router.post("/pegawai", createPegawai);
router.put("/pegawai/:nip", updatePegawai);
router.delete("/pegawai/:nip", deletePegawai);

export default router;
