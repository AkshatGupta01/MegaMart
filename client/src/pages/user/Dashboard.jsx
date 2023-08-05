import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-3">
        <UserMenu />
        <div className="flex flex-col border rounded-md shadow m-4 p-4 gap-1">
          <div className="text-xl">User Name : {auth?.user?.name}</div>
          <div className="text-xl">User Email : {auth?.user?.email}</div>
          <div className="text-xl">User Contact : {auth?.user?.phone}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
