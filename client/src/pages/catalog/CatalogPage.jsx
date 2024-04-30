import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./catalogPage.module.css";

export default function CatalogPage() {
  const [recipes, setRecipes] = useState();
  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes`);
      const data = await response.json();
      setRecipes(data);
    };
    fetchRecipe();
  }, []);

  return (
    <>
      <h2 className={style.title}>Catalogue des recettes</h2>
      <div className={style.container}>
        {recipes &&
          recipes.map((r) => (
            <Link
              className={style.links}
              to={`/recipe/${r.id}?returnURL=recipe-list`}
              key={r.id}
            >
              <figure className={style.card}>
                <img className={style.imageFood} src={r.image} alt={r.name} />
                <figcaption className={style.mealName}>{r.name}</figcaption>
              </figure>
            </Link>
          ))}
      </div>
    </>
  );
}
