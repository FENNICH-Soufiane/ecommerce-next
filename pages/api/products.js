import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

const handle = async (req, res) => {
  const { method } = req;

  try {
    await mongooseConnect();

    if (method === "POST") {
      const { title, description, price, images } = req.body;
      const productDoc = await Product.create({
        title,
        description,
        price,
        // images,
        images: Array.isArray(images) ? images : [],
      });
      res.json(productDoc);
    }

    // if(method === "DELETE") {
    //   if(req.query.id) {
    //     await Product.deleteOne({_id = req.query.id})
    //     res.json(true);
    //   }
    // }
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handle;
