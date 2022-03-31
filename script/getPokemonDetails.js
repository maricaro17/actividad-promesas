export const getPokemonDetails = async (url) => {
  try {
    const pokemon = await fetch(url);
    const data = await pokemon.json();
    return data;
  } catch (error) {
    return error;
  }
};
