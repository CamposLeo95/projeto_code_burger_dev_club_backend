import * as Yup from "yup";

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ msg: err.errors });
    }

    return res.status(201).json({ msg: "criado" });
  }
}

export default new ProductController();
