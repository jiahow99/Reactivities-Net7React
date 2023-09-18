import { useField } from 'formik';
import React, { useState } from 'react'

interface Props {
    handleDetail: (type: string) => void
}

const Location = ({handleDetail}: Props) => {    
    const [venueInput] = useField('venue'); // Access Formik field for 'venue'
    const [cityInput] = useField('city');   // Access Formik field for 'city'

    // Update location details
    const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        switch (name) {
            case "venue":
                venueInput.onChange(event); // Update 'venue' field
                break;
            case "city":
                cityInput.onChange(event);  // Update 'city' field
                break;
        }
    };

    
  return (
    <div className="border-t border-gray-500 pt-3 duration-200">
        <h1 className="text-center text-xl tracking-widest font-semibold">Location Details</h1>
        <div className="flex w-full gap-5 py-4 text-gray-300">
            <div className="flex flex-col w-6/12 gap-2">
                <label htmlFor="venue" className="font-medium tracking-wider">Venue</label>
                <input onChange={updateInput} placeholder="Enter your text..." className="input text-sm" name="venue" type="text"></input>
            </div>

            <div className="flex flex-col w-6/12 gap-2">
                <label htmlFor="venue" className="font-medium tracking-wider">City</label>
                <input onChange={updateInput} placeholder="Enter your text..." className="input text-sm" name="city" type="text"></input>
            </div>
        </div>
        <div className="flex justify-center">
            <button onClick={() => handleDetail("date")} className="create">Save</button>
        </div>
    </div>

  )
}

export default Location 