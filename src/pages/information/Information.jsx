import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';

const Information = () => {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [otherPokemons, setOtherPokemons] = useState([]);

  useEffect(() => {
    const getPokemon = async () => {
      const result = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = result.data;
      console.log(data);
      setPokemon(data);
    };
    getPokemon();
  }, [id]);

  const getAbility = async (url) => {
    const result = await axios(url);
    const data = result.data;
    console.log(data);
    setOtherPokemons(data.pokemon.map(pokemon => {
      let splitUrl = pokemon.pokemon.url.split('/');
      let id = splitUrl[splitUrl.length - 2];
      return { id: id, name: pokemon.pokemon.name }
    }).sort((a, b) => a.id - b.id));
  };

  return (
    <>
      <Header />
      <main className="container information">
        <h1>Information</h1>
        <div>
          <h2>{pokemon.name}</h2>
          <div className="img-container">
            <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
          </div>
        </div>
        <div>
          <h3>Habilities</h3>
          <table className="table table-dark">
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
                    onClick={() => getAbility(ability.ability.url)}>
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
                <h1 className="modal-title fs-5" id="more-pokemons">Other Pokemons</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otherPokemons?.map(pokemon => (
                      <tr key={pokemon.id}>
                        <td>{pokemon.name}</td>
                      </tr>
                    ))}
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