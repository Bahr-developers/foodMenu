import { Link, useParams } from "react-router-dom";
import { Header } from "../components";

// base url
import { ImageBaseUrl } from "../constants/BASE_URL";

// lazy load image
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useCategory, useRestaurant } from "../query";

// loading component
import Loading from "../components/Loading/Loading";

// interfaces
import { CategoryType2, ItemType2 } from "../interfaces";

// icons
import { MdArrowRightAlt } from "react-icons/md";

const viewMore = {
  uz: "ko'proq ko'rish",
  ru: "посмотреть больше",
  en: "view more",
};

const CardDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  // get language
  const language: string = localStorage.getItem("language") || "uz";

  const getRestaurant = useRestaurant();
  const categories = useCategory(id);

  if (getRestaurant.isLoading || categories.isLoading) return <Loading />;

  const restaurantById = getRestaurant.data?.data.find(
    (item: ItemType2) => item.id === id
  );

  return (
    <section>
      <div className="max-w-md mx-auto">
        <Header restaurant={restaurantById} />
        <div className="categories grid grid-cols-1">
          {categories?.data &&
            categories.data.data.map((category: CategoryType2) => (
              <Link
                to={`/${id}/${category.id.toLowerCase()}`}
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
            ))}
        </div>
      </div>
    </section>
  );
};

export default CardDetail;
