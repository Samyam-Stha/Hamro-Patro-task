import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h2>My Recipe App</h2>
      <ul className={styles.navlinks}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/form">Add Recipe</Link>
        </li>
        <li>
            <Link to="/myrecipe">My Recipe</Link>
        </li>
      </ul>
    </nav>
  );
}
