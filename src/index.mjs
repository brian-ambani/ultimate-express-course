import express from "express";

import usersroutes from "./routes/users.mjs";

const app = express();

// middleware
app.use(express.json());
app.use(usersroutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello World" });
});

app.get("/api/products", (req, res) => {
  res.send([
    { id: 123, name: "product1", price: 100, description: "this is product 1" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
