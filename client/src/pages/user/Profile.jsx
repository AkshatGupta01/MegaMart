import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";

const Profile = () => {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-3">
        <UserMenu />
        <div className="flex flex-col border rounded-md shadow m-4 p-4 gap-1">
          <div className="text-xl">Your Profile</div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
