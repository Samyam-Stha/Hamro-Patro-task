import React from "react";
import styles from "./Second.module.css";
export default function Second({ image, title, ingredients }) {
  return (
    <>
      <div className={styles.box}>
        <div
          className={styles.imgbox}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div>
          <h2>{title}</h2>
      
          <p>{ingredients}</p>
        </div>
      </div>
    </>
  );
}
