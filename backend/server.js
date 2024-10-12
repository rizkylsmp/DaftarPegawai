import db from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pegawaiRoute from "./routes/pegawaiRoute.js";
import ruanganRoute from "./routes/ruanganRoute.js";

dotenv.config();

(async () => {
  await db.sync();
})();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", pegawaiRoute);
app.use("/api", ruanganRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
