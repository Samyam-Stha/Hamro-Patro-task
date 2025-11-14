import React from "react";
import { useEffect, useState } from "react";

import Card from "../../Components/Card.jsx";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(URL);
      const recipe = await res.json();
      console.log(recipe);
      setRecipes(recipe.meals);
    };
    fetchData();
  }, []);

  return (
    <>
      <section>
        {recipes.map((meal) => {
          return <Card key={meal.idMeal} image={meal.strMealThumb} title={meal.strMeal}/>;
        })}
      </section>
    </>
  );
}
