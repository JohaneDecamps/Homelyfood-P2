import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./recipeDetails.module.css";

export default function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const [loader, setLoader] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/recipes/${id}`
      );
      const data = await response.json();

      setRecipe(data);
      setLoader(true);
    };
    fetchRecipe();
  }, [id]);

  return (
    <div className={style.allRecipe}>
      {loader ? (
        <>
          <div className={style.titleRecipe}>
            <h1>{recipe.name}</h1>
          </div>
          <div className={style.ingredientImage}>
            <img
              className={style.imageRecipe}
              src={recipe.image}
              alt={recipe.name}
            />

            <span className={style.titleIngredients}>
              {" "}
              Liste des ingrédients :{" "}
            </span>
            <p> {recipe.ingredients}</p>
          </div>

          <div className={style.recipeSide}>
            <p className={style.recette}> Recette : </p>
            <p className={style.recipe}>{recipe.recipe}</p>
          </div>
        </>
      ) : (
        <p>...</p>
      )}
    </div>
  );
}
