import { useEffect, useState } from 'react'
import axios from 'axios';
import Header from '../../components/Header'

const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      const result = await axios('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = result.data.results;
      const pokemonsParsed = data.map(pokemon => {
        let splitUrl = pokemon.url.split('/');
        let id = splitUrl[splitUrl.length - 2];
        return { id: id, name: pokemon.name }
      });
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
                <td>{pokemon.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  )
}

export default Home