import React from 'react';
import { useState } from 'react';

const ReadingUpdater = (props) => {


	//Variable declarations


	//State declarations
	const [ pagesRead, setPagesRead ] = useState(0);
	const [ bookName, setBookName ] = useState('');

	//Function declarations
	const submitReading = () => {
		props.setStreak(props.streak+1);
		props.setTotalPages(props.totalPages+pagesRead);

		const knownBook = props.books.find(book => book.name === bookName);

		if(knownBook){
			knownBook.pagesRead += pagesRead;
		}

		props.setAppState('start');
	}

	return (
		<div>
			{/*Later change book selection to dropdown-menu*/}
			<h3>Update read pages</h3>

			<p>Book: <input type='text' placeholder='book name here...' 
			onChange={event => setBookName(event.target.value)}/></p>

			<p>Pages read: <input type='text' placeholder='read pages here...' 
			onChange={event => setPagesRead(Number(event.target.value))} /></p>

			<button onClick={submitReading}>Submit pages read!</button>
		</div>
	);
}

export default ReadingUpdater