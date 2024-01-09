import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import {
  filterUserValidationSchema,
  createUserValidationSchema,
} from "../utils/validationSchema.mjs";
import { Users } from "../utils/constants.mjs";
import { resolveIndexByUserId } from "../middleware/middlewares.mjs";

const router = Router();

// router.get("/api/users", (req, res) => {
//   res.send(Users);
// });

router.get(
  "/api/users",
  checkSchema(filterUserValidationSchema),
  (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }
    const data = matchedData(req);
    console.log(data);
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
  }
);
router.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;

  const user = Users[findUserIndex];
  if (!user) {
    return res.status(404).send({ msg: "User not found" });
  }
  res.send(user);
});

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }
    const data = matchedData(req);

    const newUser = { id: Users[Users.length - 1].id + 1, ...data };
    Users.push(newUser);
    return res.status(201).send(newUser);
  }
);

router.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;

  Users[findUserIndex] = { id: Users[findUserIndex].id, ...body };
  return res.sendStatus(200);
});

// PATCH

router.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;

  Users[findUserIndex] = { ...Users[findUserIndex], ...body };
  return res.sendStatus(200);
});

// DELETE

router.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  Users.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

export default router;
