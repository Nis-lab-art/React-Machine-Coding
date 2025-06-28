import React, { useState } from "react";
import { useEffect } from "react";

export default function Pokemon() {
  const [heighestScore, setHeighestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedItems, setClickedItems] = useState(new Set());
  const [pokemons, setPokemons] = useState([]);

  const handleClick = (item) => {
    setPokemons((prev) => [...prev].sort(() => Math.random() - 0.5));
    const exists = clickedItems.has(item);
    if (exists) {
      alert(`Game Over, height score is ${heighestScore}`);
      setScore(0);
      clickedItems.clear();
      return;
    }
    setScore((prev) => {
      const newScore = prev + 1;
      if (newScore > heighestScore) {
        setHeighestScore(newScore);
      }
      return newScore;
    });

    setClickedItems((prev) => {
      const newSet = new Set(prev);
      newSet.add(item);
      return newSet;
    });
  };

  async function handleFetchApi() {
    const list = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
      .then((res) => res.json())
      .then((data) => data.results);

    const pokemons = await Promise.all(
      list.map((r) => fetch(r.url).then((res) => res.json()))
    );

    const withImages = pokemons.map((p) => ({
      name: p.name,
      image: p.sprites.other["official-artwork"].front_default,
    }));
    setPokemons(withImages);
  }

  useEffect(() => {
    handleFetchApi();
  }, []);

  return (
    <main>
      <div className="top-container">
        <h1>Pokemon Memory Game</h1>
        <label>
          Get points by clicking on an image but don't click on any more than
          once!
        </label>
        <div className="score-container">
          <p>Score: {score}</p>
          <p>Heighest Score: {heighestScore}</p>
        </div>
      </div>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name} onClick={() => handleClick(pokemon.name)}>
            <img alt={`pokemon ${pokemon.name}`} src={pokemon.image} />
            <p>{pokemon.name}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
