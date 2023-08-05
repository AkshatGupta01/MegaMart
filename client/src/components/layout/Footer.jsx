import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black p-3 text-center">
      <h4 className="text-white">Rights reserved &copy; Akshat Gupta</h4>
      <p className="text-center mt-3 text-white">
        <Link to="/contact" className="hover:text-blue-300">
          Contact
        </Link>{" "}
        |{" "}
        <Link to="/about" className="hover:text-blue-300">
          About
        </Link>{" "}
        |{" "}
        <Link to="/policy" className="hover:text-blue-300">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
