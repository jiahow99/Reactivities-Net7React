import React from 'react';
import './login.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';

export default observer(function HomePage() {
    const {userStore} = useStore();

    return (
        <div className="login-box">
            <Formik 
                initialValues={{email: '', password: ''}}
                onSubmit={(values, {setErrors, setFieldError}) => 
                    userStore.login(values)
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
      </div>
    )
})