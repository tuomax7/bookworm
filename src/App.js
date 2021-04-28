import React from 'react';
import { useState, useEffect } from 'react';

import './App.css';

//Components
import Booklist from './components/Booklist.js';
import StreakView from './components/StreakView.js';
import ReadingUpdater from './components/ReadingUpdater.js';


const App = () => {

//State declarations
  const [ appState, setAppState ] = useState('start');
  const [ streak, setStreak ] = useState(0);
  const [ totalPages, setTotalPages ] = useState(0);
  const [ books, setBooks ] = useState([
	  {
		  'name': 'Bookname 1',
		  'pages': 100,
		  'pagesRead': 0
	  },
	  {
		  'name': 'Bookname 2',
		  'pages': 200,
		  'pagesRead': 0
	  }
  ]);

  const [ latestDateRead, setLatestDateRead ] = useState(new Date("April 27, 2021"));
  const [ readByDate, setReadByDate ] = useState(
  	new Date(latestDateRead.getFullYear(), latestDateRead.getMonth(), latestDateRead.getDate()+1));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  //Function declarations

  const onReadingUpdateClick = () => {
	  //Make this render ReadingUpdater
	  setAppState('updatingReading')
  }

  //Handles streak resetting
  useEffect(() => {
  	if(today > readByDate){
  		window.alert('You missed a day of reading, so your streak resets!');
  		setStreak(0);
  	}
  }, [])


  return (
    <div>
    	<h1>Bookworm</h1>
  		
  		<StreakView streak={streak} totalPages={totalPages}/>

  		{appState === 'start' && (<button onClick={onReadingUpdateClick}>Update read pages!</button>)}

  		{appState === 'updatingReading' && (<ReadingUpdater setAppState={setAppState} setStreak={setStreak} setTotalPages={setTotalPages} streak={streak} totalPages={totalPages} 
  			books={books} setBooks={setBooks} todayDate={today} readByDate={readByDate}/>) }

  		<Booklist books={books}/>

    </div>
  );
}

export default App;
