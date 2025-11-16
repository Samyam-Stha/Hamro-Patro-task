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
  const [mealCategory, setMealCategory] = useState("Miscellaneous");
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
        setMealCategory(mealToEdit.strCategory || "Miscellaneous");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !mealName.trim() ||
      !mealArea.trim() ||
      !mealInstruction.trim() ||
      !ingredients[0].trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const ingredientFields = ingredientsMeasurements();

    if (editId) {
      const updatedMeals = meals.map((m) =>
        m.idMeal == editId
          ? {
              ...m,
              strMeal: mealName,
              strCategory: mealCategory || "Miscellaneous",
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
        strCategory: mealCategory || "Miscellaneous",
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
      alert("Recipe added successfully!");
    }

    navigate("/myrecipe");
  };

  return (
    <section className={styles.formconatiner}>
      <form className={styles.formbox} onSubmit={handleSubmit}>
        <h1>{editId ? "Edit Meal" : "Add Meal"}</h1>

        <input
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
          placeholder="Meal Name"
          required
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
          required
        />
        <textarea
          className={styles.instructionarea}
          value={mealInstruction}
          onChange={(e) => setMealInstruction(e.target.value)}
          placeholder="Instructions"
          required
        />

        <label>Thumbnail:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => setMealThumb(reader.result);
              reader.readAsDataURL(file);
            }
          }}
        />
        {mealThumb && (
          <img
            src={mealThumb}
            alt="Thumbnail Preview"
            style={{ width: "150px", marginTop: "10px", borderRadius: "10px" }}
          />
        )}

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
            className={styles.ingredientRow}
            style={{ marginBottom: "10px" }}
          >
            <input
              type="text"
              placeholder={`Ingredient ${index + 1}`}
              value={ingredients[index]}
              onChange={(e) => updateIngredient(index, e.target.value)}
              required={index === 0}
            />
            <input
              type="text"
              placeholder={`Measurement ${index + 1}`}
              value={measures[index]}
              onChange={(e) => updateMeasure(index, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addIngredientRow}>
          + Add Ingredient
        </button>

        <button type="submit">{editId ? "Update Meal" : "Submit"}</button>
      </form>
    </section>
  );
}
