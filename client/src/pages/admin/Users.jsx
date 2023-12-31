import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";

const Users = () => {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-3">
        <AdminMenu />
        <div className="flex flex-col border rounded-md shadow m-4 p-4 gap-1">
          <div className="text-xl">All Users</div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
