import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useSearch } from "../hooks/useSearch";

const Search = () => {
  const [values, setValues] = useSearch();

  const navigate = useNavigate();

  return (
    <Layout>
      <h1 className="text-4xl my-2 text-center">Search Results</h1>
      <h1 className="text-center">
        {values?.results.length < 1
          ? "No Products Found"
          : `Found ${values?.results.length}`}
      </h1>
      <div className="flex flex-wrap gap-2 my-2 p-4">
        {values?.results.map((product, index) => (
          <div
            key={index}
            to={`/dashboard/product/${product.slug}`}
            className="w-[250px]"
          >
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img
                className="rounded-t-lg w-full h-[160px] object-cover"
                src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />

              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h5>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {product.description.substring(0, 30)}...
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  $ {product.price}
                </p>

                <button
                  className="mr-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => navigate(`/product/${product.slug}`)}
                >
                  More Details
                </button>
                <button className="ml-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Buy
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Search;
