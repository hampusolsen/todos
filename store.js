import { BehaviorSubject } from 'rxjs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ROOT$ } from './globals';

export const token$ = new BehaviorSubject(localStorage.getItem('token'));

export function setToken$(token) {
	if (!token) {
		localStorage.removeItem('token');
	} else {
		localStorage.setItem('token', token);
	}

	token$.next(token);
}

export function useObservable$(observable) {
	const [ value, setValue ] = useState(observable.value);

	useEffect(
		() => {
			const subscription = observable.subscribe((newValue) => {
				setValue(newValue);
			});

			return () => subscription.unsubscribe();
		},
		[ observable ]
	);

	return value;
}

export const lists$ = new BehaviorSubject([]);

export function setLists$(_list, action) {
	switch (action) {
		case 'addItem':
			axios
				.delete(`${API_ROOT$}todos/${_list.id}`, { headers: { Authorization: `Bearer ${token$.value}` } })
				.then(() => {
					axios
						.post(
							`${API_ROOT$}todos`,
							{ content: JSON.stringify(_list) },
							{ headers: { Authorization: `Bearer ${token$.value}` } }
						)
						.then(({ data }) => {
							lists$.next([
								...lists$.value.filter(({ localId }) => localId !== _list.localId),
								{ ...JSON.parse(data.todo.content), id: data.todo.id }
							]);
						})
						.catch((error) => console.error(error));
				});
			break;

		case 'addList':
			axios
				.post(
					`${API_ROOT$}todos`,
					{ content: JSON.stringify(_list) },
					{ headers: { Authorization: `Bearer ${token$.value}` } }
				)
				.then(({ data }) => {
					axios.delete(`${API_ROOT$}todos/${data.todo.id}`, {
						headers: { Authorization: `Bearer ${token$.value}` }
					});

					axios
						.post(
							`${API_ROOT$}todos`,
							{ content: JSON.stringify({ ..._list, localId: data.todo.id }) },
							{ headers: { Authorization: `Bearer ${token$.value}` } }
						)
						.then(({ data }) => {
							lists$.next([ ...lists$.value, { ...JSON.parse(data.todo.content), id: data.todo.id } ]);
						});
				});
			break;

		case 'deleteItem':
			axios
				.delete(`${API_ROOT$}todos/${_list.id}`, { headers: { Authorization: `Bearer ${token$.value}` } })
				.then(() => {
					axios.post(`${API_ROOT$}todos`, { content: JSON.stringify(_list) }).then(() => {
						lists$.next([ lists$.value.filter(({ id }) => id !== _list.id) ]);
					});
				});
			break;

		case 'deleteList':
			axios
				.delete(`${API_ROOT$}todos/${_list.id}`, { headers: { Authorization: `Bearer ${token$.value}` } })
				.then(() => {
					lists$.next([ ...lists$.value.filter(({ id }) => id !== _list.id) ]);
				})
				.catch((error) => console.error(error));
			break;

		case 'init':
			lists$.next(_list);
			break;

		default:
			return;
	}
}
