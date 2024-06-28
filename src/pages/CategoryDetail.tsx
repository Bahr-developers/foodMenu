import { useParams } from "react-router-dom";
import {
  Categories,
  FoodCardCol,
  FoodCardrow,
  HeaderMenu,
} from "../components";

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
import { CategoryType, FoodType, ItemType } from "../interfaces";
import { foodStatus } from "../constants/language";

const CategoryDetail = (): JSX.Element => {
  const [col, setCol] = useState<boolean>(false);

  const { id, categoryId } = useParams<{ id: string; categoryId: string }>();
  

  const categories = useCategory(id);
  const getRestaurant = useRestaurant(id);

  const restaurantById = getRestaurant.data?.data

  const subCategories = categories.data?.data.find(
    (item: ItemType) => item.id == categoryId
  );

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
                      return col ? (
                        <FoodCardCol
                          key={food._id}
                          food={food}
                          col={col}
                          restaurantImg={restaurantById?.image_url}
                        />
                      ) : (
                        <FoodCardrow
                          key={food._id}
                          food={food}
                          col={col}
                          restaurantImg={restaurantById?.image_url}
                        />
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
