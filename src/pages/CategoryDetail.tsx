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
              className={`subcategory text-white py-2 px-4 rounded cursor-pointer`}
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
                            <div className={`${col ? "w-full" : "w-1/2"}`}>
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

                          <div className="p-3">
                            <p className="text-xl w-full font-semibold">
                              {food?.name.trim()}
                            </p>
                            <p className={`${col ? "block" : "hidden"}`}>
                              {food?.description.trim()}
                            </p>
                            <div
                              className={`flex justify-between  ${
                                col
                                  ? " flex-row"
                                  : " flex-col gap-y-2 items-start"
                              }`}
                            >
                              <p className="text-[19px] font-semibold">
                                {Number(food?.price).toLocaleString()} so'm
                              </p>
                              <p
                                className={`inline-block py-[2px] px-3 rounded text-white ${
                                  food?.food_status === "available"
                                    ? "bg-green-500"
                                    : food?.food_status === "preparing"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
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
