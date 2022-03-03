import { BrowserRouter, Routes as Rotas, Route } from 'react-router-dom'

// PAGES
import { Home } from './pages/Home'
import { Filme } from './pages/Filme'
import { Favoritos } from './pages/Favoritos'
import { Erro } from './pages/Erro'
// COMPONENTS
import { Header } from './components/Header'

export const Routes = () => {
	return (
		<BrowserRouter>
			<Header />
			<Rotas>
				<Route path='/' element={<Home />} />
				<Route path='/filme/:id' element={<Filme />} />
				<Route path='/favoritos' element={<Favoritos />} />
				<Route path="*" element={<Erro />} />
			</Rotas>
		</BrowserRouter>
	)
}