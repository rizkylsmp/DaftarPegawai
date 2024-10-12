import React, { useState, useEffect } from "react";
import axios from "axios";
import FormAddPegawai from "./FormAddPegawai";
import FormEditPegawai from "./FormEditPegawai";

// IMPORT ICONS
import { FaPlusSquare } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const Pegawai = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // GET DATA
  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/pegawai`
      );
      console.log("Data fetched:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // DELETE DATA
  const deleteData = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/pegawai/${deleteId}`
      );
      await getData();
      setConfirmDelete(false);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const showConfirmation = (dataId) => {
    setDeleteId(dataId);
    setConfirmDelete(true);
  };

  const hideConfirmation = () => {
    setConfirmDelete(false);
  };

  // SEARCH
  const filteredItems = data.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // EDIT
  const handleEditClick = (item) => {
    setSelectedEmployee(item);
    setShowEditForm(true);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* TITLE */}
      <div className="font-bold text-3xl">Daftar Nama Pegawai</div>

      {/* DESCRIPTION */}
      <div className="text-lg">
        <div>Berikut ini adalah daftar nama pegawai</div>
      </div>

      {/* BUTTON INPUT */}
      <button
        onClick={() => setShowAddForm(true)}
        className="flex gap-2 items-center font-semibold py-2 px-4 rounded-lg bg-color-4 text-color-6 w-fit cursor-pointer"
      >
        <FaPlusSquare />
        Tambah
      </button>

      {/* SEARCH BAR */}
      <div className="flex gap-3 items-center my-2">
        <div className="text-nowrap">Search :</div>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Nama Pegawai..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-9 px-2 py-1 border border-gray-300 rounded-md text-color-1 w-full"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white text-nowrap text-color-1">
          <thead>
            <tr className="border-color-3 text-left">
              <th className="border px-6 py-3 cursor-pointer">NIP</th>
              <th className="border px-6 py-3 cursor-pointer">Nama</th>
              <th className="border px-6 py-3 cursor-pointer">Alamat</th>
              <th className="border px-6 py-3 cursor-pointer">Tanggal Lahir</th>
              <th className="border px-6 py-3 cursor-pointer">Nama Ruangan</th>
              <th className="border px-6 py-3 text-center">Pilihan</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.nip} className="border-color-5">
                <td className="border px-6 py-4">{item.nip}</td>
                <td className="border px-6 py-4">{item.nama}</td>
                <td className="border px-6 py-4">{item.alamat}</td>
                <td className="border px-6 py-4">{item.tgl_lahir}</td>
                <td className="border px-6 py-4">{item.ruangan.keterangan}</td>
                <td className="border px-6 py-4">
                  <div className="flex gap-1 justify-center text-center">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="flex gap-1 bg-color-4 py-1 px-2 rounded text-color-6"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => showConfirmation(item.nip)}
                      className="flex gap-1 items-center bg-color-3 py-1 px-2 rounded text-color-6"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* OVERLAY */}
      <FormAddPegawai
        show={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSave={getData}
      />

      <FormEditPegawai
        show={showEditForm}
        onClose={() => setShowEditForm(false)}
        onSave={getData}
        employeeData={selectedEmployee}
      />

      {confirmDelete && (
        <div className="fixed inset-0 bg-color-1 bg-opacity-50 flex justify-center items-center z-50 text-color-1">
          <div className="bg-white py-5 px-10 rounded-md text-center">
            <div className="text-xl font-bold">Perhatian!</div>
            <div className="text-lg mb-2">
              Apakah Anda yakin ingin menghapus data pegawai ini?
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={hideConfirmation}
                className="bg-color-2 text-color-6 px-4 py-2 rounded-md"
              >
                Batal
              </button>
              <button
                onClick={deleteData}
                className="bg-color-4 text-color-6 px-4 py-2 rounded-md"
              >
                Ya!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pegawai;
