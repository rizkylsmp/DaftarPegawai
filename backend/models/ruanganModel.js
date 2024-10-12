import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Ruangan = db.define(
  "ruangan",
  {
    id_ruangan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Ruangan;
