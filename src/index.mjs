import express from "express";

const app = express();

// middleware
app.use(express.json());

// middleware

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.status(400).send({ msg: "Invalid ID" });

  const findUserIndex = Users.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1)
    return res.status(404).send({ msg: "User not found" });
  req.findUserIndex = findUserIndex;
  next();
};

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
app.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;

  const user = Users[findUserIndex];
  if (!user) {
    return res.status(404).send({ msg: "User not found" });
  }
  res.send(user);
});

//post request
app.post("/api/users", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const newUser = { id: Users[Users.length - 1].id + 1, ...body };
  Users.push(newUser);
  return res.status(201).send(newUser);
});

// PUT

app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;

  Users[findUserIndex] = { id: Users[findUserIndex].id, ...body };
  return res.sendStatus(200);
});

// PATCH

app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;

  Users[findUserIndex] = { ...Users[findUserIndex], ...body };
  return res.sendStatus(200);
});

// DELETE

app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  Users.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
