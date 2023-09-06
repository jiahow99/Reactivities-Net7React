import React from 'react';
import '../app/layouts/styles.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useStore } from '../app/stores/store';
import { observer } from 'mobx-react-lite';
import UserDropdown from './Navbar/UserDropdown';


export default observer(function Navbar() {
    const {userStore} = useStore();
    const {user, isLoggedIn} = userStore;

    const location = useLocation();    
    const {pathname} = location;
    
    return (
        <nav className='navbar w-full text-white'>
            <div className="w-9/12 mx-auto py-4 flex justify-between items-center">
                <div className='flex items-center gap-10'>
                    <div className="logo">
                        <h2 className='text-2xl font-medium'>Reactivities</h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <NavLink to='/' className='text-lg h-fit p-0 m-0 px-5 font-medium'>
                            Home
                        </NavLink>
                        <NavLink to='/activities' className='text-lg h-fit p-0 m-0 px-5 font-medium '>
                            Activities
                        </NavLink>
                    </div>
                </div>
                <div className='flex items-center gap-10'>
                    <NavLink to='/create-activity' className='font-medium px-5 py-3 rounded-xl bg-purple-500 text-white'>
                        Add Activities
                    </NavLink>

                    {isLoggedIn && user && <UserDropdown />}
                    
                    {!isLoggedIn && !user && pathname !== '/login' && (
                        <Link to='/login' className='px-10 py-2 btn-secondary font-medium'>Login</Link>
                    )}
                    
                </div>
            </div>
        </nav>
    )
})