import Product from "@/components/Product";
import Link from "next/link";

const NewProduct = () => {
  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-between py-3">
        <div className="text-center sm:text-left">
          <p className="mt-1.5 text-md text-gray-500 max-w-lg">
            Let&rsquo;s create a new product! 🎉
          </p>
        </div>
      </div>

      <hr className=" h-px border-0 bg-gray-300" />

      <div className="my-10">
        <Product />
      </div>
    </>
  );
};

export default NewProduct;
