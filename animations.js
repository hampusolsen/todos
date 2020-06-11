import gsap from 'gsap';

export function bringLogin() {
	gsap.to([ '.login__left > p', '.login__left > form' ], {
		duration: 0.3,
		delay: 0.1,
		opacity: 1
	});

	gsap.to('.login__right--front', {
		duration: 0.3,
		opacity: 1,
		y: '0px'
	});
}

export function bringRegister() {
	gsap.to([ '.register__right--front > p', '.register__right--front > form' ], {
		duration: 0.3,
		delay: 0.1,
		opacity: 1
	});

	gsap.to('.register__left > div', {
		duration: 0.3,
		opacity: 1,
		y: '0px'
	});
}

export function slideIn(cb) {
	gsap.to('.register__wrapper', {
		duration: 0.6,
		x: '400px',
		ease: 'power3.out',
		onComplete: cb
	});

	gsap.to('.register__right--front', {
		duration: 0.2,
		x: '-150px',
		opacity: 0
	});

	gsap.to('.register__left > div', {
		duration: 0.6,
		x: '-150px',
		opacity: 0,
		ease: 'power3.out'
	});
}

export function slideOut(cb) {
	gsap.to([ '.login__left > p', '.login__left > form' ], {
		duration: 0.2,
		x: '200px',
		opacity: 0
	});

	gsap.to('.login__wrapper', {
		duration: 0.6,
		x: '-400px',
		ease: 'power3.out'
	});

	gsap.to('.login__right--front', {
		duration: 0.6,
		x: '200px',
		opacity: 0,
		ease: 'power3.out',
		onComplete: cb
	});
}

export function logoutMenuIn() {
	gsap.to('.profile__logoutMenu', {
		duration: 0.3,
		height: '50px',
		ease: 'power3.out',
		display: 'block'
	});

	gsap.to('.profile__logoutMenu > button', {
		duration: 0.1,
		opacity: 1,
		delay: 0.1,
		ease: 'power3.out'
	});

	gsap.to('.profile__arrow', {
		duration: 0.3,
		y: '0%',
		scaleY: -1
	});
}

export function logoutMenuOut() {
	gsap.to('.profile__logoutMenu', {
		duration: 0.3,
		height: '0px',
		ease: 'power3.out',
		display: 'none'
	});

	gsap.to('.profile__logoutMenu > button', {
		duration: 0.1,
		opacity: 0,
		ease: 'power3.out'
	});

	gsap.to('.profile__arrow', {
		duration: 0.3,
		y: '50%',
		scaleY: 1
	});
}

export function listMenuIn() {
	gsap.to('.listMenu', {
		duration: 0.3,
		width: '200px',
		ease: 'power1.Out',
		display: 'block'
	});

	gsap.to('.listMenu > div', {
		duration: 0.2,
		delay: 0.23,
		opacity: 1,
		display: 'flex'
	});
}

export function listMenuOut() {
	gsap.to('.listMenu', {
		duration: 0.3,
		delay: 0.1,
		width: '0px',
		ease: 'power1.Out',
		display: 'none'
	});

	gsap.to('.listMenu > div', {
		duration: 0.15,
		opacity: 0,
		display: 'none'
	});
}

export function creationModalIn() {
	gsap.to('.creationModal', {
		duration: 0.4,
		display: 'block',
		opacity: '1',
		y: '0',
		ease: 'power3.out'
	});
}

export function creationModalOut(cb) {
	gsap.to('.creationModal', {
		duration: 0.4,
		opacity: '0',
		y: '50px',
		ease: 'power3.out',
		onComplete: cb
	});
}

export function carouselLeft() {
	gsap.to('.mainlistview__carousel', {
		duration: 0.3,
		x: '+=300px'
	});
}

export function carouselRight() {
	gsap.to('.mainlistview__carousel', {
		duration: 0.3,
		x: '-=300px'
	});
}
