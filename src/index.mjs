import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const Users = [
  { id: 1, username: "brain-dev", displayName: "Brain Dev" },
  { id: 2, username: "mike", displayName: "Mike" },
  { id: 3, username: "jane", displayName: "Jane" },
];

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello World" });
});

// simple routes
app.get("/api/users", (req, res) => {
  res.send(Users);
});

app.get("/api/products", (req, res) => {
  res.send([
    { id: 123, name: "product1", price: 100, description: "this is product 1" },
  ]);
});

// route params(simple user base on the ID passed)
app.get("/api/users/:id", (req, res) => {
  console.log(req.params.id);
  const parsedId = parseInt(req.params.id);
  console.log(parsedId);

  if (isNaN(parsedId)) {
    return res.status(400).send({ msg: "Invalid ID" });
  }

  const user = Users.find((user) => user.id === parsedId);
  if (!user) {
    return res.status(404).send({ msg: "User not found" });
    // or
    // return res.sendStatus(404);
  }
  res.send(user);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
