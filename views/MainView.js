// library imports;
import React, { useEffect, useState } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';

// external .js imports (stores, animations...);
import { setToken$, token$, useObservable$, setLists$ } from '../store';
import { API_ROOT$ } from '../globals';

// component imports;
import Aside from '../comp/Aside';
import MainListView from './MainListView';
import NewListView from './NewListView';
import ListView from './ListView';

// non-state dependant functions;
function endSession() {
	setToken$(null);
}

// component declaration;
export default function Main() {
	// state declarations;
	const [ user, setUser ] = useState(null);
	const [ loading, setLoading ] = useState(true);

	// rxjs subscriptions;
	const _token = useObservable$(token$);

	// useEffect with _token dependancy, setting _token to 'null' on 401 error;
	useEffect(
		() => {
			axios
				.get(`${API_ROOT$}todos`, { headers: { Authorization: `Bearer ${_token}` } })
				.then(({ data }) => {
					setLists$(
						data.todos.map((list) => ({
							...JSON.parse(list.content),
							id: list.id
						})),
						'init'
					);
					setLoading(false);
					setUser(jwt.decode(_token).email);
				})
				.catch((error) => {
					console.error(error);
					setToken$(null);
				});
		},
		[ _token ]
	);

	return (
		<React.Fragment>
			{!_token && <Redirect to={'/login'} />}
			{loading ? (
				<p>loading...</p>
			) : (
				<div className='main'>
					<Aside user={user} endSession={endSession} />
					<section>
						<Switch>
							<Route path='/newList' component={NewListView} />
							<Route path='/listView/:id' component={ListView} />
							<Route path='/' component={MainListView} />
						</Switch>
					</section>
				</div>
			)}
		</React.Fragment>
	);
}
