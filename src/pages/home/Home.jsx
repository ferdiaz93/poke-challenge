import { useEffect, useState } from 'react'
import axios from 'axios';
import Header from '../../components/Header'

const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      const result = await axios('https://pokeapi.co/api/v2/generation/1');
      const data = result.data;
      const pokemonsParsed = data.pokemon_species.map(pokemon => {
        let splitUrl = pokemon.url.split('/');
        let id = splitUrl[splitUrl.length - 2];
        return { id: id, name: pokemon.name }
      }).sort((a, b) => a.id - b.id);
      setPokemons(pokemonsParsed);
    };
    getPokemons();
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        <h1>Home</h1>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.map(pokemon => (
              <tr key={pokemon.id}>
                <td>{pokemon.id}</td>
                <td><a href={`/pokemon/${pokemon.id}`}>{pokemon.name}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  )
}

export default Home