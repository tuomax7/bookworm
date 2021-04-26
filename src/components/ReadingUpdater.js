import React from 'react'

const ReadingUpdater = (props) => {

	return (
		<div>
			<h3>Update read pages</h3>
			{/*Later change book selection to dropdown-menu*/}
			<p>Book: <input type='text' placeholder='book name here...' /></p>
			<p>Pages read: <input type='text' placeholder='read pages here...'/></p>
		</div>
	);
}

export default ReadingUpdater