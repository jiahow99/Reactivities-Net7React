'use client'

import { UploadPhoto } from '@/Components/User/PhotoUpload/UploadPhoto';
import CustomizePhoto from '@/Components/User/YourDetails/CustomizePhoto';
import YourDetails from '@/Components/User/YourDetails/YourDetails';
import { UpdateErrors } from '@/models/Errors';
import { DetailsForm, User } from '@/models/User';
import userStore from '@/stores/UserStore';
import { Form, Formik, FormikHelpers } from 'formik';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const page = () => {
  const { updateUser } = userStore;

  // States
  const [uploadOpen, setUploadOpen] = useState(false);
  
  // Active user
  const { data, status, update } = useSession();
  const activeUser = data?.user as User;

  if (status === 'unauthenticated') redirect('/');

  // Handle Update
  const handleUpdate = async (values: DetailsForm, {setErrors}:FormikHelpers<DetailsForm>) => {
    // No token... login again
    if (!activeUser.token) {
      signOut();
      return ;
    }

    const loadingToast = toast.loading("Updating your info");

    // Call API
    const response = await updateUser(values, activeUser.token);

    // Fail... set error message     
    if (!response.ok) {
      const errors: any = await response.json();
      for (const key in errors) {
        errors[key] = errors[key].toString();
      }
      setErrors(errors);

      toast.dismiss(loadingToast);
      toast.error("Please check on error messages");

      console.log(response);
      return ;
    }

    // Success... update user    
    const updatedUser: User = await response.json();
    updatedUser.token = activeUser.token;
    update({
      ...data,
      user: {
        ...updatedUser
      }
    });

    toast.dismiss(loadingToast);
    toast.success("You are successfully updated.");
  }

  // Validation Scheme
  const validationScheme = Yup.object({
    email: Yup.string().required(),
    username: Yup.string().required(),
    displayName: Yup.string(),
    phoneNumber: Yup.string().nullable(),
  })

  return (
    <>
      <Formik 
        initialValues={new DetailsForm(activeUser)} 
        onSubmit={handleUpdate}
        validationSchema={validationScheme}
      >
        {({values:user, handleSubmit}) => (
          <Form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col lg:flex-row gap-5 my-10">
              <CustomizePhoto imageUrl={activeUser.image} setUploadOpen={setUploadOpen} />
              <YourDetails user={user} />
            </div>
          </Form>
        )}
      </Formik>

      {uploadOpen && 
      <UploadPhoto setUploadOpen={setUploadOpen} />
      }
    </>
  )
}

export default page