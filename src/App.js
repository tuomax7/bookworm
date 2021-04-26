import React from 'react';
import { useState } from 'react';

import './App.css';

//Components
import Booklist from './components/Booklist.js';
import StreakView from './components/StreakView.js';
import ReadingUpdater from './components/ReadingUpdater.js';


const App = () => {
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

//State declarations
const [ appState, setAppState ] = useState('start');
const [ streak, setStreak ] = useState(0);
const [ totalPages, setTotalPages ] = useState(0);


//Function declarations

const onReadingUpdateClick = () => {
	//Make this render ReadingUpdater
	setAppState('updatingReading')
}

  return (
    <div>
    	<h1>Bookworm</h1>
  		
  		<StreakView streak={streak} totalPages={totalPages}/>

  		{appState === 'start' && (<button onClick={onReadingUpdateClick}>Update read pages!</button>)}

  		{appState === 'updatingReading' && (<ReadingUpdater setAppState={setAppState} setStreak={setStreak} setTotalPages={setTotalPages} streak={streak} totalPages={totalPages}/>) }

  		<Booklist books={books}/>

    </div>
  );
}

export default App;
