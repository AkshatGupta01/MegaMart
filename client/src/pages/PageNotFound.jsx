import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <h1 className="font-bold text-9xl text-center">404</h1>
      <p className="text-5xl text-center font-md m-5">Oops! Page Not Found</p>
      <button className="mt-3 rounded-md bg-purple-600 pt-2 p-3 text-white">
        <Link to="/" className="font-medium">
          Go Back
        </Link>
      </button>
    </div>
  );
};

export default PageNotFound;
