import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './home.css'

import api from '../../services/api';

export function Home() {
	const [filmes, setFilmes] = useState([]);

	useEffect(() => {
		api.get('r-api/?api=filmes')
			.then(({data}) => setFilmes(data))
	}, [])
	 
	return (
		<div className='container'>
			<div className="lista-filmes">
				{filmes.map((filme) => {
					return(
						<article key={filme.id}>
							<strong>{filme.nome}</strong>
							<img src={filme.foto} alt={filme.titulo} />
							<Link to={`/filme/${filme.id}`}>Acessar</Link>
						</article>
					);
				})}
			</div>
		</div>
	);
}