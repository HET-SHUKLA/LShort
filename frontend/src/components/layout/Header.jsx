import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <nav className='w-screen flex justify-between'>
            {/* <div>
                <img src="img" alt="Logo" />
            </div>

            <div>
                <Link to={'/short-url-click'}>
                    <button className='p-3 m-2 bg-gray-800 text-white rounded-md'>
                        URL Click counter
                    </button>
                </Link>

                <Link to={'/sign-up'}>
                    <button className='p-3 m-2 bg-gray-800 text-white rounded-md'>
                        Login / Register
                    </button>
                </Link>
            </div> */}
        </nav>
    );
}

export default Header;
