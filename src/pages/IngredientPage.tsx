import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ICocktailByName, IIngredientInfo } from "../interface";
import axios from "axios";

const IngredientPage = () => {
  const [ingredientInfo, setIngredientInfo] = useState<IIngredientInfo | null>(
    null
  );
  const [drinks, setDrinks] = useState<ICocktailByName[]>([]);

  const { name } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const getData = async () => {
    try {
      setError(false);

      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`
      );

      const drinks = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`
      );

      const data = response.data.ingredients[0];
      const data2 = drinks.data.drinks;
      setIngredientInfo(data);
      setDrinks(data2);
    } catch (err) {
      setError(true);
      setMessage("Fail when try to fetch data.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="MainIngredient">
      <h1>{ingredientInfo?.strIngredient}</h1>
      <h2>
        {ingredientInfo?.strAlcohol.toLocaleLowerCase() === "yes"
          ? "Alcoholic"
          : "Non alcoholic"}
      </h2>
      <h2>
        {ingredientInfo?.strType} {ingredientInfo?.strABV}
      </h2>
      <p>{ingredientInfo?.strDescription}</p>

      <h3>Drinks</h3>
      <ul className="ingredient">
        {drinks?.map((d, i) => {
          return (
            <li key={i} onClick={() => navigate(`/info/${d?.idDrink}`)}>
              {d.strDrink}
            </li>
          );
        })}
      </ul>
      {error && <p className="message">{message}</p>}
    </div>
  );
};

export default IngredientPage;
