import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchResultsPage() {
  const URL = `${import.meta.env.VITE_API_URL}/filter`;

  const retrieveIsVegetarian = () => {
    const vegetarian = localStorage.getItem("vegetarian");
    if (vegetarian === null || vegetarian === "default")
      return "vegetarian=default";
    return `vegetarian=${localStorage.getItem("vegetarian")}`;
  };

  const retrieveAllergies = () => {
    const arachids = localStorage.getItem("arachides");
    const seafood = localStorage.getItem("fruits-de-mer");
    const fish = localStorage.getItem("poisson");
    const lactose = localStorage.getItem("lactose");
    const allergies = [];

    const addAllergy = (value, str) => {
      if (value !== null && value === "true") allergies.push(`${str}`);
    };
    addAllergy(arachids, "arachides");
    addAllergy(seafood, "fruits-de-mer");
    addAllergy(fish, "poisson");
    addAllergy(lactose, "lactose");

    if (allergies.length > 0) {
      const allergiesString = allergies.join(",");
      return `allergy=${allergiesString}`;
    }
    return "allergy=none";
  };

  const retrieveLimit = () => {
    const tempLimit = localStorage.getItem("limit");
    if (tempLimit !== null && tempLimit !== "default")
      return `limit=${tempLimit}`;
    return "limit=default";
  };

  const [results, setResults] = useState([]);

  useEffect(() => {
    const isVegetarian = retrieveIsVegetarian();
    const allergy = retrieveAllergies();
    const limit = retrieveLimit();

    const fetchURL = () => `${URL}?${isVegetarian}&${allergy}&${limit}`;

    const fetchResults = async () => {
      const response = await fetch(fetchURL());
      const data = await response.json();

      setResults(data);
    };
    fetchResults();
  }, [URL]);

  return (
    <main>
      {results.length > 0 ? (
        results.map((r) => (
          <div key={r.id}>
            <Link to={`/recipe/${r.id}`}>
              <figure>
                <img src={r.image} alt={r.name} />
                <figcaption>{r.name}</figcaption>
              </figure>
            </Link>
          </div>
        ))
      ) : (
        <p>Pas de résultats...</p>
      )}
    </main>
  );
}
