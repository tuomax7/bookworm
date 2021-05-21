import React from 'react'

const StreakView = (props) => {

	return (
		<div>
			<h2>Streak: {props.streak} Total reading: {props.totalPages} pages</h2>

			{(isNaN(props.readingGoal) || props.readingGoal <= 0) && (<h3>Invalid reading goal page count!</h3>)}

			{(!isNaN(props.readingGoal) && props.readingGoal > 0) && (<h3>Current reading goal: {props.readingGoal} pages/day</h3>)}
			
			<h3>Read today: {props.pagesReadToday} pages</h3>
		</div>
	);
}

export default StreakView;