import { foodStatusType } from "../interfaces";

export const viewMore: {
  [key: string]: string;
} = {
  uz: "ko'proq ko'rish",
  ru: "посмотреть больше",
  en: "view more",
};

export const foodStatus: foodStatusType = {
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
