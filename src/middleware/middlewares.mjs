import { Users } from "../utils/constants.mjs";

export const resolveIndexByUserId = (req, res, next) => {
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
