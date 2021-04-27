import React from 'react'

const Booklist = (props) => {

	return (
		<div>
			<h3>Your books</h3>
    		<ul>
				{props.books.map((book) => 
    			<Book key={book.name} name={book.name} pagesRead={book.pagesRead} pages={book.pages} />
    			)}
    		</ul>
		</div>
	);
}

const Book = (props) => {

	return (
		<li><b>{props.name}</b> Completion: <b>{(100*props.pagesRead/props.pages).toFixed(1)}%</b></li>
	)
}

export default Booklist