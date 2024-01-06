import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello World" });
});

app.get("/api/users", (req, res) => {
  res.send([
    { id: 1, username: "brain-dev", displayName: "Brain Dev" },
    { id: 2, username: "mike", displayName: "Mike" },
    { id: 3, username: "jane", displayName: "Jane" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
