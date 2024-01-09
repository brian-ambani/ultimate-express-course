import express from "express";

import usersrouter from "./routes/users.mjs";
import productsrouter from "./routes/products.mjs";

const app = express();

// middleware
app.use(express.json());
app.use(usersrouter);
app.use(productsrouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
