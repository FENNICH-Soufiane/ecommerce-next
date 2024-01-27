import multiparty from "multiparty";
import cloudinary from "cloudinary";
import { mongooseConnect } from "@/lib/mongoose";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handle = async (req, res) => {
  await mongooseConnect();

  const form = new multiparty.Form();

  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const links = [];
  for (const file of files.file) {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      //   folder contient le nom de folder dans cloudinary
      folder: "ecommerce_Next_with_mongodb",
      public_id: `file_${Date.now()}`,
      resource_type: "auto",
      width: 800, // Spécifiez la largeur souhaitée
      height: 600, // Spécifiez la hauteur souhaitée
    });
    const link = result.secure_url;
    links.push(link);
  }
  return res.json({ links });
};

export const config = {
  api: { bodyParser: false },
};

// export const config = {
//   api: {
//       bodyParser: {
//           sizeLimit: '5mb' // Set desired value here
//       }
//   }
// }

export default handle;
