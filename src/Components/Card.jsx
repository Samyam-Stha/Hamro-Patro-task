import React from "react";
import styles from "./Card.module.css";
export default function Card({ image, title }) {
  return (
    <>
      <div
        className={styles.container}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={styles.text}>
          <h2>{title}</h2>
        </div>
      </div>
    </>
  );
}
