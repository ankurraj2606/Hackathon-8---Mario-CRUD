const mongoose = require("mongoose");
const port = 3000;
const app = require("./app");
const marioModel = require("./models/marioChar");
mongoose.connect("mongodb://localhost/testaroo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection
  .once("open", () => {
    console.log("connection established");
  })
  .on("connectionError", (err) => {
    console.log(err);
  });

app.get("/mario", async (req, res) => {
  const allMarios = await marioModel.find();
  res.status(201).send(allMarios);
});

app.get("/mario/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const allMarios = await marioModel.findById({ _id: id });
    console.log(allMarios);
    res.status(201).send(allMarios);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.post("/mario", async (req, res) => {
  const mario = req.body;
  console.log(mario);
  try {
    const newMario = new marioModel(mario);
    await newMario.save();
    res.status(201).send(newMario);
  } catch (err) {
    res.status(400).send({ message: "either name or weight is missing" });
  }
});

app.patch("/mario/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const mario = req.body;
  console.log(mario);

  try {
    const resultingMario = await marioModel.updateOne({ _id: id }, mario);
    res.status(200).send(mario);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.delete("/mario/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await marioModel.deleteOne({ _id: id });
    res.status(201).send({ message: "character deleted" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
