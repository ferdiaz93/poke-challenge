// adding id to pokemon object
export const parsePokemons = (pokemons) => {
    const parsedPokemons = pokemons.map(pokemon => {
        let splitUrl = pokemon.pokemon ? pokemon.pokemon.url.split('/') : pokemon.url.split('/');
        let id = splitUrl[splitUrl.length - 2];
        return { id: parseInt(id), name: pokemon.pokemon ? pokemon.pokemon.name : pokemon.name }
    }).sort((a, b) => a.id - b.id);

    return parsedPokemons;
};
