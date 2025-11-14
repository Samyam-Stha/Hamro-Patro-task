import React from "react";
import { useEffect, useState } from "react";

export default function Home() {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(URL);
      const recipe = await res.json();
      console.log(recipe);
    };
    fetchData();
  });
  return <div>Home</div>;
}
