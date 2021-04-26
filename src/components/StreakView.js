import React from 'react'

const StreakView = (props) => {

	return (
		<div>
			<h2>Streak: {props.streak} Total reading: {props.totalPages} pages</h2>
		</div>
	);
}

export default StreakView