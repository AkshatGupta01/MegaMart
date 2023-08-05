import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="p-4">
      <h1 className="flex flex-col text-xl text-center py-2">Dashboard</h1>
      <div className="flex flex-col border rounded-md text-center mx-4 shadow">
        <NavLink
          to="/dashboard/user/profile"
          className="p-2 border-b hover:bg-orange-300"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="p-2 border-b hover:bg-orange-300"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
