export interface ItemType {
  id: string | undefined;
  image_url: string;
  name: string;
  subcategories: [];
}

export interface FoodType {
  category_id: string;
  description: string;
  food_status: string;
  image_urls: string[];
  name: string;
  price: string;
  restourant_id: string;
  status: string;
  _id: string;
}
export interface CategoryType {
  _id: string | undefined;
  name: string;
  image_url: string;
  subcategories: [];
  category_id: string;
  restaurant_id: string;
  foods: FoodType[];
}

export interface CategoryType2 {
  id: string;
  name: string;
  image_url: string;
}

export interface ItemType2 {
  description: string;
  id: string;
  image_url: string;
  location: string;
  name: string;
}

export interface SwiperPropsType {
  imgArr: string[];
  col: boolean;
}

export interface ColTypes {
  col: boolean;
  setCol: (col: boolean) => void;
  id: string | undefined;
}

export interface foodStatusType {
  [key: string]: {
    [key: string]: string;
  };
}

export interface RestaurantType {
  name: string;
  image_url: string;
}

export interface HeaderProps {
  restaurant: RestaurantType;
}

export interface menuTypes {
  openMenu: boolean;
  setOpenMenu: (open: boolean) => void;
}

export interface LanguageType {
  code: string;
  title: string;
  _id: string;
}
