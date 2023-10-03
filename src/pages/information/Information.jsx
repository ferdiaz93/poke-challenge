import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { parsePokemons } from '../../utils/pokemonUtils';

const Information = () => {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [selectedAbility, setSelectedAbility] = useState('');
  const [otherPokemons, setOtherPokemons] = useState([]);

  useEffect(() => {
    const getPokemon = async () => {
      const result = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = result.data;
      setPokemon(data);
    };
    getPokemon();
  }, [id]);

  const getAbility = async (name, url) => {
    setSelectedAbility(name);
    const result = await axios(url);
    const data = result.data;
    const filteredPokemons = parsePokemons(data.pokemon).filter(pokemon => pokemon.id <= 151);
    console.log(filteredPokemons);
    setOtherPokemons(filteredPokemons);
  };

  return (
    <>
      <Header />
      <main className="container information">
        <h2>{`${pokemon.name?.toUpperCase()} Information`}</h2>
        <div>
          <div className="img-container">
            <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
          </div>
        </div>
        <div>
          <h3>Stats</h3>
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Base Stat</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats?.map(stat => (
                <tr key={stat.stat.name}>
                  <td>{stat.stat.name}</td>
                  <td>{stat.base_stat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3>Habilities</h3>
          <table className="table table-dark table-hover ability-table">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.abilities?.map(ability => (
                <tr key={ability.ability.name}>
                  <td
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => getAbility(ability.ability.name, ability.ability.url)}>
                      {ability.ability.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="more-pokemons"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="more-pokemons">Pokemons with '{selectedAbility.toUpperCase()}' ability</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otherPokemons.length ? otherPokemons?.map(pokemon => (
                      <tr key={pokemon.id}>
                        <td>{pokemon.id}</td>
                        <td><a href={`/pokemon/${pokemon.id}`}>{pokemon.name}</a></td>
                      </tr>
                    )): <tr><td colSpan="2">No pokemons found</td></tr>}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

  export default Information