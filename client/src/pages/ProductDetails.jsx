import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const params = useParams();

  const getRelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );

      if (data?.products) setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //to get product:
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/product/get-product/${params.slug}`
        );

        if (data?.success) {
          setProduct(data.product);
          getRelatedProducts(data?.product._id, data?.product.category._id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (params?.slug) getProduct();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-8">
          <img
            className="rounded-lg w-full h-full object-contain"
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
          />
        </div>
        <div className="p-8">
          <h1 className="text-4xl mb-4">Product Details</h1>
          <h1>Name: {product.name}</h1>
          <h1>Description: {product.description}</h1>
          <h1>Price: {product.price}</h1>
          {/* <h1>Category: {product.category.name}</h1> */}
          <button className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add to Cart
          </button>
        </div>
        <div>
          <h1>Similar products</h1>
          {JSON.stringify(relatedProducts, null, 4)}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
