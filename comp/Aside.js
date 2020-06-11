// library imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// external .js imports (stores, animations...);
import { logoutMenuIn, logoutMenuOut, listMenuIn, listMenuOut } from '../animations';
import { useObservable$, lists$ } from '../store';
import { findEmoji, findTheme } from '../globals';

// component-specific variables
const nav = [
	{
		title: 'Overview',
		path: '/'
	},
	{
		title: 'New TodoList',
		path: '/newList'
	}
];

export default function Aside({ user, endSession }) {
	const _lists = useObservable$(lists$);
	const [ showLogout, setShowLogout ] = useState(false);
	const [ showListMenu, setShowListMenu ] = useState(false);

	function toggleListMenu() {
		if (!showListMenu) listMenuIn();
		else listMenuOut();

		setShowListMenu(!showListMenu);
	}

	function toggleLogoutMenu() {
		if (!showLogout) logoutMenuIn();
		else logoutMenuOut();

		setShowLogout(!showLogout);
	}

	return (
		<aside>
			<div className='profile__wrapper'>
				<div className='profile' onClick={toggleLogoutMenu}>
					<div className='profile__image' />
					<div className='profile__name'>
						<h4>Logged in as:</h4>
						<p>{user}</p>
					</div>
					<div className='profile__arrow' />
				</div>
				<div className='profile__logoutMenu'>
					<button type='button' onClick={endSession}>
						Sign out
					</button>
				</div>
			</div>
			<nav className='mainMenu'>
				{nav.map((link, index) => (
					<Link key={index} to={link.path}>
						{link.title}
					</Link>
				))}
				<button
					type='button'
					onClick={toggleListMenu}
					style={showListMenu ? { backgroundColor: '#212121', borderColor: 'orange' } : {}}>
					View Lists
				</button>
			</nav>
			<nav className='listMenu'>
				{_lists.length === 0 ? (
					<div className='listMenu__noList'>
						<p>
							You currently do not have <br />any TodoList.
						</p>
					</div>
				) : (
					<div className='listMenu__list'>
						{_lists.map((list) => (
							<Link
								key={list.localId}
								to={`/listView/${list.localId}`}
								onClick={toggleListMenu}
								style={{
									borderColor: findTheme(list)
								}}>
								<p>
									<span>{findEmoji(list)}</span>
									{list.name + ` (${list.tasks.length})`}
								</p>
							</Link>
						))}
					</div>
				)}
			</nav>
		</aside>
	);
}
