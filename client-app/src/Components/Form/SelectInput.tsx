import { useField } from 'formik';
import React, { useEffect } from 'react';
import { Select, initTE } from "tw-elements";
import { categoryOptions } from '../../app/options/CategoryOptions';


interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}

export default function SelectInput(props: Props) {
    initTE({ Select });
    const [field, meta, helpers] = useField(props);   
          
    return (
        <select 
            id='category'
            data-te-select-init 
            data-te-select-clear-button="true"
            // data-te-selectplaceholder="Choose a category"
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