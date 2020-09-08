import React from 'react';
import Link from './Link';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link href="/" className="item">
                Startsidan
            </Link>
            <Link href="search" className="item">
                Sök
            </Link>
            <Link href="add" className="item">
                Lägg till
            </Link>
        </div>
    );
};

export default Header;