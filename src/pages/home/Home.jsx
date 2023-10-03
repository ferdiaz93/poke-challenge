import { useEffect, useState } from 'react'
import axios from 'axios';
import Header from '../../components/Header'
import { parsePokemons } from '../../utils/pokemonUtils';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      const result = await axios('https://pokeapi.co/api/v2/generation/1');
      const data = result.data;
      const pokemonsParsed = parsePokemons(data.pokemon_species);
      setPokemons(pokemonsParsed);
    };
    try{
      getPokemons();
    } catch (error) {
      console.log(error);
    };
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