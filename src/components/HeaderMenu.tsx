import { Link } from "react-router-dom";

// icons
import { IoIosArrowBack } from "react-icons/io";
import SelectLanguage from "./SelectLanguage";
import { FC } from "react";

// interface
import { ColTypes } from "../interfaces";

const HeaderMenu: FC<ColTypes> = ({ id, col, setCol }): JSX.Element => {
  return (
    <div className="max-w-md mx-auto py-4  sticky top-0 left-0 px-5 z-10 bg-red-500">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Link to={`/${id}`} className="bg-white p-1 rounded text-red-500">
            <IoIosArrowBack size={23} />
          </Link>
          <p className="text-lg text-white">Menu</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-200 p-1 rounded">
            <button
              className={`flex flex-col gap-1 text-center px-1 py-1 rounded hover:bg-white ${
                col ? "bg-white" : ""
              }`}
              onClick={() => setCol(true)}
            >
              <span className="w-[30px] h-3 rounded-[10px] bg-red-600 block"></span>
              <span className="w-[30px] h-3 rounded-[10px] bg-red-600 block"></span>
            </button>
            <button
              className={`py-1 px-1  hover:bg-white rounded ${
                col ? "" : "bg-white"
              }`}
              onClick={() => setCol(false)}
            >
              <span className="w-[30px] h-7 rounded-[6px] bg-red-600  block"></span>
            </button>
          </div>
          <SelectLanguage />
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
