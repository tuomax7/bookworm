import React from 'react';

const ReadingGoal = (props) => {

	const setReadingGoalTry = () => {

		if(isNaN(props.readingGoal) || props.readingGoal <= 0){
			//Invalid reading goal page count
			window.alert('Invalid goal page count!')
			return;
		}
		props.setReadingGoal(Number(props.readingGoal));
		props.setAppState('start');
	}

	return(
		<div>
			<p>Input your reading goal as a number of pages/day read to maintain your reading streak:<input type='text' placeholder='pages/day...' 
			onChange={event => props.setReadingGoal(Number(event.target.value))} /></p>
			<button onClick={setReadingGoalTry}>Confirm new reading goal?</button>
		</div>
	)
}

export default ReadingGoal;