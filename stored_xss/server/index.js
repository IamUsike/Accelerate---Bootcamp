import express from "express";
import cors from "cors";
import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" })); //in forms
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //from url

const router = Router();

const todos = [];

app.post("/add", (req, res) => {
  const { todo } = req.body;
  if (!todo) return res.status(400).json({ error: "No todo provided" });
  todos.push(todo);
  return res.status(200).json({ todos }); // return all todos
});

app.get("/todos", (req, res) => {
  return res.status(200).json({ todos }); // return all todos on page load
});

app.use("/", router);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
