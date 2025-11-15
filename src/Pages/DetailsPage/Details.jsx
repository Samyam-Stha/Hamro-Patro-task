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
       
      </div>
    </section>
  );
}
