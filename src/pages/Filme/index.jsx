import { useState, useEffect } from 'react';

import {useParams, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

import api from '../../services/api'
import './filme-info.css';

export function Filme() {
	const [filme, setFilme] = useState([])
	const [loading, setLoading] = useState(true);
	const {id} = useParams();
	const navigate = useNavigate();

	useEffect(()=>{
		api.get(`/r-api/?api=filmes/${id}`)
			.then(({data}) => {
				if(data.length !== 0) {
					setFilme(data);
					setLoading(false);
				} else {
					navigate('/')
				}
			})
	},[id, navigate])

	function salvaFilme() {
		
		const minhaLista = localStorage.getItem('filmes');
		
		let filmesSalvos = JSON.parse(minhaLista) || [];

		// Verifica se o filme clicado ja esta salvo
		const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

		if(hasFilme) {
			toast.info('Você já possui esse filme salvo.')
			return;
		}

		filmesSalvos.push(filme);
		localStorage.setItem('filmes', JSON.stringify(filmesSalvos))
		toast.success('Filme salvo com sucesso')
	}


	if(loading) {	
		return (
			<div className='filme-info'>
				<h1>Carregando seu filme...</h1>
			</div>
		)
	} else {
		return(
			<div className='filme-info'>
				<h1>{filme.nome}</h1>
				<img src={filme.foto} alt={filme.nome} />

				<h3>Sinopse</h3>
				{filme.sinopse}

				<div className='botoes'>
					<button onClick={salvaFilme}>Salvar</button>
					<button>
						<a href={`https://www.youtube.com/results?search_query=${filme.nome}+Trailer`} 
							target="_blank" rel="noreferrer">
								Trailer
						</a>
					</button>
				</div>
			</div>
		)
	}
}