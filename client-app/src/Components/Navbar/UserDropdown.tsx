import React from 'react';
import { useStore } from '../../app/stores/store';
import { useNavigate } from 'react-router-dom';

export default function UserDropdown() {
    const {userStore} = useStore();
    const {logout, username} = userStore;
    
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove jwt token
        logout();
        // Redirect back to home
        navigate('/');
    }
    
    return (
        <div className="flex gap-2 items-center relative group z-40">
            <img src="https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png" className='w-8 h-8 rounded-full object-cover' alt="profile-pic" />
            <p className='font-medium'>{ username }</p>
            <i className="fa-solid fa-sort-down pb-2"></i>

            <div className="absolute right-1/2 translate-x-1/2 top-full bg-black/40 backdrop-blur-sm w-32 rounded-md overflow-hidden hidden group-hover:block hover:block">
                <button className='w-full text-right pr-5 py-2 hover:bg-black'>
                    Profile
                </button>
                <button onClick={handleLogout} className='w-full text-right pr-5 py-2 hover:bg-black'>
                    Logout
                </button>
            </div>
        </div>
    )
}