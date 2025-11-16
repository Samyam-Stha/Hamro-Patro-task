import React, { useState, useEffect } from "react";
import styles from "./Form.module.css";

export default function Form() {
  const [meals, setMeals] = useState([]);

  const [mealName, setMealName] = useState("");
  const [mealCategory, setMealCategory] = useState("");
  const [mealArea, setMealArea] = useState("");
  const [mealInstruction, setMealInstruction] = useState("");
  const [mealThumb, setMealThumb] = useState("");
  const [mealTag, setMealTag] = useState("");
  const [mealYoutube, setMealYoutube] = useState("");

  const [ingredients, setIngredients] = useState([""]);
  const [measures, setMeasures] = useState([""]);

  useEffect(() => {
    const savedMeals = JSON.parse(localStorage.getItem("meals")) || {
      meals: [],
    };
    setMeals(savedMeals.meals);
  }, []);

  const addIngredientRow = () => {
    setIngredients([...ingredients, ""]);
    setMeasures([...measures, ""]);
  };

  const updateIngredient = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const updateMeasure = (index, value) => {
    const updated = [...measures];
    updated[index] = value;
    setMeasures(updated);
  };

  const ingredientsMeasurements = () => {
    const obj = {};
    for (let i = 0; i < 20; i++) {
      obj[`strIngredient${i + 1}`] = ingredients[i] || "";
      obj[`strMeasure${i + 1}`] = measures[i] || "";
    }
    return obj;
  };

  const addMeal = () => {
    if (!mealName) return;

    const ingredientFields = ingredientsMeasurements();

    const newMeal = {
      idMeal: Date.now().toString(),
      strMeal: mealName,
      strMealAlternate: null,
      strCategory: mealCategory,
      strArea: mealArea,
      strInstructions: mealInstruction,
      strMealThumb: mealThumb,
      strTags: mealTag,
      strYoutube: mealYoutube,
      ...ingredientFields,
      strSource: null,
      strImageSource: null,
      dateModified: null,
    };

    const updatedMeals = [...meals, newMeal];
    setMeals(updatedMeals);
    localStorage.setItem("meals", JSON.stringify({ meals: updatedMeals }));
    setMealName("");
    setMealCategory("");
    setMealArea("");
    setMealInstruction("");
    setMealThumb("");
    setMealTag("");
    setMealYoutube("");
    setIngredients([""]);
    setMeasures([""]);
  };

  return (
    <section className={styles.formconatiner}>
      <form className={styles.formbox}>
        <h1>Meals</h1>

        <input
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
          placeholder="Meal Name"
        />
        <input
          value={mealCategory}
          onChange={(e) => setMealCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          value={mealArea}
          onChange={(e) => setMealArea(e.target.value)}
          placeholder="Area"
        />
        <input
          value={mealInstruction}
          onChange={(e) => setMealInstruction(e.target.value)}
          placeholder="Instructions"
        />
        <input
          value={mealThumb}
          onChange={(e) => setMealThumb(e.target.value)}
          placeholder="Thumbnail"
        />
        <input
          value={mealTag}
          onChange={(e) => setMealTag(e.target.value)}
          placeholder="Tags"
        />
        <input
          value={mealYoutube}
          onChange={(e) => setMealYoutube(e.target.value)}
          placeholder="YouTube Link"
        />

        <h3>Ingredients & Measures</h3>
        {ingredients.map((item, index) => (
          <div
            key={index}
            style={{ marginBottom: "10px" }}
            className={styles.ingredientRow}
          >
            <input
              type="text"
              placeholder={`Ingredient ${index + 1}`}
              value={ingredients[index]}
              onChange={(e) => updateIngredient(index, e.target.value)}
            />
            <input
              type="text"
              placeholder={`Measure ${index + 1}`}
              value={measures[index]}
              onChange={(e) => updateMeasure(index, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addIngredientRow}>
          + Add Ingredient
        </button>

        <button onClick={addMeal}>Submit</button>

        <hr />

      
      </form>
    </section>
  );
}
