import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const ReadingUpdater = (props) => {


	//Variable state declarations
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
		//Runs when new book name input is edited
		setBookName(input);
		setUpdatingState('new');
	}


	//The heart of reading updating


	const submitReading = () => {

		const bookSelector = document.getElementById('bookSelector');

		const knownBook = props.books.find(book => book.name === bookName);



		if(bookName === ''){
			//BookName input empty and no book selected: ERROR
			window.alert('Select or enter a book name!')
			return;
		}


		if(!bookSelector){
			//New book introduced

			if(props.books.find((book) => book.name === bookName)){
				//'New' bookName is actually the name of a book previously added: ERROR
				window.alert('Book has already been added!')
				return;

			}else if(bookName === ''){
				//New bookname is empty: ERROR
				window.alert('Insert a book name!')
				return;

			}else if(isNaN(totalPagesOfBook) || isNaN(pagesRead) || 
				totalPagesOfBook <= 0 || pagesRead <= 0 || pagesRead > totalPagesOfBook){
				//Invalid book page count: ERROR
				window.alert('Invalid page count!')
				return;

			}else{
				//SUCCESS, new book is added onto the booklist
				const newBook = {
					'name': bookName,
					'pages': totalPagesOfBook,
					'pagesRead': pagesRead
				}

				//props.setBooks(props.books.concat(newBook));

				axios
    				.post('http://localhost:3001/api/books', newBook)
    				.then(response => {
      				 props.setBooks(props.books.concat(response.data))
    			})

			}
		}else{
			//Selected book from known ones

			if(isNaN(pagesRead) || pagesRead <= 0 || knownBook.pagesRead+pagesRead > knownBook.pages){
				//Invalid book page count: ERROR
				window.alert('Invalid page count!')
				return;
			}

			knownBook.pagesRead += pagesRead;
			
			console.log(knownBook.id);
			axios.put(`http://localhost:3001/api/books/${knownBook.id}`, knownBook).then(response => {
    			props.setBooks(props.books.map(book => book.id !== knownBook.id ? book : response.data))
  			})

		}

		//Handle stats and UI updating

		if(props.streak === 0 && props.pagesReadToday+pagesRead >= props.readingGoal){

			//Streak updating after a reset

			props.setStreak(props.streak+1);

			props.setReadByDate(new Date(props.todayDate.getFullYear(), 
				props.todayDate.getMonth(), props.todayDate.getDate()+1));


		}else if(props.todayDate.getFullYear() === props.readByDate.getFullYear() &&
			props.todayDate.getMonth() === props.readByDate.getMonth() &&
			props.todayDate.getDate() === props.readByDate.getDate() && props.pagesReadToday+pagesRead >= props.readingGoal){

			//Normal streak updating handling

			props.setStreak(props.streak+1);

			props.setReadByDate(new Date(props.readByDate.getFullYear(), 
				props.readByDate.getMonth(), props.readByDate.getDate()+1));
		}

		//Update latestdayread to keep track of pages read/day

		props.setLatestDayRead(new Date(props.todayDate.getFullYear(),
			props.todayDate.getMonth(), props.todayDate.getDate()));


		//Update pages read (total+daily) and update states of app
		props.setPagesReadToday(props.pagesReadToday+pagesRead);
		props.setTotalPages(props.totalPages+pagesRead);
		setUpdatingState('start');
		props.setAppState('start');

	}

	return (
		<div>
			<h3>Update read books</h3>

			{updatingState !== 'new' && (<p>Select book:

			<select id='bookSelector' defaultValue='default' onChange={select}>

				<option value='default' disabled hidden>Choose here</option>

				{props.books.map((book) => <option key={book.name}>{book.name}</option>)}

			</select>

			</p>)}


			{updatingState !== 'selected' && (<p>... or add a new one: 

			<input type='text' placeholder='book name here...' 
			onChange={event => newBook(event.target.value)}/> 


			<input type='text' placeholder='page count here...'
			onChange={event => setTotalPagesOfBook(Number(event.target.value))}/>

			</p>)}
			

			<p>Pages read: 
			<input type='text' placeholder='read pages here...' 
			onChange={event => setPagesRead(Number(event.target.value))} />
			</p>

			<button onClick={submitReading}>Submit pages read!</button>
		</div>
	);
}


export default ReadingUpdater;