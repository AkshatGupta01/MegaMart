import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="p-4">
      <h1 className="flex flex-col text-xl text-center py-2">Admin Panel</h1>
      <div className="flex flex-col border rounded-md text-center mx-4 shadow">
        <NavLink
          to="/dashboard/admin/create-category"
          className="p-2 border-b hover:bg-orange-300"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="p-2 border-b hover:bg-orange-300"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="p-2 border-b hover:bg-orange-300"
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="p-2 border-b hover:bg-orange-300"
        >
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
