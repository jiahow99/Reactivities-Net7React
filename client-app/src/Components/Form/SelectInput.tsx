import { useField } from 'formik';
import React, { useEffect, useRef } from 'react';
import { categoryOptions } from '../../app/options/CategoryOptions';
import { Select, initTE } from "tw-elements";


interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}

export default function SelectInput(props: Props) {
    const [field, meta, helpers] = useField(props);
    
    useEffect(() => {
        // Initialize TW Select if havent initialized yet
        if(!Select.getInstance(document.getElementById('category'))) {
            const category = new Select(document.getElementById("category"));
        }
    }, []);     
    
    
    return (
        <select 
            id='category'
            data-te-select-init 
            data-te-select-clear-button="true"
            {...props} 
            {...field}
        >
            <option value='null'>Choose a category</option>

            {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.text}
                </option>
            ))}
        </select>
    )
}