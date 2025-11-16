import { useEffect, useState } from "react";
import Second from "../../Components/SecondCard/Second";
import styles from "../Homepage/Home.module.css";

export default function MyRecipe() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("meals")) || {
      meals: [],
    };
    setRecipes(savedData.meals);
  }, []);

  function getIngredients(meal) {
    const ingArr = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      if (ing && ing.trim() !== "") ingArr.push(ing);
    }
    return ingArr.join(", ");
  }

  return (
    <section className={styles.container}>
      <h1>My Recipes</h1>

      <div className={styles.recipesGrid}>
        {recipes.map((meal) => (
          <Second
            key={meal.idMeal}
            id={meal.idMeal}
            image={meal.strMealThumb}
            title={meal.strMeal}
            ingredients={getIngredients(meal)}
            area={meal.strArea}
            type="my"
          />
        ))}
      </div>
    </section>
  );
}
