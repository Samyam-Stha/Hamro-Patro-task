import React from "react";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Card from "../../Components/Card.jsx";
import Second from "../../Components/SecondCard/Second.jsx";

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

  function getIngredients(meal) {
    const ingArr = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];

      if (ingredient) {
        ingArr.push(ingredient);
      } else {
        break;
      }
    }

    return ingArr.join(", ");
  }

  return (
    <>
      {/* <nav className={styles.navbar}>
        <div className={styles.navcontainer}>
          <input
            type="text"
            placeholder="Search Recipe..."
            className={styles.searchbox}
          />
        </div>
      </nav> */}
      <div className={styles.recipesGrid}>
        {recipes.map((meal) => {
          // return (
          //   <Card
          //     key={meal.idMeal}
          //     image={meal.strMealThumb}
          //     title={meal.strMeal}
          //   />
          // );
          return (
            <Second
              key={meal.idMeal}
              image={meal.strMealThumb}
              title={meal.strMeal}
              ingredients={getIngredients(meal)}
            />
          );
        })}
      </div>
    </>
  );
}
