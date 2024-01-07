import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const Users = [
  { id: 1, username: "brain", displayName: "Brain" },
  { id: 2, username: "mike", displayName: "Mike" },
  { id: 3, username: "jane", displayName: "Jane" },
  { id: 4, username: "joe", displayName: "Joe" },
  { id: 5, username: "james", displayName: "James" },
  { id: 6, username: "micah", displayName: "Micah" },
  { id: 7, username: "john", displayName: "John" },
];

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello World" });
});

// simple routes
app.get("/api/users", (req, res) => {
  // query params
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  // when filter and value are not passed
  if (!filter && !value) return res.send(Users);

  // when filter and value are passed
  if (filter && value) {
    return res.send(Users.filter((user) => user[filter].includes(value)));
  }
  //   if on of the query params is passed
  return res.send(Users);
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

// query params

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
