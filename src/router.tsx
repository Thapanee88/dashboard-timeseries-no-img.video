import {
  createBrowserRouter,
} from "react-router-dom";
import OnePersonManyVideo from "./pages/OnePersonManyVideo";
import ManyPersonOneVideo from "./pages/ManyPersonOneVideo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OnePersonManyVideo/>,
  },
  {
    path: "/2",
    element: <ManyPersonOneVideo/>,
  },
]);

export default router;