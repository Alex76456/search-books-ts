import React from 'react';
import './BookPopup.css';
import { useEffect } from 'react';
import IBook from '../../interfaces/IBook'

interface BookPopupProps {
	book: IBook;
	isOpen: boolean;
	onClose(): void;
	onEscClose(event: React.MouseEvent): void;
}

const BookPopup: React.FC<BookPopupProps>= ({ book, isOpen, onClose, onEscClose })=> {
	useEffect(
		() => {
			if (!isOpen) return;
			const handleEscapeClose = (event: KeyboardEvent):void => {
				if (event.key === 'Escape') {
					onClose();
				}
			};
			document.addEventListener('keydown', handleEscapeClose);
			return () => {
				document.removeEventListener('keydown', handleEscapeClose);
			};
		},
		[ isOpen, onClose ]
	);

	return (
		<div className={`popup popup_type_book  ${isOpen && 'popup_opened'}`} onClick={onEscClose}>
			<div className="popup__content">
				<button type="button" className="popup__close" onClick={onClose} />
				<img
					className="popup__image"
					src={
						book.cover_i ? (
							`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
						) : (
							`https://missefficiency.nl/contents/media/l_naslagwerk_20171107144603.jpg`
						)
					}
					alt={book.title}
				/>
				<h2 className="popup__book-title">Название: {book.title}</h2>
				<h3 className="popup__book-author">Автор: {book.author_name}</h3>
				<p className="popup__book-publish">Год публикации: {book.publish_year}</p>
				<p className="popup__book-publisher">Издатель: {book.publisher}</p>
				<p className="popup__book-isbn">ISBN книги: {book.isbn}</p>
			</div>
		</div>
	);
}

export default BookPopup;
