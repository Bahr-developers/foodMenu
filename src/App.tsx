import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// root layout
import RootLayout from "./layouts/RootLayout";

// pages
import { CardDetail, CategoryDetail, Home } from "./pages";

// lazy load image css
import "react-lazy-load-image-component/src/effects/blur.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path=":id" element={<CardDetail />} />
      <Route path=":id/:categoryId" element={<CategoryDetail />} />
      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
