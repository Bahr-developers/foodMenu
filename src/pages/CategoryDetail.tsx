import { useParams } from "react-router-dom";
import { Categories, HeaderMenu, ImgSwiper } from "../components";

import { Link } from "react-scroll";

import React, { useState } from "react";

// base url
import { ImageBaseUrl } from "../constants/BASE_URL";

import { Element } from "react-scroll";

// icons
import { GiMeal } from "react-icons/gi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCategory, useRestaurant } from "../query";

// interfaces
import {
  CategoryType,
  foodStatusType,
  FoodType,
  ItemType,
} from "../interfaces";

const foodStatus: foodStatusType = {
  available: {
    uz: "Mavjud",
    ru: "Есть",
    en: "Available",
  },
  preparing: {
    uz: "Tayyorlanyapti",
    ru: "готовится",
    en: "Preparing",
  },
  none: {
    uz: "Mavjud emas",
    ru: "недоступен",
    en: "none",
  },
};

const CategoryDetail = (): JSX.Element => {
  const [col, setCol] = useState<boolean>(false);

  const { id, categoryId } = useParams<{ id: string; categoryId: string }>();

  const categories = useCategory(id);
  const getRestaurant = useRestaurant();

  const restaurantById = getRestaurant.data?.data.find(
    (item: ItemType) => item.id === id
  );

  const subCategories = categories.data?.data.find(
    (item: ItemType) => item.id == categoryId
  );

  const getLangugage: string = localStorage.getItem("language") || "uz";

  subCategories?.subcategories.forEach((item: any) => {
    {
      item.foods.forEach((food: any) => {
        food.foodStatus = foodStatus;
      });
    }
  });

  return (
    <>
      <HeaderMenu id={id} col={col} setCol={setCol} />
      <Categories>
        {subCategories?.subcategories.length &&
          subCategories?.subcategories.map((category: CategoryType) => (
            <Link
              key={category?._id}
              to={`${category?._id}`}
              smooth
              duration={500}
              offset={-120}
              spy={true}
              activeClass="activeCategory"
              className={`bg-white border-2 border-red-400 py-2 px-4 rounded-full cursor-pointer`}
            >
              <pre className="font-sans">{category?.name}</pre>
            </Link>
          ))}
      </Categories>
      <div className="max-w-md mx-auto px-5">
        {subCategories?.subcategories.length &&
          subCategories?.subcategories.map((category: CategoryType) => {
            return (
              <React.Fragment key={category?._id}>
                <Element
                  className="flex items-center gap-2 mb-3"
                  name={`${category?._id}`}
                >
                  <span className="text-green-700">
                    {category?.image_url ? (
                      <LazyLoadImage
                        src={`${ImageBaseUrl}${category.image_url}`}
                        alt={category.name}
                        className="w-8"
                      />
                    ) : (
                      <GiMeal size={30} />
                    )}
                  </span>
                  <p className="text-2xl">{category?.name}</p>
                </Element>
                {category.foods.length &&
                  category.foods
                    .filter((food: FoodType) => food.status === "active")
                    .map((food: FoodType) => {
                      return (
                        <div
                          key={food?._id}
                          className={`flex gap-3 mb-3 border-2 rounded-[10px] hover:shadow-md duration-150 ${
                            col ? "flex-col" : "flex-row"
                          }`}
                        >
                          {food?.image_urls.length ? (
                            <div
                              className={`${
                                col ? "w-full" : "w-2/5 py-2 pl-2"
                              }`}
                            >
                              <ImgSwiper col={col} imgArr={food?.image_urls} />
                            </div>
                          ) : (
                            <LazyLoadImage
                              src={`${ImageBaseUrl}${restaurantById?.image_url}`}
                              alt="restaurantImg"
                              className={`rounded-[10px] h-full ${
                                col ? "w-full" : "w-1/2"
                              }`}
                              style={{ height: col ? "260px" : "140px" }}
                            />
                          )}

                          <div className="p-4">
                            <p className="text-xl w-full font-semibold">
                              {food?.name.trim()}
                            </p>
                            <p className={`${col ? "block mt-3" : "hidden"}`}>
                              {food?.description.trim()}
                            </p>
                            <div
                              className={`flex justify-between  ${
                                col
                                  ? " flex-row mt-4"
                                  : " flex-col-reverse mt-2 gap-y-8 items-start"
                              }`}
                            >
                              <p className="text-[16px] font-semibold bg-red-500 text-white py-1 px-2 rounded">
                                {Number(food?.price).toLocaleString()} so'm
                              </p>
                              <p
                                className={`inline-block py-[2px] px-3 rounded  border-[1px] ${
                                  food?.food_status === "available"
                                    ? "border-green-500 text-green-500"
                                    : food?.food_status === "preparing"
                                    ? "border-yellow-500 text-yellow-500"
                                    : "border-red-500 text-red-500"
                                }`}
                              >
                                {foodStatus[food?.food_status][getLangugage]}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
};

export default CategoryDetail;
