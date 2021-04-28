import React from 'react';
import { useState } from 'react';

const ReadingUpdater = (props) => {


	//State declarations
	const [ pagesRead, setPagesRead ] = useState(0);
	const [ totalPagesOfBook, setTotalPagesOfBook ] = useState(0);
	const [ bookName, setBookName ] = useState('');
	const [ updatingState, setUpdatingState ] = useState('start');

	//Function declarations

	const select = () => {
		//Runs when a book is selected on the selector
		setBookName(document.getElementById('bookSelector').value);
		setUpdatingState('selected');
	}

	const newBook = (input) => {
		//Runs when new book name is edited
		setBookName(input);
		setUpdatingState('new');
	}


	//TODO: ACCOUNT FOR USER INPUTTING TEXT IN THE PAGES-FIELD

	const submitReading = () => {

		const bookSelector = document.getElementById('bookSelector');

		const knownBook = props.books.find(book => book.name === bookName);

		if(bookName === ''){
			window.alert('Select or enter a book name!')
			return;
		}
		if(!bookSelector){
			//New book

			if(props.books.find((book) => book.name === bookName)){
				//'New' bookName is actually the name of a book previously added
				window.alert('Book has already been added!')
				return;

			}else if(bookName === ''){
				//New bookname is empty
				window.alert('Insert a book name!')
				return;

			}else if(totalPagesOfBook <= 0 || pagesRead <= 0 || pagesRead > totalPagesOfBook){
				//Invalid book page count
				window.alert('Invalid page count!')
				return;

			}else{
				const newBook = {
					'name': bookName,
					'pages': totalPagesOfBook,
					'pagesRead': pagesRead
				}

				props.setBooks(props.books.concat(newBook));

			}
		}else{
			//Selected book
			if(pagesRead <= 0 || knownBook.pagesRead+pagesRead > knownBook.pages){
				//Invalid book page count
				window.alert('Invalid page count!')
				return;
			}
			knownBook.pagesRead += pagesRead;

		}

		//Handle stats and UI updating

		if(props.streak === 0){

			//Streak updating after a reset

			props.setStreak(props.streak+1);

			props.setReadByDate(new Date(props.todayDate.getFullYear(), 
				props.todayDate.getMonth(), props.todayDate.getDate()+1));

		}else if(props.todayDate.getFullYear() === props.readByDate.getFullYear() &&
			props.todayDate.getMonth() === props.readByDate.getMonth() &&
			props.todayDate.getDate() === props.readByDate.getDate()){

			//Normal streak updating handling

			props.setStreak(props.streak+1);

			props.setReadByDate(new Date(props.readByDate.getFullYear(), 
				props.readByDate.getMonth(), props.readByDate.getDate()+1));
		}
	
		props.setTotalPages(props.totalPages+pagesRead);
		setUpdatingState('start');
		props.setAppState('start');

	}

	return (
		<div>
			<h3>Update read books</h3>

			{updatingState !== 'new' &&
			(<p>Select book:
			<select id='bookSelector' defaultValue='default' onChange={select}>
				<option value='default' disabled hidden>Choose here</option>

				{props.books.map((book) => <option key={book.name}>{book.name}</option>)}

			</select>

			</p>)
			}
			{updatingState !== 'selected' && 
			(<p>... or add a new one: <input type='text' placeholder='book name here...' 
			onChange={event => newBook(event.target.value)}/> 
			<input type='text' placeholder='page count here...'
			onChange={event => setTotalPagesOfBook(Number(event.target.value))}/></p>)
			}

			<p>Pages read: <input type='text' placeholder='read pages here...' 
			onChange={event => setPagesRead(Number(event.target.value))} /></p>

			<button onClick={submitReading}>Submit pages read!</button>
		</div>
	);
}


export default ReadingUpdater