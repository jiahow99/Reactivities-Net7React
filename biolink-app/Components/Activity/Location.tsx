import { Field, useFormikContext } from 'formik';
import React, { useState } from 'react'

interface Props {
    handleDetail: (type: string) => void
}

const Location = ({handleDetail}: Props) => {    
    const { setFieldValue } = useFormikContext();

    // Update location details
    const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFieldValue(name ,value);        
    };

    
  return (
    <div className="border-t border-gray-500 pt-3 duration-200">
        <h1 className="text-center text-xl tracking-widest font-semibold">Location Details</h1>
        <div className="flex w-full gap-5 py-4 text-gray-300">
            <div className="flex flex-col w-6/12 gap-2">
                <label htmlFor="venue" className="font-medium tracking-wider">Venue</label>
                <Field name='venue' onChange={updateInput} placeholder="Enter your venue..." className="input text-sm"/>
            </div>

            <div className="flex flex-col w-6/12 gap-2">
                <label htmlFor="city" className="font-medium tracking-wider">City</label>
                <Field name='city' onChange={updateInput} placeholder="Enter your city..." className="input text-sm"/>
            </div>
        </div>
        <div className="flex justify-center">
            <button onClick={() => handleDetail("date")} className="create">Save</button>
        </div>
    </div>

  )
}

export default Location 