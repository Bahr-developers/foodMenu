import { useState } from "react";
import SelectLanguage from "./SelectLanguage";

// icons
import { IoMenu } from "react-icons/io5";
import HamburgerMenu from "./HamburgerMenu";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ImageBaseUrl } from "../constants/BASE_URL";

import { HeaderProps } from "../interfaces";

const Header = (props: HeaderProps): JSX.Element => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <>
      <header className="max-w-md mx-auto z-10 sticky top-0 bg-white left-0">
        <div className="bg-red-500 flex items-center justify-between px-5 py-4 ">
          <button
            className="flex items-center justify-center p-1 rounded bg-white focus:outline-none  focus:ring-[#ebc671]"
            onClick={() => setOpenMenu(true)}
          >
            <IoMenu size={30} className="text-gray-600" />
          </button>
          <SelectLanguage />
        </div>
        <div className="flex items-center gap-5 px-5 pb-4 pt-2">
          <LazyLoadImage
            src={`${ImageBaseUrl}${props?.restaurant?.image_url}`}
            className="w-16 h-full"
            height={64}
            alt="restaurantImg"
            effect="blur"
          />
          <h2 className="text-xl">{props?.restaurant?.name.trim()}</h2>
        </div>
        <hr className="mb-3" />
      </header>

      <HamburgerMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </>
  );
};

export default Header;
