import React from 'react'

import './App.css';

//Components
import Booklist from './components/Booklist.js';
import StreakView from './components/StreakView.js';
import ReadingUpdater from './components/ReadingUpdater.js';


//Variable declarations
const books = [
	{
		'name': 'Bookname 1',
		'pages': 100,
		'pagesRead': 50
	},
	{
		'name': 'Bookname 2',
		'pages': 200,
		'pagesRead': 200
	}
];

const streak = 0;
const totalPages = 0;


const onReadingUpdateClick = () => {
	//Make this render ReadingUpdater
}


const App = () => {
  return (
    <div>
    	<h1>Bookworm</h1>
  		
  		<StreakView streak={streak} totalPages={totalPages}/>
  		<button onClick={onReadingUpdateClick}>Update read pages!</button>
  		<ReadingUpdater />
  		<Booklist books={books}/>

    </div>
  );
}

export default App;
