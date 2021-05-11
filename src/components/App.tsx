import React from 'react';
import { useState } from 'react';
import api from '../utils/api';

import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import BookPopup from './BookPopup/BookPopup';
import Footer from './Footer/Footer';

import IBook from '../interfaces/IBook'

const noBook = {
	name: '',
	cover_i: '',
	title: '',
	author_name: '',
	publish_year: 0,
	publisher: '',
	isbn: '',
	key: ''
}

const App: React.FC = () => {
	const [ snippets, setSnippets ] = useState<IBook[]>([]);
	const [ isBookOpened, setIsBookOpened ] = useState<boolean>(false);
	const [ selectedBook, setSelectedBook ] = useState<IBook>(noBook);
	const [ isRender, setIsRender ] = useState<boolean>(false);
	const [ isSuccessImage, setIsSuccessImage ] = useState<boolean>(true);

	function handleBookClick(choosenBook: IBook) {
		setSelectedBook(choosenBook);
		setIsBookOpened(true);
	}

	function closeBookPopup() {
		setIsBookOpened(false);
		setSelectedBook(noBook);
	}

	function handleClick(e: React.BaseSyntheticEvent) {
		if (e.target.classList.contains('popup')) {
			closeBookPopup();
		}
	}

	async function handleSearchSubmit(request: string) {
		if (request !== '') {
			setIsRender(true);
			let res = await api.getSnippets(request);

			console.log(res.numFound, 'найдено');
			setIsSuccessImage(res.numFound > 0 ? true : false);

			setSnippets(res.docs);
			setIsRender(false);
		}
	}
	return (
		<div className="root">
			<div className="page">
				<Header />
				<Main
					snippets={snippets}
					onSnippetClick={handleBookClick}
					onSearch={handleSearchSubmit}
					isRender={isRender}
					isSuccessImage={isSuccessImage}
				/>
				<Footer />
				<BookPopup
					book={selectedBook}
					isOpen={isBookOpened}
					onClose={closeBookPopup}
					onEscClose={handleClick}
				/>
			</div>
		</div>
	);
}

export default App;
