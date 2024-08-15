![poster](./src/assets/poster.png)

# The Cocktail DB

<details>
  <summary>Table of Content</summary>

- [Instructions](#instructions)
- [Requirements](#requirements)
  - [Landing Page](#landing-page-random-cocktail)
  - [Search Page](#search-page)
  - [Cocktail Info Page](#cocktail-info-page)
- [Bonus Features](#bonus-features---choose-your-challenges)
  - [Search Page++](#search-page-1)
  - [Favorites Page](#favorites-page)
  - [Ingredient Page](#ingredient-page)
  - [General features](#general-features)

</details>

## Instructions

Your are building a cocktail-wiki that uses data from [The Cocktail DB API](https://www.thecocktaildb.com/api.php). You can see an example of a cocktail-wiki on their [The Cocktail DB Home Page](https://www.thecocktaildb.com/).

The web application will have atleast three different pages.

## Requirements

- Create the application using Vite and React Typescript.
- It is allowed to use CSS-frameworks in this assignment. But i rather you didn't. The focus should be and the React part and the logic but don't forget about the CSS.

[Back to top](#the-cocktail-db)

### Landing Page (Random Cocktail)

- The user should be presented with a random cocktail when visiting the this page.

- The user should be able to get a random cocktail by clicking some sort of button.

- The name and a image of the cocktail should be presented as a card.

- The uses should be able to click on **See more** to get to the `Cocktail Info Page` _(see more info further down)_.

[Back to top](#the-cocktail-db)

### Search Page

- The user should be able to search for a cocktail using its name.

- The page should have a form on it that is using the submit event.

- The results of the search should be displayed in a list. Only the name of the cocktails should be in this list.

- The list can contain a maximum of 10 results. If there are more than 10 cocktails in the results, the list should be paginated.

- If you click on a cocktail in the list, you should go to the `Cocktail Info Page`.

[Back to top](#the-cocktail-db)

### Cocktail Info Page

- This page should only be possible to reach through one of the pages above.

- On this page the user should get detailed information on a specific cocktail including the following:

  - Category
  - Image
  - Tags
  - Ingredients and Measurements
  - The proper glass to serve it in

  [Back to top](#the-cocktail-db)

## Bonus features - choose your challenges..

### Search Page++

- The user should be able to to advanced searches.
- The use should be able to search on one of thes parameters or a combination of them:

  - Category
  - Ingredient
  - Glass type

- The search form should contain relevant validation.
- Cache the results. If you revisit a beer, you shouldn't need to make another request to the API.

[Back to top](#the-cocktail-db)

### Favorites Page

- The user should be able to save their favorite cocktails and view them on a separate page.

- The user should be able to remove favorite cocktails.
- Persist favorites using local storage.

[Back to top](#the-cocktail-db)

### Ingredient Page

- By clicking on an ingredient in the user should be able to see detail information on an Ingredient Page. Information including:

  - Name
  - Description
  - isAlcohol or not
  - Type
  - If Alcohol, its ABV _( alcohol by volume )_

- Display other cocktails and drinks that includes the specific ingredient.

[Back to top](#the-cocktail-db)

### General features

- The user should be able to browse cocktails by category and ingredient on different pages.
- Try infinitive scroll for large data sets instead of pagination.
- Add error handling for API request and display user-friendly error messages.
- Implement loading states and placeholders for data fetching.
- The user should be able to only display non alcoholic drinks.

[Back to top](#the-cocktail-db)
