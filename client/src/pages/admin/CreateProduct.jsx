import { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  const navigate = useNavigate();

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

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Something went wrong in creating product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating product");
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-3">
        <AdminMenu />
        <div className="flex flex-col border rounded-md shadow m-4 p-4 gap-1">
          <div className="text-xl">Create Product</div>
          <Select
            bordered={false}
            placeholder="Select a Category"
            size="large"
            showSearch
            className="w-full border rounded-lg my-2"
            onChange={(value) => setCategory(value)}
          >
            {categories?.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>

          <div className="my-2">
            <label className="border rounded-lg p-2 w-full inline-block text-center text-white bg-purple-600 hover:bg-purple-700 hover:cursor-pointer">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              ></input>
            </label>
          </div>

          {photo && (
            <img
              src={URL.createObjectURL(photo)}
              alt="Product Photo"
              className="w-full aspect-square object-contain"
            />
          )}

          <form className="flex flex-col gap-2 my-4" onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="border rounded-lg p-2 focus:outline-none focus:border focus:border-1 focus:border-blue-500 focus:ring-0 focus:ring-sky-500 hover:border hover:border-1 hover:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              className="border rounded-lg p-2 h-20 focus:outline-none focus:border focus:border-1 focus:border-blue-500 focus:ring-0 focus:ring-sky-500 hover:border hover:border-1 hover:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              className="border rounded-lg p-2 focus:outline-none focus:border focus:border-1 focus:border-blue-500 focus:ring-0 focus:ring-sky-500 hover:border hover:border-1 hover:border-blue-500"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              className="border rounded-lg p-2 focus:outline-none focus:border focus:border-1 focus:border-blue-500 focus:ring-0 focus:ring-sky-500 hover:border hover:border-1 hover:border-blue-500"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <Select
              placeholder="Shipping?"
              size="large"
              showSearch
              className="border rounded-lg"
              onChange={(value) => setShipping(value)}
            >
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
            <button
              type="Submit"
              className="border rounded-lg p-2 w-full text-white bg-green-600 hover:bg-green-700 hover:cursor-pointer"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
