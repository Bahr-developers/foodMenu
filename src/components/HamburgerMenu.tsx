import { FC } from "react";
import { CgClose } from "react-icons/cg";
import { Link, useParams } from "react-router-dom";
import { ItemType2, menuTypes } from "../interfaces";
import { useRestaurant } from "../query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ImageBaseUrl } from "../constants/BASE_URL";
import { ImLocation2 } from "react-icons/im";

const HamburgerMenu: FC<menuTypes> = ({ openMenu, setOpenMenu }) => {
  const { id } = useParams<{ id: string }>();

  const getRestaurant = useRestaurant();

  const restaurantById = getRestaurant.data?.data.find(
    (item: ItemType2) => item.id === id
  );

  return (
    <div
      className={`fixed top-0 z-30 left-0 hamburgerBg min-h-screen  transition-w  ease-in-out  duration-700  h-[100vh]  ${
        openMenu
          ? " w-[100%] ml-0 h-[100vh] opacity-100"
          : " w-[100%] ml-[-600px] opacity-0   pointer-events-none"
      }`}
    >
      <div className="max-w-md mx-auto py-10 px-2 relative">
        <button
          className="top-5 right-1 absolute bg-gray-100 rounded p-1"
          onClick={() => setOpenMenu(false)}
        >
          <CgClose size={20} />
        </button>
        <div>
          <div className="text-center mt-5">
            <LazyLoadImage
              alt="restaurant img"
              src={`${ImageBaseUrl}${restaurantById?.image_url}`}
              height={100}
              effect="blur"
              className="w-[100px]"
            />
            <p className="text-2xl p-0 mt-3">{restaurantById?.name}</p>
          </div>
          <p className="my-3">{restaurantById?.description}</p>
          <div className="flex items-center gap-2">
            <span>
              <ImLocation2 size={20} />
            </span>
            <p>{restaurantById?.location}</p>
          </div>
        </div>
        <div className="pt-4  mb-3 flex items-center gap-2">
          <span>Ishlab chiquvchilar:</span>
          <Link
            to={"http://bahrtech.uz/"}
            target="_blank"
            className="text-blue-500"
          >
            BahrTech
          </Link>
        </div>
        <Link
          to="https://t.me/Sulaymonov_D"
          target="_blank"
          className="text-blue-500"
        >
          @foodMenu_admin
        </Link>
      </div>
    </div>
  );
};

export default HamburgerMenu;
