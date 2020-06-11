import React, { useState } from 'react';
import MaterialIcon from 'material-icons-react';
import { Redirect } from 'react-router-dom';
import { useObservable$, lists$, setLists$ } from '../store';
import { findTheme, findEmoji } from '../globals';
import NewListItemForm from '../comp/NewListItemForm';
import { useEffect } from 'react';

export default function ListView({ match }) {
	const lists = useObservable$(lists$);
	const [ activeMenu, setActiveMenu ] = useState('');
	const [ shouldRedirect, setShouldRedirect ] = useState(false);
	const [ list, setList ] = useState(lists.find(({ localId }) => localId === match.params.id));

	useEffect(
		() => {
			setList(lists.find(({ localId }) => localId === match.params.id));
		},
		[ lists, match.params.id ]
	);

	const themeColor = findTheme(list);

	function addListItem(e, content) {
		e.preventDefault();
		const newList = { ...list, tasks: [ ...list.tasks, { content, checked: false } ] };

		setLists$(newList, 'addItem');
		setActiveMenu('');
	}

	function clearCheckedTasks() {
		const tasks = list.tasks.filter(({ checked }) => !checked);

		setLists$({ ...list, tasks }, 'addItem');

		setActiveMenu('');
	}

	function deleteList() {
		setLists$(list, 'deleteList');
		setShouldRedirect(true);
	}

	function toggleTask(_content) {
		const tasks = [ ...list.tasks ];
		const task = tasks.find(({ content }) => content === _content);

		tasks.splice(list.tasks.findIndex(({ content }) => content === _content), 1, {
			...task,
			checked: !task.checked
		});

		setList({ ...list, tasks });
	}

	return (
		<div className='pageview listview'>
			{shouldRedirect === true && <Redirect to='/' />}
			{activeMenu === 'add' && (
				<div className='dialogue'>
					<NewListItemForm onSubmit={addListItem} color={themeColor} />
				</div>
			)}
			{activeMenu === 'delete' && (
				<div className='dialogue'>
					<p>Delete list?</p>
					<button type='button' style={{ backgroundColor: themeColor }} onClick={deleteList}>
						Confirm
					</button>
				</div>
			)}
			{activeMenu === 'clear' && (
				<div className='dialogue'>
					<p>Clear checked items from list?</p>
					<button type='button' style={{ backgroundColor: themeColor }} onClick={() => clearCheckedTasks()}>
						Confirm
					</button>
				</div>
			)}
			<div className='card'>
				<div className='card__header' style={{ backgroundColor: themeColor }}>
					<h2>{list.name}</h2>
					<span className='card__emoji'>{findEmoji(list)}</span>
				</div>
				<div className='card__content'>
					<span className='dueDate'>{list.due ? `Due: ${list.due}` : ''}</span>
					<div className='tasks'>
						<h5>Tasks:</h5>
						<ul>
							{list.tasks.map((task, index) => (
								<li key={index} onClick={() => toggleTask(task.content)}>
									{task.content}
									{task.checked && <MaterialIcon icon='done' />}
								</li>
							))}
						</ul>
					</div>
				</div>
				<nav>
					<button
						type='button'
						onClick={() => setActiveMenu('delete' === activeMenu ? '' : 'delete')}
						style={{ backgroundColor: themeColor }}>
						<MaterialIcon icon='delete_forever' color='#fff' />
					</button>
					<button
						type='button'
						onClick={() => setActiveMenu('clear' === activeMenu ? '' : 'clear')}
						style={{ backgroundColor: themeColor }}>
						<MaterialIcon icon='done_all' color='#fff' />
					</button>
					<button
						type='button'
						onClick={() => setActiveMenu('add' === activeMenu ? '' : 'add')}
						style={{ backgroundColor: themeColor }}>
						+
					</button>
				</nav>
			</div>
		</div>
	);
}
