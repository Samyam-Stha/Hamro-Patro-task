import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Details.module.css";

export default function Details() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(URL);
      const recipeDetails = await res.json();
      console.log(recipeDetails);
      setMeal(recipeDetails.meals[0]);
    };
    fetchData();
  }, [id]);
  if (!meal) return <h2>Loading</h2>;

  const steps = meal.strInstructions
    .split("\n")
    .filter((step) => step.trim() !== "");

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

    return ingArr;
  }
  function getMeasurements(meal) {
    const mesArr = [];

    for (let i = 1; i <= 20; i++) {
      const measurement = meal[`strMeasure${i}`];

      if (measurement) {
        mesArr.push(measurement);
      } else {
        break;
      }
    }

    return mesArr;
  }

  const items = getIngredients(meal);
  const measures = getMeasurements(meal);

  return (
    <section className={styles.detailbox}>
      <img
        className={styles.imgmain}
        src={meal.strMealThumb}
        alt={meal.strMeal}
        width="300"
      />
      <div className={styles.content}>
        <div className={styles.titlebox}>
          <h1>{meal.strMeal}</h1>
          <div>
            <p>Category: {meal.strCategory}</p>
            <p>Area: {meal.strArea}</p>
          </div>
        </div>
        <hr></hr>
        <br></br>
        <h3>Ingredients</h3>
        {items.map((item, index) => (
          <ul>
            <li key={index}>
              {item}: {measures[index]}
            </li>
          </ul>
        ))}
        <br></br>
        <hr></hr>
        <br></br>
        <h3>Instructions:</h3>
        <span>
          <a href={meal.strYoutube} target="_blank">
            Tutorial Video
          </a>
        </span>
        <ol>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
