// library imports
import React, { useState } from 'react';
import MaterialIcon from 'material-icons-react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// store imports
import { setToken$ } from '../store';
import { API_ROOT$ } from '../globals';

// component imports

export default function Form({ type }) {
	const [ user, setUser ] = useState({ email: '', password: '' });
	const [ redirectPath, setRedirectPath ] = useState(null);

	function sendFormValues(e) {
		e.preventDefault();
		axios
			.post(API_ROOT$ + type, user)
			.then(({ data }) => {
				if (type === 'auth') {
					setToken$(data.token);
					setRedirectPath('/');
				} else {
					axios.post(API_ROOT$ + 'auth', user).then(({ data }) => {
						setToken$(data.token);
						setRedirectPath('/');
					});
				}
			})
			.catch((error) => console.error(error));
	}

	function setFormValues(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	return (
		<React.Fragment>
			{redirectPath && <Redirect to={redirectPath} />}
			<form>
				<div>
					<MaterialIcon icon='alternate_email' size={22} />
					<div>
						<input
							id='email-input'
							type='email'
							name='email'
							value={user.email}
							onChange={setFormValues}
							autoComplete='off'
							placeholder='placeholder'
							required
						/>
						<label htmlFor='email-input'>
							<span>email</span>
						</label>
					</div>
				</div>
				<div>
					<MaterialIcon icon='vpn_key' size={22} />
					<div>
						<input
							id='password-input'
							type='password'
							name='password'
							value={user.password}
							onChange={setFormValues}
							autoComplete='off'
							placeholder='placeholder'
							required
						/>
						<label htmlFor='password-input'>
							<span>password</span>
						</label>
					</div>
				</div>
				<button type='submit' onClick={sendFormValues}>
					{type === 'auth' ? 'Sign in' : 'Submit'}
				</button>
			</form>
		</React.Fragment>
	);
}
