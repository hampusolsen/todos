import React from 'react';

export default function Header() {
    return (
        <header>
            <div className="logo">
                <div className="logo__background"></div>
                <span className="logo__text">todos.</span>
            </div>
            <div className="tagline">
                <p>We keep track of the things you care about, so you can spend time doing them. <span>:wink:</span></p>
            </div>
        </header>
    )
};