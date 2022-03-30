const pokemonApi = "https://pokeapi.co/api/v2/pokemon";

const form = document.getElementById("form");
const search = document.getElementById("search");
const pintarPokemon = document.getElementById("pokemon");

const getPokemon = (url) => {
  const peticion = fetch(url)
  peticion.then (res => res.json())
        

};
getPokemon(url)