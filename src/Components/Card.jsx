import React from "react";
import styles from "./Card.module.css";
export default function Card({ image, title }) {
  return (
    <>
      <div className={styles.container}>
        <h2>{title}</h2>
        <img src={image} alt={title} />
      </div>
    </>
  );
}
