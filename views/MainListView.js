import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { useObservable$, lists$ } from '../store';
import { findTheme, findEmoji } from '../globals';
import { carouselLeft, carouselRight } from '../animations';

export default function MainListView() {
	const _lists = useObservable$(lists$);
	const [ path, setPath ] = useState('');

	return (
		<div className='pageview mainlistview'>
			{_lists.length === 0 ? (
				<div className='empty'>
					<h1>Echo!</h1>
					<p>It's sure is empty in here... Don't you have anything</p>
					<Link to='/newList'>todo?</Link>
				</div>
			) : (
				<React.Fragment>
					<div className='mainlistview__left' onClick={() => carouselLeft()}>
						<div className='arrow arrow__left' />
					</div>
					<div className='mainlistview__carousel'>
						{path && <Redirect to={`/listView/${path}`} />}
						{_lists.map((list) => (
							<div
								key={list.localId}
								className='card mainlistview__card'
								onClick={() => setPath(list.localId)}>
								<div className='card__header' style={{ backgroundColor: findTheme(list) }}>
									<h2>{list.name}</h2>
									<span className='card__emoji'>{findEmoji(list)}</span>
								</div>
								<div className='card__content'>
									<ul>{list.tasks.map(({ content }) => <li key={content}>{content}</li>)}</ul>
								</div>
							</div>
						))}
					</div>
					<div className='mainlistview__right' onClick={() => carouselRight()}>
						<div className='arrow arrow__right' />
					</div>
				</React.Fragment>
			)}
		</div>
	);
}
