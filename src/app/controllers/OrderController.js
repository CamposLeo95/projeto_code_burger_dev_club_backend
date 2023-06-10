import * as Yup from "yup";
import Product from "../models/Product";
import Category from "../models/Category";

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
    };

    return res.status(200).json(order);
  }
}

export default new OrderController();
