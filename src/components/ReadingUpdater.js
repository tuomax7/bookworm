import React from 'react';
import { useState } from 'react';

const ReadingUpdater = (props) => {


	//Variable declarations


	//State declarations
	const [ pagesRead, setPagesRead ] = useState(0);

	//Function declarations
	const submitReading = () => {
		props.setStreak(props.streak+1);
		props.setTotalPages(props.totalPages+pagesRead);

		props.setAppState('start');
	}

	return (
		<div>
			{/*Later change book selection to dropdown-menu*/}
			<h3>Update read pages</h3>

			<p>Book: <input type='text' placeholder='book name here...' /></p>
			<p>Pages read: <input type='text' placeholder='read pages here...' 
			onChange={event => setPagesRead(Number(event.target.value))} /></p>

			<button onClick={submitReading}>Submit pages read!</button>
		</div>
	);
}

export default ReadingUpdater