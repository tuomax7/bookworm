import React from 'react';
import { useState, useEffect } from 'react';

import './App.css';

//Components
import Booklist from './components/Booklist.js';
import StreakView from './components/StreakView.js';
import ReadingUpdater from './components/ReadingUpdater.js';
import ReadingGoal from './components/ReadingGoal.js';


const App = () => {

  //Variable state declarations
  const [ appState, setAppState ] = useState('start');
  const [ streak, setStreak ] = useState(0);
  const [ readingGoal, setReadingGoal ] = useState(10);
  const [ pagesReadToday, setPagesReadToday ] = useState(0);
  const [ totalPages, setTotalPages ] = useState(0);

  //Contains sample data for dev purposes
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


  //Date declarations (states)

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const [ todayDate ] = useState(today);

  //Set as today for development purposes
  const [ readByDate, setReadByDate ] = useState(
  	new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()));

  const [ latestDayRead, setLatestDayRead ] = useState(
  	new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()));



  //Function declarations

  const onReadingUpdateClick = () => {
	  //Renders ReadingUpdater
	  setAppState('updatingReading')
  }

  const onGoalUpdateClick = () => {
  		//Renders ReadingGoal
  		setAppState('updatingGoal');
  }

  //Handles streak resetting when app is first rendered (ONCE)
  useEffect(() => {
  	if(todayDate > latestDayRead){
  		setPagesReadToday(0);
  	}
  	if(todayDate > readByDate){
  		window.alert('You missed a day of reading, so your streak resets!');
  		setStreak(0);
  	}
  }, [todayDate, readByDate, latestDayRead])



  return (
    <div>
    	<h1>Bookworm</h1>
  		
  		<StreakView streak={streak} totalPages={totalPages} readingGoal={readingGoal} pagesReadToday={pagesReadToday}/>

  		<div>
  			{appState === 'start' && (<button onClick={onReadingUpdateClick}>Update read pages!</button>)}

  			{appState === 'updatingReading' && (<ReadingUpdater setAppState={setAppState} setStreak={setStreak} setTotalPages={setTotalPages} streak={streak} totalPages={totalPages} 
  			books={books} setBooks={setBooks} todayDate={todayDate} readByDate={readByDate} setReadByDate={setReadByDate} setLatestDayRead={setLatestDayRead} pagesReadToday={pagesReadToday} setPagesReadToday={setPagesReadToday} readingGoal={readingGoal}/>) }
  		</div>


  		<div>
  			{appState === 'start' && (<button onClick={onGoalUpdateClick}>Set reading goal!</button>)}

  			{appState === 'updatingGoal' && (<ReadingGoal readingGoal={readingGoal} setReadingGoal={setReadingGoal} setAppState={setAppState}/>)}
  		</div>


  		<Booklist books={books}/>

    </div>
  );
}

export default App;
