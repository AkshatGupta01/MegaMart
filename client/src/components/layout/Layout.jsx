import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

const Layout = (props) => {
  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Toaster />
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
