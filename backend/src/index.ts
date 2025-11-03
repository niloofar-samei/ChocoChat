import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());

// simple health route
app.get("/", (req, res) => {
  res.send("Hello — backend is up!");
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
