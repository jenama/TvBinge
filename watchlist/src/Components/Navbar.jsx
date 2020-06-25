import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>

            <nav>
                <h3>TV Watchlist</h3>
                <Link to='/'>Home</Link> {' '}
                <Link to='/users'>Users</Link> {' '}
                <Link to='/shows'>Shows</Link> {' '}
                <Link to='/add-show'>Add Show</Link> {' '}
                <Link to='/about'>About</Link>
            </nav>
        </div>
    )
}

export default Navbar;