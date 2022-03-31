import { showModal } from "./showModal.js";
import { getPokemonDetails } from "./getPokemonDetails.js";
const pokemonApi = `https://pokeapi.co/api/v2/pokemon`;
const form = document.getElementById("form");
const search = document.getElementById("search");
const pintarPokemon = document.getElementById("pokemon");



const getPokemon = (url) => {
  const peticion = fetch(url);
  peticion
    .then((res) => res.json())
    .then((data) => showPokemon(data.results))
    .catch((error) => {
      /* Swal.fire({
        title: "Hubo un error en el Servidor url",
        icon: "error",
        text: "Recargar la pagina",
        confirmButton: "Aceptar",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }); */
    });
};

getPokemon(pokemonApi);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = `${pokemonApi}/${search.value}`;
  getPokemonDetails(url)
    .then((poke) => {
      pintarPokemon.innerHTML = "";
      if (poke) {
        const { name, sprites } = poke;
        pintarPokemon.innerHTML += `
          <div class="col-md-3">
            <div class="card align-items-center">
              <img src="${sprites.front_default}" width="100" alt="${name}">
              <div class="card-body">
                <h5 class="card-title">${name}</h5>
              </div>
            </div>
            </div>
            `;
      }
    })
    .catch((err) => {
      Swal.fire({
        title: "No se encontro un pokemon con este nombre",
        icon: "error",
        text: "Verifique el nombre del pokemon",
        confirmButtonText: "Aceptar",
        showConfirmButton: true,
      });
    });
});
search.onchange = () => {
  if (search.value.length === 0) {
    console.log("el search esta vacio");
  }
};

const showPokemon = (pokemons) => {
  if (pokemons.length == 0) {
    Swal.fire({
      title: "No se encontro un pokemon con este nombre",
      icon: "error",
      text: "Verifique el nombre del pokemon",
      confirmButtonText: "Aceptar",
      showConfirmButton: true,
    });
  } else {
    pokemons.forEach((poken) => {
      const { url } = poken;
      getPokemonDetails(url).then((data) => {
        const { id, name, sprites } = data;
        pintarPokemon.innerHTML += `
            <div class="col-md-3">
              <div class="card align-items-center">
                <img id="${id}" src="${sprites.front_default}" width="100" class="showModal" alt="${name}" data-bs-toggle="modal" data-bs-target="#modal">
                <div class="card-body">
                  <h5 class="card-title">${name}</h5>
                </div>
              </div>
            </div>
            `;
      });
    });
  }
};

document.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("showModal")) {
    let id = e.target.id;
    showModal(id)
  }
});

