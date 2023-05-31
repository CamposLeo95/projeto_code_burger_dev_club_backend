import { v4 } from "uuid";
import * as Yup from "yup";
import bcrypt from "bcrypt";
import User from "../models/User";

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password_hash: Yup.string().required().min(7),
      admin: Yup.boolean(),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ msg: err.errors });
    }
    const { name, email, password_hash, admin } = req.body;

    const userExist = await User.findOne({
      where: { email },
    });

    if (userExist) {
      return res
        .status(400)
        .json({ msg: `The email "${email}" already exist` });
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    });
    return res.status(201).json({ id: user.id, name, email, admin });
  }
}

export default new UserController();
