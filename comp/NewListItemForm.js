import React, { useState } from 'react';

export default function NewListItemForm({ onSubmit, color }) {
	const [ task, setTask ] = useState('');

	return (
		<form onSubmit={onSubmit}>
			<div className='inputContainer'>
				<label htmlFor='content-input'>Task:</label>
				<input id='content-input' type='text' value={task} onChange={(e) => setTask(e.target.value)} />
			</div>
			<button type='submit' onClick={(e) => onSubmit(e, task)} style={{ backgroundColor: color }}>
				Submit
			</button>
		</form>
	);
}
