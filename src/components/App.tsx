import { Outlet, useOutletContext } from "react-router-dom";
import "../css/App.css";
import Navbar from "./Navbar";
import { useState } from "react";
import { ICocktailByName } from "../interface";

type ContextType = {
  favoriteDrinks: ICocktailByName[];
  setFavoriteDrinks: React.Dispatch<React.SetStateAction<ICocktailByName[]>>;
};

export function App() {
  const [favoriteDrinks, setFavoriteDrinks] = useState<ICocktailByName[]>([]);
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet
          context={{ favoriteDrinks, setFavoriteDrinks } satisfies ContextType}
        />
      </div>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFavList = () => {
  return useOutletContext<ContextType>();
};
