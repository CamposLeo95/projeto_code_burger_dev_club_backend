import * as Yup from "yup";
import Product from "../models/Product";
import Category from "../models/Category";
import Order from "../../schemas/OrderSchema";
import User from "../models/User";

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      products: Yup.array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          })
        ),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const productId = req.body.products.map((product) => product.id);

    const productsFind = await Product.findAll({
      where: { id: productId },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    const productEdited = productsFind.map((product) => {
      const productIndex = req.body.products.findIndex(
        (reqProduct) => reqProduct.id === product.id
      );

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category.name,
        url: product.url,
        quantity: req.body.products[productIndex].quantity,
      };
    });

    const order = {
      user: {
        id: req.userId,
        name: req.userName,
      },
      products: productEdited,
      status: "Pedido Realizado",
    };

    const orderResponse = await Order.create(order);

    return res.status(200).json(orderResponse);
  }

  async index(req, res) {
    const orders = await Order.find();

    return res.status(200).json(orders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      status: Yup.string().required(),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json();
    }

    const { id } = req.params;
    const { status } = req.body;

    try {
      await Order.updateOne({ _id: id }, { status });
    } catch (err) {
      return res.status(400).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "status alterado" });
  }
}

export default new OrderController();
