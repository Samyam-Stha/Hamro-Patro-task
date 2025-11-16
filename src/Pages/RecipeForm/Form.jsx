import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Form.module.css";

export default function Form() {
  const navigate = useNavigate();
  const location = useLocation();

 
  const queryParams = new URLSearchParams(location.search);
  const editId = queryParams.get("editId");

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

    if (editId) {
      const mealToEdit = savedMeals.meals.find((m) => m.idMeal == editId);
      if (mealToEdit) {
        setMealName(mealToEdit.strMeal || "");
        setMealCategory(mealToEdit.strCategory || "");
        setMealArea(mealToEdit.strArea || "");
        setMealInstruction(mealToEdit.strInstructions || "");
        setMealThumb(mealToEdit.strMealThumb || "");
        setMealTag(mealToEdit.strTags || "");
        setMealYoutube(mealToEdit.strYoutube || "");

        
        const ing = [];
        const meas = [];
        for (let i = 1; i <= 20; i++) {
          ing.push(mealToEdit[`strIngredient${i}`] || "");
          meas.push(mealToEdit[`strMeasure${i}`] || "");
        }
        setIngredients(ing);
        setMeasures(meas);
      }
    }
  }, [editId]);

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

  const handleSubmit = () => {
    if (!mealName) return;

    const ingredientFields = ingredientsMeasurements();

    if (editId) {
      
      const updatedMeals = meals.map((m) =>
        m.idMeal == editId
          ? {
              ...m,
              strMeal: mealName,
              strCategory: mealCategory,
              strArea: mealArea,
              strInstructions: mealInstruction,
              strMealThumb: mealThumb,
              strTags: mealTag,
              strYoutube: mealYoutube,
              ...ingredientFields,
            }
          : m
      );
      setMeals(updatedMeals);
      localStorage.setItem("meals", JSON.stringify({ meals: updatedMeals }));
      alert("Meal updated successfully!");
    } else {
     
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
      alert("Meal added successfully!");
    }

    navigate("/myrecipe");
  };

  return (
    <section className={styles.formconatiner}>
      <form className={styles.formbox} onSubmit={(e) => e.preventDefault()}>
        <h1>{editId ? "Edit Meal" : "Add Meal"}</h1>

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

        <button type="button" onClick={handleSubmit}>
          {editId ? "Update Meal" : "Submit"}
        </button>
      </form>
    </section>
  );
}
