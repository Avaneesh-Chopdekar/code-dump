import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import Document from "./models/Document";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set('views', './views');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI || "");

app.get("/", (req, res) => {
  const code = `Welcome to Code Dump!

Use the commands in the top right corner
to create a new file to share with others. 
`;

  res.render("code-display", {
    code,
    lineNumbers: code.split("\n").length,
    language: "language-plaintext",
  });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/save", async (req, res) => {
  const { value } = req.body;
  try {
    const document = await Document.create({ value });
    res.redirect(`/${document._id}`);
  } catch (error) {
    res.render("new", { value });
  }
});

app.get("/:id/duplicate", async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.findById(id);
    res.render("new", { value: document!!.value });
  } catch (error) {
    res.redirect(`/${id}`);
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.findById(id);
    const code = document!!.value;
    res.render("code-display", {
      code,
      lineNumbers: code.split("\n").length,
      id,
    });
  } catch (error) {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log("Code Dump listening on port " + port);
});

export default app;
