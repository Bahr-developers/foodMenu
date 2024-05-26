import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { ImageBaseUrl } from "../constants/BASE_URL";
import { MdArrowRightAlt } from "react-icons/md";
import { viewMore } from "../constants/language";
import { MainCategoryType } from "../interfaces";
import { FC } from "react";

const MainCategory: FC<MainCategoryType> = ({ category, restaurantId }) => {
  // get language
  const language: string = localStorage.getItem("language") || "uz";

  return (
    <Link
      to={`/${restaurantId}/${category.id.toLowerCase()}`}
      key={category?.id}
      className="mx-5 border p-2   mb-4 rounded-[10px] hover:shadow-md duration-150 group"
    >
      <LazyLoadImage
        src={`${ImageBaseUrl}${category.image_url}`}
        alt={category?.name}
        className="rounded-t-[10px] w-[600px]  h-[180px]"
        height={180}
        effect="blur"
      />
      <div className="flex items-center justify-between">
        <h3 className="text-2xl">{category?.name.trim()}</h3>
        <div className="flex items-center gap-1 duration-150 group-hover:text-red-400 group-hover:gap-2">
          <span>{viewMore[language as keyof typeof viewMore]}</span>
          <span>
            <MdArrowRightAlt size={22} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MainCategory;
