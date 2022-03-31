import { getPokemonDetails } from "./getPokemonDetails.js";
const pokemonApi = `https://pokeapi.co/api/v2/pokemon`;

const pokemonDetails = document.getElementById("detail");
export const showModal = (id) => {
  getPokemonDetails(`${pokemonApi}/${id}`).then((pokemon) => {
    const { name, sprites } = pokemon;
    pokemonDetails.innerHTML = `
    <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${name}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class='row g-0'>
      <div class='col-md-4'>
         <img class='w-100 my-5 ms-4' src="${sprites.front_default}" alt="${name}">
      </div>
      </div>
  </div>
    
    `;
  });
};
