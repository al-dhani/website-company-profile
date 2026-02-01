import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import produkRoutes from "./routes/produkRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import artikelRoutes from "./routes/artikelRoutes.js";
import partnersRoutes from "./routes/partnersRoutes.js";
import galeriRoutes from "./routes/galeriRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ROUTE
app.use("/api/produk", produkRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/artikel", artikelRoutes);
app.use("/api/partners", partnersRoutes);
app.use("/api/galeri", galeriRoutes);
app.use("/api/admin", adminRoutes);

// jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
