import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { slideIn, bringRegister } from '../animations';

import AuthForm from '../comp/AuthForm';

export default function Register() {
	const [ redirectPath, setRedirectPath ] = useState(null);

	useEffect(() => {
		bringRegister();
	}, []);

	function toLogin() {
		slideIn(() => setRedirectPath('/login'));
	}

	return (
		<React.Fragment>
			{redirectPath && <Redirect to={redirectPath} />}
			<div className='register'>
				<h2>
					Welcome to <span>todos</span>.
				</h2>
				<div className='register__wrapper'>
					<div className='register__left register__inner' onClick={toLogin}>
						<div>
							<h1>Already signed up?</h1>
							<p>
								Sign in <span>here</span>
							</p>
						</div>
					</div>
					<div className='register__divisor' />
					<div className='register__right--behind register__inner'>
						<div className='register__right--front'>
							<p>
								<span>Sign up</span> and forget about remembering!
							</p>
							<AuthForm type={'register'} />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
