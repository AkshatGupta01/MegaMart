import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../hooks/useAuth";

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-3">
        <AdminMenu />
        <div className="flex flex-col border rounded-md shadow m-4 p-4 gap-1">
          <div className="text-xl">Admin Name : {auth?.user?.name}</div>
          <div className="text-xl">Admin Email : {auth?.user?.email}</div>
          <div className="text-xl">Admin Contact : {auth?.user?.phone}</div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
