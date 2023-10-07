'use client'
import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';
import { LoginForm, RegisterForm, User } from '@/models/User';
import userStore from '@/stores/UserStore';
import { useRouter } from 'next/navigation';
import { Loader, X } from 'react-feather';
import RegisterErrors from './RegisterErrors';
import { CSSTransition } from 'react-transition-group';
import { signIn } from 'next-auth/react';

export default observer(function HomePage() {
    
    const [mode, setMode] = useState('login');
    const {modalOpen, closeModal, register} = userStore;
    
    // useRouter
    const router = useRouter();

    // Register form 
    const registerForm : RegisterForm = new RegisterForm();

    // Yup
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

    // Login
    const handleLogin = async (values: LoginForm, {setFieldError}:FormikHelpers<any>) => {
        // Call API
        const response = await signIn('credentials', {
            ...values,
            redirect: false
        });

        // Fail login, show error message
        if (response?.error) {
            setFieldError('email', response?.error);
            return ;            
        }

        // Login successful, close modal
        closeModal();        
    }

    // Register
    const handleRegister = async (values: RegisterForm, {setFieldError}:FormikHelpers<any>) => {
        // Call API to create user
        const response = await fetch(process.env.NEXT_PUBLIC_API_PREFIX + '/account/register', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(values)
        })

        // Success
        if(!response.ok) {
            const error = await response.json();
            if (error.errors.email) {
                setFieldError('apiError', error.errors.email[0])
            }
            if (error.errors.username) {
                setFieldError('apiError', error.errors.username[0])
            }
            return ;
        }

        // Sign in user  
        const signInResponse = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
        })

        // Show error 
        if (signInResponse?.error) {
            setFieldError('apiError', signInResponse.error)
        }

        closeModal();
    }
   

    
return (
    <CSSTransition
            in={modalOpen}
            classNames='fade'
            timeout={300}
            unmountOnExit
    >
        <div className="fixed w-screen h-screen z-50 flex justify-center items-center bg-black/70 backdrop-blur-sm">
            <div onClick={closeModal} className="close absolute top-10 right-20 cursor-pointer">
                <X width={30} height={30} />
            </div>
            
            {mode === 'login' && 
            <div className="login login-box">
                <h1 className='text-center text-2xl font-medium mb-10'>Login</h1>
                <Formik 
                    initialValues={new LoginForm()}
                    onSubmit={handleLogin}
                >
                    {({isSubmitting, errors, isValid, dirty,}) => (
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
                            <div className="flex justify-center items-center gap-2">
                                <button type='submit' className='px-10 py-3' disabled={!isValid && !dirty}>
                                        Login
                                    <span></span>
                                </button>
                                {isSubmitting && <Loader className='animate-spin' />}
                            </div>
                        </Form>
                    )}
                </Formik>

                <div className="flex justify-end items-center my-2 text-sm">
                    <p>Dont have an account ? 
                        <span onClick={() => setMode('register')} className='underline ml-2 text-tertiary-custom cursor-pointer'>
                            Register
                        </span>
                    </p>
                </div>
                <div className="text-center my-5">OR</div>
                {/* <div onClick={() => signIn('google')} className="w-full bg-transparent duration-200" >
                    <div className="w-full rounded-md px-8 py-2 flex justify-between items-center mx-auto bg-white text-black font-medium hover:bg-transparent hover:text-white duration-200 cursor-pointer border-2 border-white">
                        <Image src={'/google.svg'} width={30} height={30} alt='google' />
                        <p>Sign in with Google</p>
                    </div>
                </div> */}

            </div>}
            

            {mode === 'register' && 
            <div className="register login-box">
            <h1 className='text-center text-2xl font-medium mb-10'>Register</h1>
            <Formik 
                initialValues={registerForm}
                validationSchema={registerValidation}
                onSubmit={handleRegister}
            >
                {({isSubmitting, isValid, dirty}) => (
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

                        <ErrorMessage name="apiError" render={(msg: any) => <RegisterErrors message={msg} />} />
                        
                        <div className="flex justify-center items-center gap-2">
                            <button type='submit' className='px-10 py-3' disabled={!isValid && !dirty}>
                                    SEND
                                <span></span>
                            </button>
                            {isSubmitting && <Loader className='animate-spin' />}
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="flex justify-end items-center my-2 text-sm">
                <p>Already have acount ? 
                    <span onClick={() => setMode('login')} className='underline ml-2 text-tertiary-custom cursor-pointer'>
                        Login
                    </span>
                </p>
            </div>
        </div>}
            
    </div>
</CSSTransition>
)
})