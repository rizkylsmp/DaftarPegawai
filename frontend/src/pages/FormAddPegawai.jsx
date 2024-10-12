import React, { useState, useEffect } from "react";
import axios from "axios";

const FormAddPegawai = ({ show, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    tgl_lahir: "",
    id_ruangan: "",
  });

  const [ruanganList, setRuanganList] = useState([]);

  useEffect(() => {
    if (show) {
      setFormData({
        nama: "",
        alamat: "",
        tgl_lahir: "",
        id_ruangan: "",
      });
      fetchRuangan();
    }
  }, [show]);

  const fetchRuangan = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/ruangan`
      );
      setRuanganList(response.data);
    } catch (error) {
      console.error("Error fetching ruangan data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nama || !formData.tgl_lahir || !formData.id_ruangan) {
      window.alert("Semua field wajib diisi!");
      return;
    }

    const payload = {
      nama: formData.nama,
      alamat: formData.alamat,
      tgl_lahir: formData.tgl_lahir,
      id_ruangan: formData.id_ruangan,
    };

    console.log("Payload to Send:", payload);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/pegawai`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);
      onSave(response.data);
      onClose();
    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        window.alert(error.response.data.error || "Terjadi kesalahan.");
      } else {
        console.error("Error Message:", error.message);
        window.alert("Terjadi kesalahan saat menambahkan data.");
      }
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-40 text-color-1 text-nowrap">
      <div className="bg-color-6 p-5 rounded shadow-lg w-4/5 max-h-[80vh] overflow-y-auto">
        <h2 className="font-bold text-xl mb-4">Tambah Data Pegawai</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1" htmlFor="nama">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={(e) =>
                setFormData({ ...formData, nama: e.target.value })
              }
              className="w-full px-2 py-1 border border-color-4 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="alamat">
              Alamat
            </label>
            <input
              type="text"
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={(e) =>
                setFormData({ ...formData, alamat: e.target.value })
              }
              className="w-full px-2 py-1 border border-color-4 rounded"
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="tgl_lahir">
              Tanggal Lahir
            </label>
            <input
              type="date"
              id="tgl_lahir"
              name="tgl_lahir"
              value={formData.tgl_lahir}
              onChange={(e) =>
                setFormData({ ...formData, tgl_lahir: e.target.value })
              }
              className="w-full px-2 py-1 border border-color-4 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="id_ruangan">
              Nama Ruangan
            </label>
            <select
              id="id_ruangan"
              name="id_ruangan"
              value={formData.id_ruangan}
              onChange={(e) =>
                setFormData({ ...formData, id_ruangan: e.target.value })
              }
              className="w-full px-2 py-1 border border-color-4 rounded"
              required
            >
              <option value="">Pilih Ruangan</option>
              {ruanganList.map((ruangan) => (
                <option key={ruangan.id_ruangan} value={ruangan.id_ruangan}>
                  {ruangan.keterangan}
                </option>
              ))}
            </select>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-color-5 hover:scale-105 py-2 px-4 rounded text-color-6"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-color-4 hover:scale-105 py-2 px-4 rounded text-color-6"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddPegawai;
