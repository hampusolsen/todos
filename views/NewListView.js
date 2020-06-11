// library imports
import React, { useEffect, useState } from 'react';

// store imports
import { setLists$, lists$, useObservable$ } from '../store';

// animation imports
import { creationModalIn, creationModalOut } from '../animations';

// component imports
import NewListForm from '../comp/NewListForm';

const maxListsAmount = 10;

export default function NewListView() {
	const _lists = useObservable$(lists$);
	const [ modal, setModal ] = useState(false);
	const [ list, setList ] = useState({
		name: '',
		category: 'uncategorized',
		created: new Date().toLocaleDateString().replace(/\//g, '-'),
		due: '',
		tasks: []
	});

	useEffect(
		() => {
			if (!document.querySelector('.creationModal')) return;

			if (modal) {
				creationModalIn();
			} else {
				creationModalOut();
			}
		},
		[ modal ]
	);

	function submitList(e) {
		e.preventDefault();

		if (_lists.length >= 10) {
			setModal(true);
			return;
		}

		setModal(true);
		setLists$(list, 'addList');
		setList({
			name: '',
			category: 'uncategorized',
			created: new Date().toLocaleDateString(),
			due: '',
			tasks: []
		});
	}

	return (
		<React.Fragment>
			{modal && (
				<div className='creationModal' onClick={() => creationModalOut(() => setModal(false))}>
					<h1>!</h1>
					<p>{_lists.length < 10 ? 'Successfully created list.' : 'Max lists amount reached.'}</p>
				</div>
			)}
			<div className='newListView'>
				<div className='newListView__listCounter'>
					<h5>Lists used:</h5>{' '}
					<p>
						<span>{_lists.length}</span> / {maxListsAmount}
					</p>
				</div>
				<div className='card newList'>
					<div className='card__header'>
						<h2>Create TodoList</h2>
					</div>
					<div className='card__content'>
						<NewListForm
							list={list}
							submitList={submitList}
							changeList={(prop, value) => setList({ ...list, [prop]: value })}
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
