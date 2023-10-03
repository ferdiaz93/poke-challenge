import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';

const Information = () => {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const getPokemon = async () => {
      const result = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = result.data;
      console.log(data);
      setPokemon(data);
    };
    getPokemon();
  }, [id]);

  return (
    <>
      <Header />
      <main className="container">
        <h1>Information</h1>
        <div>
          <h2>{pokemon.name}</h2>
          <div className="img-container">
            <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
          </div>
        </div>
      </main>
    </>
  )
}

  export default Information