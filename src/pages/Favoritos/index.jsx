import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'

import './favoritos.css'

export function Favoritos() {
	const [filmes, setFilmes] = useState([]);

	useEffect(() => {
		
		const minhaLista = localStorage.getItem('filmes');
		setFilmes(JSON.parse(minhaLista) || [])
	}, [])

	function handleDelete(id) {
		let filtroFilmes = filmes.filter((item) => {
			return (item.id !== id)
		})

		localStorage.setItem('filmes',JSON.stringify(filtroFilmes))
		setFilmes(filtroFilmes)
		toast.success("Filme excluído com sucesso");
	}

	return(
		<div id="meus-filmes">
			<h1>Página de Salvos</h1>

			{filmes.length === 0 && <span>Você não possui filmes salvos :(</span>}

			<ul>
				{filmes.map((filme) => {
					return(
						<li key={filme.id}>
							<span>{filme.nome}</span>
							<div>
								<Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
								<button onClick={ () => handleDelete(filme.id) }>Excluir</button>
							</div>
						</li>
					)
				})}
			</ul>
		</div>

	)
}