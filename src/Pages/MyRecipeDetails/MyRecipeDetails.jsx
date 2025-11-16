import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../DetailsPage/Details.module.css";

export default function MyRecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("meals")) || { meals: [] };


    const foundMeal = savedData.meals.find((m) => m.idMeal == id);

    setMeal(foundMeal);
  }, [id]);

  if (!meal) return <h2>Loading</h2>;


  const steps = meal.strInstructions
    ? meal.strInstructions.split("\n").filter((s) => s.trim() !== "")
    : [];

  function getIngredients(meal) {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      if (ing && ing.trim() !== "") list.push(ing);
    }
    return list;
  }

  function getMeasurements(meal) {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const m = meal[`strMeasure${i}`];
      if (m && m.trim() !== "") list.push(m);
    }
    return list;
  }

  const items = getIngredients(meal);
  const measures = getMeasurements(meal);

  return (
    <section className={styles.detailbox}>
      <div
        className={styles.detailscontent}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${meal.strMealThumb})`,
        }}
      >
        <div className={styles.titlebox}>
          <h1>{meal.strMeal}</h1>
          <div>
            <p>Category: {meal.strCategory}</p>
            <p>Area: {meal.strArea}</p>
          </div>
        </div>
      </div>

      <div className={styles.instructionbox}>
        <div className={styles.ingredients}>
          <h3>Ingredients</h3>

          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item}: {measures[index] || ""}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.instructions}>
          <h3>Instructions:</h3>

          {meal.strYoutube && (
            <span>
              <a href={meal.strYoutube} target="_blank" >
                Tutorial
              </a>
            </span>
          )}

          <ol>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
