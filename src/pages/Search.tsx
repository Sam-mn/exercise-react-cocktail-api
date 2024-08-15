import axios from "axios";
import { FormEvent, useState } from "react";
import { ICocktailByName } from "../interface";
import { Link } from "react-router-dom";

const Search = () => {
  const [cocktailList, setCocktailList] = useState<ICocktailByName[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cocktailsPerPage = 10;
  const totalPages = Math.ceil(cocktailList?.length / cocktailsPerPage);
  const indexOfLastCocktail = currentPage * cocktailsPerPage;
  const indexOfFirstCocktail = indexOfLastCocktail - cocktailsPerPage;
  const currentCocktails = cocktailList.slice(
    indexOfFirstCocktail,
    indexOfLastCocktail
  );
  const [text, setText] = useState("");
  const [searchBy, setSearchBy] = useState<
    "search.php?s" | "filter.php?c" | "filter.php?i" | "filter.php?g"
  >("search.php?s");
  const [error, setError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const getData = async () => {
    try {
      setError(false);
      setCurrentPage(1);
      setCocktailList([]);
      const drinksList: ICocktailByName[] = [];

      const storedBeer: ICocktailByName[] = JSON.parse(
        localStorage.getItem(searchBy + "beer")!
      );

      if (
        searchBy + text.toLocaleLowerCase() === searchBy + "beer" &&
        storedBeer
      ) {
        setCocktailList(storedBeer);
        return;
      }

      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/${searchBy}=${text}`
      );
      const data = response.data.drinks;

      if (data.length === 0) {
        setShowMessage(true);
        setMessage("No Cocktails founded");
        return;
      }

      if (
        searchBy + text.toLocaleLowerCase() === searchBy + "beer" &&
        searchBy !== "filter.php?g"
      ) {
        localStorage.setItem(searchBy + "beer", JSON.stringify(data));
      }

      data?.forEach((el: { idDrink: string; strDrink: string }) => {
        drinksList.push({ idDrink: el.idDrink, strDrink: el.strDrink });
      });

      setCocktailList(drinksList);
    } catch (e) {
      setError(true);
      setMessage("No Cocktails founded");
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleOnSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await getData();
  };

  return (
    <div className="searchMain">
      <div className="buttonGroup">
        <button
          onClick={() => {
            setText("");
            setCocktailList([]);
            setSearchBy("search.php?s");
          }}
          style={{ background: searchBy === "search.php?s" ? "blue" : "green" }}
        >
          Search by name
        </button>
        <button
          onClick={() => {
            setText("");
            setCocktailList([]);
            setSearchBy("filter.php?c");
          }}
          style={{ background: searchBy === "filter.php?c" ? "blue" : "green" }}
        >
          Search by Category
        </button>
        <button
          onClick={() => {
            setText("");
            setCocktailList([]);
            setSearchBy("filter.php?i");
          }}
          style={{ background: searchBy === "filter.php?i" ? "blue" : "green" }}
        >
          Search by Ingredient
        </button>
        <button
          onClick={() => {
            setText("");
            setCocktailList([]);
            setSearchBy("filter.php?g");
          }}
          style={{ background: searchBy === "filter.php?g" ? "blue" : "green" }}
        >
          Search by Glass type
        </button>
      </div>
      <form onSubmit={handleOnSubmit}>
        <label>Search for a Cocktail</label>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          required
        />
        <button className="searchButton" type="submit" onClick={handleOnSubmit}>
          Search
        </button>
      </form>
      <div>
        <div className="searchList">
          {currentCocktails?.map((ing, i) => {
            {
              return (
                ing.strDrink && (
                  <Link to={`/info/${ing?.idDrink}`} key={i}>
                    {ing.strDrink}
                  </Link>
                )
              );
            }
          })}
          {error && <p className="message">{message}</p>}
          {showMessage && <p className="message">{message}</p>}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
