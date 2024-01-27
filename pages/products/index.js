import Link from "next/link";

const Products = () => {
  return (
    <>
      <header>
        <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-gray-900 sm:text-4xl">
                Welcome Back,{" "}
                <span className="text-green-700">All Products</span>!
              </div>

              <p className="mt-1.5 text-md text-gray-500 max-w-lg">
                Let&rsquo;s create a new product! 🎉
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <Link
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-green-700 px-5 py-3 text-green-700 transition hover:bg-green-50 hover:text-green-700 focus:outline-none focus:ring"
                href="/products/new"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span className="text-md font-medium"> Add Product </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <hr className="my-1 h-px border-0 bg-gray-300" />

      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 text-center">
        no Products
      </div>

    </>
  );
};

export default Products;
