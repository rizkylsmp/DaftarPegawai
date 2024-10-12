import PegawaiModel from "../models/pegawaiModel.js";
import RuanganModel from "../models/ruanganModel.js";

// GET
export const getPegawai = async (req, res) => {
  try {
    const pegawai = await PegawaiModel.findAll({
      include: {
        model: RuanganModel,
        as: "ruangan",
        attributes: ["keterangan"],
      },
    });
    res.status(200).json(pegawai);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// UPDATE
export const updatePegawai = async (req, res) => {
  const { nip } = req.params;
  const { nama, alamat, tgl_lahir, id_ruangan } = req.body;

  try {
    const pegawai = await PegawaiModel.findOne({ where: { nip } });

    if (!pegawai) {
      return res.status(404).json({ msg: "Pegawai tidak ditemukan" });
    }

    await PegawaiModel.update(
      { nama, alamat, tgl_lahir, id_ruangan },
      { where: { nip } }
    );

    res.status(200).json({ msg: "Data pegawai berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// DELETE
export const deletePegawai = async (req, res) => {
  const { nip } = req.params;

  try {
    const pegawai = await PegawaiModel.findOne({ where: { nip } });

    if (!pegawai) {
      return res.status(404).json({ msg: "Pegawai tidak ditemukan" });
    }

    await PegawaiModel.destroy({ where: { nip } });
    res.status(200).json({ msg: "Data pegawai berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// CREATE
export const createPegawai = async (req, res) => {
  const { nama, alamat, tgl_lahir, id_ruangan } = req.body;

  if (!nama || !alamat || !tgl_lahir || !id_ruangan) {
    return res.status(400).json({ error: "Kolom tidak boleh kosong" });
  }

  try {
    const newPegawai = await PegawaiModel.create({
      nama,
      alamat,
      tgl_lahir,
      id_ruangan,
    });
    res.status(201).json({ msg: "Data berhasil dibuat", newPegawai });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
