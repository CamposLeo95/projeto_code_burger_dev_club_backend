import { Router } from "express";
import { v4 } from "uuid";

import User from "./app/models/User";

const routes = new Router();

routes.get("/", async (req, res) => {
  const user = await User.create({
    id: v4(),
    name: "Leonardo",
    email: "Leo@email.com",
    password_hash: "2dsa65d1d",
  });

  return res.json(user);
});

export default routes;
