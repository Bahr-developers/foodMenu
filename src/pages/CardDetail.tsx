import { useParams } from "react-router-dom";
import { Header } from "../components";

import { useCategory, useRestaurant } from "../query";

// loading component
import Loading from "../components/Loading/Loading";

// interfaces
import { CategoryType2} from "../interfaces";

// icons
import MainCategory from "../components/mainCategory";

const CardDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  

  const getRestaurant = useRestaurant(id);
  console.log(getRestaurant?.data?.data);
  
  const categories = useCategory(id);  
  console.log(categories?.data);
  

  if (getRestaurant.isLoading || categories.isLoading) return <Loading />;

  const restaurantById = getRestaurant.data?.data

  return (
    <section>
      <div className="max-w-md mx-auto">
        <Header restaurant={restaurantById} />
        <div className="categories grid grid-cols-1">
          {categories?.data &&
            categories.data.data.map((category: CategoryType2) => (
              <MainCategory key={category.id} category={category} restaurantId={id} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default CardDetail;
