import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import contactRoutes from "./apis/routes/indes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev")); 
app.get("/", (req, res) => {
  res.send("Welcome to Rwanda Tour API");
});
app.use("/api/v1", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
