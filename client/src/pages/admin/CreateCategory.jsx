import { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setIsVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name }
      );

      if (data?.success) {
        toast.success(data.message);
        getAllCategory();
      }
    } catch (error) {
      console.log(
        "Error in handleSubmit function in createCategory.jsx",
        error
      );
      toast.error("Something went wrong in the input form");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );

      if (data?.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");
        setIsVisible(false);
        getAllCategory();
      }
    } catch (error) {
      console.log(
        "Error in handleUpdate function in CreateCategory.jsx",
        error
      );
      toast.error("Something went wrong in updating Category Name");
    }
  };

  const handleDelete = async (categoryID) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${categoryID}`
      );
      if (data?.success) {
        toast.success(data.message);
        getAllCategory();
      }
    } catch (error) {
      console.log(
        "Error in handleDelete function in CreateCategory.jsx",
        error
      );
      toast.error("Something went wrong while deleting Category");
    }
  };

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

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-3">
        <AdminMenu />
        <div className="flex flex-col border rounded-md shadow m-4 p-4 gap-1">
          <div className="text-xl pb-4">Create Category</div>
          <CategoryForm
            handleSubmit={handleSubmit}
            setName={setName}
            name={name}
          />
          <table className="table-auto border border-collapse border-slate-300">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr
                  key={category._id}
                  className="text-center border border-slate-200"
                >
                  <td>{category.name}</td>
                  <td className="text-center">
                    <button
                      className="inline-block button rounded-lg bg-green-600 px-4 py-2 m-2 text-white"
                      onClick={() => {
                        setIsVisible(true);
                        setSelected(category);
                        setUpdatedName(category.name);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="inline-block button rounded-lg bg-red-600 px-4 py-2 m-2 text-white"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          title="Edit Category Name"
          open={visible}
          footer={false}
          onCancel={() => setIsVisible(false)}
        >
          <CategoryForm
            handleSubmit={handleUpdate}
            setName={setUpdatedName}
            name={updatedName}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCategory;
