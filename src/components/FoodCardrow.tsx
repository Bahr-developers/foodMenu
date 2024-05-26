import { LazyLoadImage } from "react-lazy-load-image-component";
import { ImageBaseUrl } from "../constants/BASE_URL";
import { ImgSwiper } from ".";
import { FoodCardPropsType } from "../interfaces";
import { foodStatus } from "../constants/language";

const FoodCardrow = (props: FoodCardPropsType) => {
  // get Language
  const getLangugage: string = localStorage.getItem("language") || "uz";

  return (
    <div
      className={`flex gap-3 mb-3 border-2 rounded-[10px] hover:shadow-md duration-150 
       flex-row
      `}
    >
      {props.food?.image_urls.length ? (
        <div className={`w-2/5 py-2 pl-2`}>
          <ImgSwiper col={props.col} imgArr={props.food?.image_urls} />
        </div>
      ) : (
        <LazyLoadImage
          src={`${ImageBaseUrl}${props.restaurantImg}`}
          alt="restaurantImg"
          className={`rounded-[10px] h-full w-1/2`}
          style={{ height: "140px" }}
        />
      )}
      <div className="p-4">
        <p className="text-xl w-full font-semibold">
          {props.food?.name.trim()}
        </p>
        <div
          className={`flex justify-between  flex-col-reverse mt-2 gap-y-8 items-start`}
        >
          <p className="text-[16px] font-semibold bg-red-500 text-white py-1 px-2 rounded">
            {Number(props.food?.price).toLocaleString()} so'm
          </p>
          <p
            className={`inline-block py-[2px] px-3 rounded  border-[1px] ${
              props.food?.food_status === "available"
                ? "border-green-500 text-green-500"
                : props.food?.food_status === "preparing"
                ? "border-yellow-500 text-yellow-500"
                : "border-red-500 text-red-500"
            }`}
          >
            {foodStatus[props.food?.food_status][getLangugage]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodCardrow;
