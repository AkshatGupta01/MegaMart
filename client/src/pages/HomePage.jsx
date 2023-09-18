import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [auth, setAuth] = useAuth();

  //to get all categories:
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );

      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log("Error in createCategory page: ", error);
      toast.error("Something went wrong in getting category");
    }
  };

  //To get-all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );

      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };

  //get filtered products:
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log("Error in getting filtered products: ", error);
    }
  };

  useEffect(() => {
    console.log(auth);
    getAllCategory();
  }, []);

  useEffect(() => {
    if (checked.length == 0 && radio.length == 0) getAllProducts();
    else filterProducts();
  }, [checked.length, radio]);

  const handleFilter = (value, id) => {
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }

    setChecked(all);
  };

  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4 text-center">
          <div className="p-2">
            <h1>Filter by category</h1>
            <div className="flex flex-col">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>

          {/* Price filter */}
          <div className="p-2">
            <h1>Filter by price</h1>
            <Radio.Group
              className="flex flex-col"
              onChange={(e) => setRadio(e.target.value)}
            >
              {Prices?.map((p) => (
                <Radio key={p._id} value={p.array}>
                  {p.name}
                </Radio>
              ))}
            </Radio.Group>
          </div>
          <button
            className="border rounded-lg p-2 text-white bg-red-600 hover:bg-red-700 hover:cursor-pointer"
            onClick={() => window.location.reload()}
          >
            Reset Filters
          </button>
        </div>
        <div className="basis-3/4 text-center">
          <h1 className="text-3xl p-2">Products</h1>
          <div className="flex flex-wrap gap-2 my-2">
            {products?.map((product, index) => (
              <Link
                key={index}
                to={`/dashboard/admin/product/${product.slug}`}
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
                    <Link
                      to="/"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
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
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
