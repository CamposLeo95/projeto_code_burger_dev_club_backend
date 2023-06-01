import * as Yup from "yup";
import User from "../models/User";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    const userEmailOrPassIncorrect = () =>
      res.status(400).json({ message: "Email or password is invalidate!" });

    if (!(await schema.isValid(req.body))) userEmailOrPassIncorrect();

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) userEmailOrPassIncorrect();

    if (!(await user.checkPassword(password))) userEmailOrPassIncorrect();

    return res.status(200).json(user);
  }
}

export default new SessionController();
