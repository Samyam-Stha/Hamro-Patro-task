import React from "react";
import styles from "./Second.module.css";
import { useNavigate } from "react-router-dom";
export default function Second({ id,image, title, ingredients, area }) {

  const navigate = useNavigate();
  return (
    <>
      <div className={styles.box}  onClick={() => navigate(`/recipe/${id}`)}>
  
        <img className={styles.imgbox} src={image} alt={title} />
        <div className={styles.content}>
          <div className={styles.des}>
            <h2>{title}</h2>
            <p>{area}</p>
          </div>
          <p>{ingredients}</p>
        </div>
      </div>
    </>
  );
}
