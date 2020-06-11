import React from 'react';

import { categories$ } from '../globals';

export default function NewListForm({ list, changeList, submitList }) {
	function onChange(e) {
		changeList(e.target.name, e.target.value);
	}

	return (
		<form onSubmit={(e) => submitList(e)}>
			<div className='inputContainer'>
				<label htmlFor='name-input'>Title:</label>
				<input type='text' id='name-input' name='name' value={list.name} onChange={onChange} required />
			</div>
			<div className='inputContainer'>
				<label htmlFor='category-input'>Category:</label>
				<select id='category-input' name='category' value={list.category} onChange={onChange}>
					{categories$.map(({ category, theme }) => (
						<option key={category} value={category.toLowerCase()} style={{ color: theme }}>
							{category}
						</option>
					))}
				</select>
			</div>
			<div className='inputContainer'>
				<label htmlFor='due-input'>Due:</label>
				<input type='date' id='due-input' name='due' value={list.due} onChange={onChange} />
			</div>
			<div className='buttonContainer'>
				<button type='submit' onClick={(e) => submitList(e)}>
					Submit
				</button>
				<button type='reset'>Reset</button>
			</div>
		</form>
	);
}
