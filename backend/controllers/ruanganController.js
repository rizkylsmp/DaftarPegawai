import RuanganModel from "../models/ruanganModel.js";

// GET
export const getRuangan = async (req, res) => {
  try {
    const ruangan = await RuanganModel.findAll();
    res.status(200).json(ruangan);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// CREATE
export const createRuangan = async (req, res) => {
  const { keterangan } = req.body;

  if (!keterangan) {
    return res
      .status(400)
      .json({ error: "Kolom keterangan tidak boleh kosong" });
  }

  try {
    const newRuangan = await RuanganModel.create({ keterangan });
    res.status(201).json({ msg: "Ruangan berhasil dibuat", newRuangan });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// UPDATE
export const updateRuangan = async (req, res) => {
  const { id_ruangan } = req.params;
  const { keterangan } = req.body;

  try {
    const ruangan = await RuanganModel.findOne({ where: { id_ruangan } });

    if (!ruangan) {
      return res.status(404).json({ msg: "Ruangan tidak ditemukan" });
    }

    await RuanganModel.update({ keterangan }, { where: { id_ruangan } });

    res.status(200).json({ msg: "Data ruangan berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// DELETE
export const deleteRuangan = async (req, res) => {
  const { id_ruangan } = req.params;

  try {
    const ruangan = await RuanganModel.findOne({ where: { id_ruangan } });

    if (!ruangan) {
      return res.status(404).json({ msg: "Ruangan tidak ditemukan" });
    }

    await RuanganModel.destroy({ where: { id_ruangan } });
    res.status(200).json({ msg: "Data ruangan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
