import React, { Suspense } from 'react';
// import Spline from '@splinetool/react-spline';
import { Link } from 'react-router-dom';
import { useStore } from '../../app/stores/store';

const Spline = React.lazy(() => import('@splinetool/react-spline'));


export default function HomePage() {
    const {userStore, modalStore} = useStore();
    const {isLoggedIn} = userStore;

    return (
        <div className='relative'>
            <Suspense fallback={<div>Loading...</div>}>
                <Spline scene="https://prod.spline.design/jwkB9X0DsasKMI7u/scene.splinecode" />
            </Suspense>

            <div className='absolute top-[70vh] w-full flex flex-col justify-center items-center'>
                <div className='flex gap-2 text-2xl'>
                    <h1>Welcome to</h1>
                    <h1 className='font-bold'>Reactivities</h1>
                </div>
                {!isLoggedIn ? 
                (
                    <button onClick={() => modalStore.openModal()} className='btn-secondary px-5 py-1 text-xl mt-5 '>
                        Login
                    </button>
                ) : 
                (
                    <Link to='/activities' className='btn-secondary px-5 py-1 text-xl mt-5 '>
                        Take me to Activities
                    </Link>
                )}
                
                
            </div>
        </div>
    )
}