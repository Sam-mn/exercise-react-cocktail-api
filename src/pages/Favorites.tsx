import React, { useEffect } from "react";
import { useFavList } from "../components";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favoriteDrinks, setFavoriteDrinks } = useFavList();

  useEffect(() => {
    const storedFavoriteDrinks = JSON.parse(
      localStorage.getItem("favoriteDrinks")!
    );
    if (storedFavoriteDrinks) {
      setFavoriteDrinks(storedFavoriteDrinks);
    }
  }, []);

  return (
    <div className="drinksList">
      {favoriteDrinks.length === 0 && <h2>No favorite drinks</h2>}
      {favoriteDrinks.map((f) => {
        return (
          <Link to={`/info/${f?.idDrink}`} key={f.idDrink}>
            {f.strDrink}
          </Link>
        );
      })}
    </div>
  );
};

export default Favorites;
