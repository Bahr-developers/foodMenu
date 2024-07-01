import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home__wrapper fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-4xl text-white">food-menu.uz</h1>
      <Link
        to={`/6675404c83a58ea5c4a00b97`}
        className="block my-4 bg-blue-400 text-white px-2 py-1 rounded"
      >
        Card1
      </Link>
    </div>
  );
};

export default Home;
