import React, { useState } from 'react';
import './login.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AxiosError } from 'axios';

export default observer(function HomePage() {
    const {userStore, modalStore} = useStore();
    const {login, register} = userStore;

    const [mode, setMode] = useState('register');

    const navigate = useNavigate();

    const registerForm = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        displayName: '',
        error: null,
    };

    const registerValidation = Yup.object({
        email: Yup.string().email().required(),
        username: Yup.string().required(),
        password: Yup.string().required().matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/,
            'At least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character, minimum 8 character.'
        ),
        confirmPassword: Yup.string().required().oneOf([Yup.ref('password')], 'Your passwords do not match.'),
        displayName: Yup.string(),
    })

    
    return (
        <div className="fixed w-screen h-screen z-50 flex justify-center items-center bg-black/70 backdrop-blur-sm">
            <div onClick={() => modalStore.closeModal()} className="close absolute top-10 right-20 cursor-pointer">
                <i className="fa-solid fa-xmark text-3xl"></i>
            </div>
            
            {mode === 'login' && 
            <div className="login login-box">
                <h1 className='text-center text-2xl font-medium mb-10'>Login</h1>
                <Formik 
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values, {setErrors, setFieldError}) => 
                        login(values)
                            .then(() => navigate('/activities'))
                            .catch(error => setFieldError('email', error.response.data))
                        }
                >
                    {({isSubmitting, errors}) => (
                        <Form>
                            <div className="user-box">
                                <Field type="email" name='email' required className='focus:ring-0' />
                                <label>Email</label>
                            </div>
                            <div className="user-box">
                                <Field type="password" name='password' required className='focus:ring-0' />
                                <label>Password</label>
                            </div>
                            {errors.email && <p className='mb-5 text-red-500 '>
                                **<ErrorMessage name="email" />
                            </p>}
                            <center>
                                <button type='submit' className='px-10 py-3'>
                                        SEND
                                    <span></span>
                                    {isSubmitting && <i className="fa-solid fa-circle-notch ml-2 animate-spin"></i>}
                                </button>
                            </center>
                        </Form>
                    )}
                </Formik>
            </div>}
            

            {mode === 'register' && 
            <div className="register login-box">
            <h1 className='text-center text-2xl font-medium mb-10'>Register</h1>
            <Formik 
                initialValues={registerForm}
                validationSchema={registerValidation}
                onSubmit={(values, {setErrors, setFieldError}) => 
                    register(values)
                        .then(() => navigate('/activities'))
                        .catch(error => setFieldError('error', error.response.data))
                    }
            >
                {({isSubmitting, errors}) => (
                    <Form>
                        <div className="user-box">
                            <Field type="text" name='username' required className='focus:ring-0' />
                            <label>Username</label>
                        </div>
                        <p className="text-sm text-red-400">
                            <ErrorMessage name="username" />
                        </p>

                        <div className="user-box">
                            <Field type="email" name='email' required className='focus:ring-0' />
                            <label>Email</label>
                        </div>
                        <p className="text-sm text-red-400">
                            <ErrorMessage name="email" />
                        </p>

                        <div className="user-box">
                            <Field type="password" name='password' required className='focus:ring-0' />
                            <label>Password</label>
                        </div>
                        <p className="text-sm text-red-400">
                            <ErrorMessage name="password" />
                        </p>

                        <div className="user-box">
                            <Field type="password" name='confirmPassword' required className='focus:ring-0' />
                            <label>Confirm Password</label>
                        </div>
                        <p className="text-sm text-red-400">
                            <ErrorMessage name="confirmPassword" />
                        </p>
                        
                        <div className="user-box">
                            <Field type="text" name='displayName' className='focus:ring-0' />
                            <label>Display name (optional)</label>
                        </div>
                        <p className="text-sm text-red-400">
                            <ErrorMessage name="displayName" />
                        </p>
                        
                        <center>
                            <button type='submit' className='px-10 py-3'>
                                    SEND
                                <span></span>
                                {isSubmitting && <i className="fa-solid fa-circle-notch ml-2 animate-spin"></i>}
                            </button>
                        </center>
                    </Form>
                )}
            </Formik>
        </div>}
            
        </div>
    )
})