import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";

//layouts
import GlobalLayout from "@/layouts/GlobalLayout";

//pages
import HomePage from "@/pages/home";

export const router = createBrowserRouter([
  {
    id: "app",
    element: <GlobalLayout />,
    children:[
        {
            path:PATHS.HOME,
            element:<HomePage/>
        },
    ]
  },
]);
