// library imports
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

// store imports
import { slideOut, bringLogin } from '../animations';

// component imports
import AuthForm from '../comp/AuthForm';

export default function Login() {
	const [ redirectPath, setRedirectPath ] = useState(null);

	useEffect(() => {
		bringLogin();
	}, []);

	function toRegister() {
		slideOut(() => setRedirectPath('/register'));
	}

	return (
		<React.Fragment>
			{redirectPath && <Redirect to={redirectPath} />}
			<div className='login'>
				<h2>
					Welcome to <span>todos</span>.
				</h2>
				<div className='login__wrapper'>
					<div className='login__left login__inner'>
						<p>
							<span>Sign in</span> to access your todos!
						</p>
						<AuthForm type='auth' />
					</div>
					<div className='login__divisor' />
					<div className='login__right--behind login__inner' onClick={toRegister}>
						<div className='login__right--front'>
							<div>
								<h1>New user?</h1>
								<p>
									Sign up <span>here</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
