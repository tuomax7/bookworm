import React from 'react';
import { useState } from 'react';

const ReadingUpdater = (props) => {


	//Variable declarations


	//State declarations
	const [ pagesRead, setPagesRead ] = useState(0);
	const [ totalPagesOfBook, setTotalPagesOfBook ] = useState(0);
	const [ bookName, setBookName ] = useState('');

	//Function declarations
	const submitReading = () => {



		const bookSelector = document.getElementById('bookSelector');

		const knownBook = props.books.find(book => book.name === bookName);


		if(bookSelector.value === 'default'){
			//New book

			if(props.books.find((book) => book.name === bookName)){
				//'New' bookName is actually the name of a book previously added
				window.alert('Book has already been added!')

			}else if(bookName === ''){
				//New bookname is empty
				window.alert('Insert a book name!')

			}else if(totalPagesOfBook <= 0){
				//Invalid book page count
				window.alert('Invalid page count!')

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

		}


		//IMPLEMENT PAGESREAD < TOTALPAGESOFBOOK CHECK



/*

		if (knownBook.pagesRead+pagesRead <= knownBook.pages){
			//Book found and pages read does not exceed total page count of book
			knownBook.pagesRead += pagesRead;

			props.setStreak(props.streak+1);
			props.setTotalPages(props.totalPages+pagesRead);

		}else{
			//Book found but pages read exceeds total page count of book
			window.alert('Pages read so far is greater than the total page count of book!')
		}

		props.setAppState('start');*/

	}

	return (
		<div>
			{/*Later change book selection to dropdown-menu*/}
			<h3>Update read books</h3>

			<p>Select book:
			<select id='bookSelector' defaultValue='default' onChange={() => setBookName(document.getElementById('bookSelector').value)}>
				<option value='default' disabled hidden>Choose here</option>

				{props.books.map((book) => <option key={book.name}>{book.name}</option>)}

			</select>
			</p>

			<p>... or add a new one: <input type='text' placeholder='book name here...' 
			onChange={event => setBookName(event.target.value)}/> 
			<input type='text' placeholder='page count here...'
			onChange={event => setTotalPagesOfBook(Number(event.target.value))}/></p>

			<p>Pages read: <input type='text' placeholder='read pages here...' 
			onChange={event => setPagesRead(Number(event.target.value))} /></p>

			<button onClick={submitReading}>Submit pages read!</button>
		</div>
	);
}


export default ReadingUpdater