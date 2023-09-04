import { useField } from 'formik';
import React from 'react';

interface Props {
    placeholder: string;
    name: string;
    label?: string;
}

export default function TextInput(props: Props) {
    const [field, meta] = useField(props);    
    
    return (
        <div>
            <label htmlFor="title">{props.label}</label>
            <input 
                className={`input-field ${meta.value ? 'bg-transparent border-2 border-tertiary-custom' : 'bg-gray-400 border-transparent' }`} 
                {...field} 
                {...props} 
                value={meta.value || ''}
            />

            { meta.touched && meta.error ? (
                <p className='ml-2 text-red-800 font-medium'>* {meta.error}</p>
            ) : null}
        </div>
    )
}