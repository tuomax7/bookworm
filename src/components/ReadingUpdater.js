import React from 'react';
import { useState } from 'react';

const ReadingUpdater = (props) => {


	//Variable declarations


	//State declarations
	const [ pagesRead, setPagesRead ] = useState(0);
	const [ bookName, setBookName ] = useState('');

	//Function declarations
	const submitReading = () => {
		const knownBook = props.books.find(book => book.name === bookName);


		//ACCOUNT FOR NEGATIVE PAGE COUNT!

		if(!knownBook){
			//Book not found
			window.alert('Book not found!');

		}else if (knownBook.pagesRead+pagesRead <= knownBook.pages){
			//Book found and pages read does not exceed total page count of book
			knownBook.pagesRead += pagesRead;

			props.setStreak(props.streak+1);
			props.setTotalPages(props.totalPages+pagesRead);

		}else{
			//Book found but pages read exceeds total page count of book
			window.alert('Pages read so far is greater than the total page count of book!')
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