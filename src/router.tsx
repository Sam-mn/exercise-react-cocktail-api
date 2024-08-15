import { createBrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import Home from "./pages/Home";
import Search from "./pages/Search";
import InfoPage from "./pages/InfoPage";
import Favorites from "./pages/Favorites";
import IngredientPage from "./pages/IngredientPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "/search", element: <Search /> },
      { path: "/info/:id", element: <InfoPage /> },
      { path: "/favorite", element: <Favorites /> },
      { path: "/Ingredient/:name", element: <IngredientPage /> },
    ],
  },
]);
