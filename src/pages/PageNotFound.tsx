import { Link, useParams } from "react-router-dom";

const PageNotFound = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="fixed top-0 w-screen h-screen left-0 flex items-center justify-center flex-col">
      <h1 className="text-9xl font-bold text-purple-400">404</h1>
      <Link
        to={"/"}
        className="bg-purple-400 py-2 px-4 text-white rounded mt-4"
      >
        go to home page
      </Link>
    </div>
  );
};

export default PageNotFound;
