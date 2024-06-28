import { QUERY__KEY } from "./queryFn";
import { customAxios } from "../configs/axios.config";

import { useQuery } from "@tanstack/react-query";

export const useLanguage = function (id: string | undefined) { 
  return useQuery({
    queryKey: [QUERY__KEY.language],
    queryFn: async () => await customAxios.get(`language-restourant/${id}`),
  });
};

export const useRestaurant = function (id: string | undefined) {
  return useQuery({
    queryKey: [QUERY__KEY.restourant],
    queryFn: async () =>
      await customAxios.get(`restourant/find/one/${id}`, {
        headers: {
          "accept-language": localStorage.getItem("language"),
        },
      }),
  });
};

export const useCategory = function (id : string | undefined) {
  return useQuery({
    queryKey: [QUERY__KEY.category],
    queryFn: async () =>
      await customAxios.get(`category/find/all/${id}`, {
        headers: {
          "accept-language": localStorage.getItem("language"),
        },
      }),
  });
};

export const useFood = function () {
  return useQuery({
    queryKey: [QUERY__KEY.food],
    queryFn: async () =>
      await customAxios.get("food", {
        headers: {
          "accept-language": localStorage.getItem("language"),
        },
      }),
  });
};
