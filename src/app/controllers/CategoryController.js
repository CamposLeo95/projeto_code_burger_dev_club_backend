import * as Yup from "yup";
import Category from "../models/Category";
import User from "../models/User";

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

    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json();
    }

    const { name } = req.body;

    const { filename: path } = req.file;

    const category = await Category.findOne({ where: { name } });
    if (category) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const { id } = await Category.create({ name, path });

    return res.status(400).json({ message: { id, name } });
  }

  async index(req, res) {
    const categories = await Category.findAll();

    return res.status(400).json(categories);
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
      });

      try {
        await schema.validateSync(req.body);
      } catch (err) {
        return res.status(400).json({ msg: err.errors });
      }

      const { admin: isAdmin } = await User.findByPk(req.userId);

      if (!isAdmin) {
        return res.status(401).json();
      }

      const { name } = req.body;

      const { id } = req.params;

      const categoryId = await Category.findByPk(id);

      if (!categoryId) {
        return res.status(400).json({ error: "Make sure your id is correct" });
      }
      let path;
      if (req.file) {
        path = req.file.filename;
      }

      await Category.update({ name, path }, { where: { id } });

      return res.status(200).json();
    } catch (error) {
      return res.status(400).json();
    }
  }
}
export default new CategoryController();
