import axios from "axios";
import { useEffect, useState } from "react";
import { ICocktailDetails } from "../interface";
import { useNavigate, useParams } from "react-router-dom";
import { FcLike, FcDislike } from "react-icons/fc";
import { useFavList } from "../components";

const InfoPage = () => {
  const [cocktailInfo, setCocktailInfo] = useState<ICocktailDetails | null>(
    null
  );
  const { favoriteDrinks, setFavoriteDrinks } = useFavList();
  const [isFav, setIsFav] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      const data = response.data.drinks[0];
      setCocktailInfo({
        idDrink: data.idDrink,
        strDrink: data.strDrink,
        strDrinkThumb: data.strDrinkThumb,
        strGlass: data.strGlass,
        trDrink: data.trDrink,
        strAlcoholic: data.strAlcoholic,
        strCategory: data.strCategory,
        strInstructions: data.strInstructions,
        strTags: data.strTags,
        Ingredient: [
          { strIngredient: data.strIngredient1, strMeasure: data.strMeasure1 },
          { strIngredient: data.strIngredient2, strMeasure: data.strMeasure2 },
          { strIngredient: data.strIngredient3, strMeasure: data.strMeasure3 },
          { strIngredient: data.strIngredient4, strMeasure: data.strMeasure4 },
          { strIngredient: data.strIngredient5, strMeasure: data.strMeasure5 },
          { strIngredient: data.strIngredient6, strMeasure: data.strMeasure6 },
          { strIngredient: data.strIngredient7, strMeasure: data.strMeasure7 },
          { strIngredient: data.strIngredient8, strMeasure: data.strMeasure8 },
          { strIngredient: data.strIngredient9, strMeasure: data.strMeasure9 },
          {
            strIngredient: data.strIngredient10,
            strMeasure: data.strMeasure10,
          },
          {
            strIngredient: data.strIngredient11,
            strMeasure: data.strMeasure11,
          },
          {
            strIngredient: data.strIngredient12,
            strMeasure: data.strMeasure12,
          },
          {
            strIngredient: data.strIngredient13,
            strMeasure: data.strMeasure13,
          },
          {
            strIngredient: data.strIngredient14,
            strMeasure: data.strMeasure14,
          },
          {
            strIngredient: data.strIngredient15,
            strMeasure: data.strMeasure15,
          },
        ],
      });
    } catch (err) {
      setError(true);
      setMessage("Fail when try to fetch data.");
    }
  };

  useEffect(() => {
    getData();
    const findDrink = favoriteDrinks.find((d) => d.idDrink === id);
    if (findDrink) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, []);

  const handleAddToFav = () => {
    if (cocktailInfo !== null) {
      setIsFav(true);
      setFavoriteDrinks([
        ...favoriteDrinks,
        { idDrink: cocktailInfo?.idDrink, strDrink: cocktailInfo?.strDrink },
      ]);
      localStorage.setItem(
        "favoriteDrinks",
        JSON.stringify([
          ...favoriteDrinks,
          { idDrink: cocktailInfo?.idDrink, strDrink: cocktailInfo?.strDrink },
        ])
      );
    }
  };

  const handleRemoveFromFav = () => {
    setIsFav(false);
    const newFav = favoriteDrinks.filter((f) => f.idDrink !== id);
    setFavoriteDrinks(newFav);
    localStorage.setItem("favoriteDrinks", JSON.stringify(newFav));
  };

  return (
    <>
      {error && <p className="message">{message}</p>}
      <h1 className="homeHeader">{cocktailInfo?.strDrink}</h1>
      {isFav ? (
        <button onClick={handleRemoveFromFav} className="addFavButton">
          Remove from favorite <FcDislike />
        </button>
      ) : (
        <button onClick={handleAddToFav} className="addFavButton">
          Add to favorite <FcLike />
        </button>
      )}

      <h4 className="homeHeader">{cocktailInfo?.strCategory}</h4>

      <div className="infoMain">
        <img
          src={cocktailInfo?.strDrinkThumb}
          alt={cocktailInfo?.idDrink}
          className="homeImage"
        />
        <section className="ingredientSec">
          <div>
            <h3>Ingredients</h3>
            <ul className="ingredientList">
              {cocktailInfo?.Ingredient.map((ing, i) => {
                {
                  return (
                    ing.strIngredient && (
                      <li
                        key={i}
                        onClick={() =>
                          navigate(`/Ingredient/${ing.strIngredient}`)
                        }
                      >
                        {ing.strIngredient}: {ing.strMeasure}
                      </li>
                    )
                  );
                }
              })}
            </ul>
          </div>
          <div>
            <h3>Instructions</h3>
            <p>{cocktailInfo?.strInstructions}</p>
          </div>
          <div>
            <h3>Glass</h3>
            <p>Serve: {cocktailInfo?.strGlass}</p>
          </div>
          <div>
            <h3>Tags</h3>
            {cocktailInfo?.strTags?.split(",").map((tag, i) => {
              return <p key={i}>#{tag}</p>;
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default InfoPage;
