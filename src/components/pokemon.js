import { React, useState, useEffect} from 'react';
import{ Card,Button,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pokemon.css'

 
const Pokemon = ({id, name, height, weight, base_experience, url}) => {


	return(
		<div>
			  <div className="col">
			    <div className="card">
			    	<div className="wrapper">
			        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`} className="card-img-top img-fluid" alt="..." />
			        </div>
			        <div className="card-body">
			        <h5 className="card-title">{name}</h5>
			        <p className="card-text-height">Height: {height}</p>
			        <p className="card-text-weight">Weight: {weight}</p>
			        <p className="card-text-base_experience">Base_experience: {base_experience}</p>
			      </div>
			    </div>
			  </div>		
		</div>

		);
};



export default Pokemon;


