export interface IRandomCocktail {
  idDrink: string;
  strDrinkThumb: string;
  strGlass: string;
  strDrink: string;
  trDrink: string;
}

export interface ICocktailDetails {
  idDrink: string;
  strDrinkThumb: string;
  strGlass: string;
  strDrink: string;
  trDrink: string;
  strAlcoholic: string;
  strCategory: string;
  strInstructions: string;
  strTags: string;
  Ingredient: IIngredient[];
}

export interface ICocktailByName {
  idDrink: string;
  strDrink: string;
}

export interface IIngredientInfo {
  idIngredient: string;
  strIngredient: string;
  strDescription: string;
  strType: string;
  strAlcohol: string;
  strABV: string | null;
}

interface IIngredient {
  strIngredient: string;
  strMeasure: string;
}
