import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IRandomCocktail } from "../interface";
import { Link } from "react-router-dom";

const Home = () => {
  const [randomCocktail, setRandomCocktail] = useState<IRandomCocktail | null>(
    null
  );
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const effectRan = useRef(false);

  const getData = async () => {
    try {
      setRandomCocktail(null);
      const response = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );
      const data = response.data.drinks[0];
      setRandomCocktail({
        idDrink: data.idDrink,
        strDrink: data.strDrink,
        strDrinkThumb: data.strDrinkThumb,
        strGlass: data.strGlass,
        trDrink: data.trDrink,
      });
    } catch (err) {
      setError(true);
      setMessage("Fail when try to fetch data.");
    }
  };

  useEffect(() => {
    if (effectRan.current === false) {
      getData();
      effectRan.current = true;
    }
    return () => {
      setRandomCocktail(null);
    };
  }, []);

  return (
    <div className="center">
      <h1 className="homeHeader">{randomCocktail?.strDrink}</h1>
      <Link to={`info/${randomCocktail?.idDrink}`} className="cocktailInf">
        Cocktail details
      </Link>
      <img
        src={randomCocktail?.strDrinkThumb}
        alt={randomCocktail?.idDrink}
        className="homeImage"
      />
      <button onClick={() => getData()} className="homeButton">
        Suggest a new drink
      </button>
      {error && <p className="message">{message}</p>}
    </div>
  );
};

export default Home;
