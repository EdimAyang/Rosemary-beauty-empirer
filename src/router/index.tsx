import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";

//layouts
import GlobalLayout from "@/layouts/GlobalLayout";

//pages
import HomePage from "@/pages/home";
import ServicesPage from "@/pages/services";
import Shop from "@/pages/shop";
import ProductDetails from "@/pages/shop/ProductDetails";
import ServiceDetails from "@/pages/services/serviceDetails";
import Booking from "@/pages/booking";
import Checkout from "@/pages/checkout";

export const router = createBrowserRouter([
  {
    id: "app",
    element: <GlobalLayout />,
    children:[
        {
            path:PATHS.HOME,
            element:<HomePage/>
        },
        {
          path:PATHS.SERVICE,
          element:<ServicesPage />
        },
        {
          path:PATHS.SHOP,
          element:<Shop />
        },
        {
          path:PATHS.PRODUCT_DETAILS_PATTERN,
          element:<ProductDetails />
        },
        {
          path:PATHS.SERVICE_DETAILS_PATTERN,
          element:<ServiceDetails/>
        },
        {
          path:PATHS.BOOKING,
          element:<Booking/>
        },
        {
          path:PATHS.CHECKOUT,
          element:<Checkout/>
        }
    ]
  },
]);
