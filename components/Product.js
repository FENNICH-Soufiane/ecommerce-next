/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import toast from 'react-hot-toast';

const Product = ({
  _id,
  title:existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages
}) => {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);

  const [isUploading, setIsUploading] = useState(false);

  const uploadImagesQueue = [];

  const createProduct = async (e) => {
    e.preventDefault();
    // const data = {title, description, price};
    // await axios.post('/api/products', data);

    // setRedirect(true);

    // if(redirect) {
    //   router.push('/products');
    //   return null;
    // }

    try {
      // if (isUploading) {
      //   await Promise.all(uploadImagesQueue);
      // }
      const data = { title, description, price, images };

      if(_id) {
        await axios.put("/api/products", {...data, _id});
        toast.success('product Edited Successfully!');
      } else {
        await axios.post("/api/products", data);
        toast.success('product Created Successfully!');
      }

      router.push("/products");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const uploadImages = async (e) => {
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      for (const file of files) {
        const data = new FormData();
        data.append("file", file);

        uploadImagesQueue.push(
          axios.post("/api/upload", data).then((res) => {
            setImages((oldImages) => [...oldImages, ...res.data.links]);
          })
        );
      }
      await Promise.all(uploadImagesQueue);
      setIsUploading(false);
    } else {
      return "An error occured";
    }
  };

  const updateImageOrder = (Images) => {
    setImages(Images);
  };

  const handleDeleteImage = (index) => {
    const updateImages = [...images];
    updateImages.splice(index, 1);
    setImages(updateImages);
  }

  return (
    <>
      <form onSubmit={createProduct} className="mx-auto max-w-screen-sm">
        <div className="mx-auto my-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-lg font-medium text-gray-700"
            >
              Title
            </label>

            <input
              type="text"
              id="email"
              className="block w-full rounded-md border-gray-500 shadow-sm focus:border-green-300 focus:ring-0 "
              placeholder="Product Title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
          </div>
        </div>

        <div className="mx-auto my-4">
          <div>
            <label
              htmlFor="category"
              className="mb-1 block text-lg font-medium text-gray-700"
            >
              Select Category
            </label>

            <div className="mx-auto max-w-screen-sm">
              <select
                id="category"
                className="block w-full rounded-md border-gray-500 shadow-sm focus:border-green-300 focus:ring-0"
              >
                <option value="">No Category Selected</option>
                <option value="">Option02</option>
                <option value="">Option03</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mx-auto my-4">
          <div className="mx-auto ">
            <label
              htmlFor="images"
              className="mb-1 block text-lg font-medium text-gray-700 "
            >
              Images
            </label>
            <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-blue-300 p-6 transition-all hover:border-primary-300">
              <div className="space-y-1 text-center">
                <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </div>
                <div className="text-gray-600">
                  <a
                    href="#"
                    className="font-medium text-primary-500 hover:text-primary-700"
                  >
                    Click to upload
                  </a>{" "}
                  or drag and drop
                </div>
                <p className="text-sm text-gray-500">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="images/*"
                mutiple="true"
                onChange={uploadImages}
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center rounded">
          {isUploading && (
            <Spinner className="p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>
        {/* affichage des images */}
        {!isUploading && images.length > 0 && (
          <div className="">
            <ReactSortable
              list={Array.isArray(images) ? images : []}
              setList={updateImageOrder}
              animation={200}
              className="grid grid-cols-4 gap-4"
            >
              {Array.isArray(images) &&
                images.map((link, index) => {
                  return (
                    <div key={link} className="relative group">
                      <img
                        src={link}
                        alt="image"
                        className="object-cover h-32 w-44 rounded-md p-2"
                        width={800} // Remplacez par la largeur correcte
                        height={600} // Remplacez par la hauteur correcte
                      />
                      <div className="absolute top-2 right-2 cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity">
                        <button onClick={() => handleDeleteImage(index)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </ReactSortable>
          </div>
        )}

        <div className="mx-auto my-4">
          <div>
            <label
              htmlFor="description"
              className="mb-1 block text-lg font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              rows={5}
              type="text"
              id="description"
              className="block w-full rounded-md border-gray-500 shadow-sm focus:border-green-300 focus:ring-0 "
              placeholder="Product Description"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
          </div>
        </div>

        <div className="mx-auto my-4">
          <div>
            <label
              htmlFor="price"
              className="mb-1 block text-lg font-medium text-gray-700"
            >
              Price
            </label>

            <input
              type="number"
              id="price"
              className="block w-full rounded-md border-gray-500 shadow-sm focus:border-green-300 focus:ring-0 "
              placeholder="Product Price"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>

        <div className="mx-auto my-4">
          <button
            className="inline-block rounded border border-green-600 px-12 py-3 text-sm font-medium text-green-600 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-0 active:bg-green-500 w-full"
            type="submit"
            href="/download"
          >
            Save Product
          </button>
        </div>
      </form>
    </>
  );
};

export default Product;
