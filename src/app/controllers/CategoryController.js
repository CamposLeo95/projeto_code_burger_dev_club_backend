import * as Yup from "yup";
import Category from "../models/Category";

class CategoryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    try {
      await schema.validateSync(req.body);
    } catch (err) {
      return res.status(400).json({ msg: err.errors });
    }

    const { name } = req.body;
    const category = await Category.findOne({ where: { name } });
    if (category) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const { id } = await Category.create({ name });

    return res.status(400).json({ message: { id, name } });
  }

  async index(req, res) {
    const categories = await Category.findAll();

    return res.status(400).json(categories);
  }
}

export default new CategoryController();
