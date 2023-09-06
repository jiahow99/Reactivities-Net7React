import React from 'react';
import './login.css';
import { Field, Form, Formik } from 'formik';

export default function HomePage() {
    return (
        <div className="login-box">
            <Formik 
                initialValues={{email: '', password: ''}}
                onSubmit={values => console.log(values)}
            >
                {({handleSubmit}) => (
                    <Form>
                        <div className="user-box">
                            <Field type="text" name='email' required className='focus:ring-0' />
                            <label>Username</label>
                        </div>
                        <div className="user-box">
                            <Field type="password" name='password' required className='focus:ring-0' />
                            <label>Password</label>
                        </div>
                        <center>
                            <button type='submit' className='px-10 py-3'>
                                    SEND
                                <span></span>
                            </button>
                        </center>
                    </Form>
                )}
            </Formik>
      </div>
    )
}