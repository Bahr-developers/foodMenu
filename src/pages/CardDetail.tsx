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

const CardDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

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
                className="mx-5 border  mb-4 rounded-[10px] hover:shadow-md duration-150"
              >
                <LazyLoadImage
                  src={`${ImageBaseUrl}${category.image_url}`}
                  alt={category?.name}
                  className="rounded-t-[10px] w-full h-full"
                  height={280}
                  effect="blur"
                />
                <h3 className="text-2xl py-2 pl-2">{category?.name.trim()}</h3>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CardDetail;
