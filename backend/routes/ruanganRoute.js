import express from "express";
import {
  getRuangan,
  createRuangan,
  updateRuangan,
  deleteRuangan,
} from "../controllers/ruanganController.js";

const router = express.Router();

router.get("/ruangan", getRuangan);
router.post("/ruangan", createRuangan);
router.put("/ruangan/:id_ruangan", updateRuangan);
router.delete("/ruangan/:id_ruangan", deleteRuangan);

export default router;
