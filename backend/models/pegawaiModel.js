import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Ruangan from "./ruanganModel.js";

const Pegawai = db.define(
  "pegawai",
  {
    nip: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    tgl_lahir: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id_ruangan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Ruangan,
        key: "id_ruangan",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

// Pegawai.js (model)
Pegawai.belongsTo(Ruangan, { foreignKey: "id_ruangan", as: "ruangan" });

// Ruangan.js (model)
Ruangan.hasMany(Pegawai, { foreignKey: "id_ruangan" });

export default Pegawai;
