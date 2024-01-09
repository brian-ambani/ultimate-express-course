import express from "express";

import routes from "./routes/index.mjs";

const app = express();

// middleware
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
