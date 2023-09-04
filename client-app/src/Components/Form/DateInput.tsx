import {  formatISO } from 'date-fns';
import { useField } from 'formik';
import React from 'react';
import DatePicker, {ReactDatePickerProps} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function DateInput(props: Partial<ReactDatePickerProps>) {
    const [field, meta, helpers] = useField(props.name!);    

    const formatDateForAPI = (date: Date) => {
        return formatISO(date);
    }
    
    return (
        <div>
            <DatePicker 
                {...field}
                {...props}
                className={`input-field bg-transparent border-white ${meta.value && 'border-tertiary-custom'}`}
                selected={field.value ? new Date(field.value) : null}
                onChange={value => helpers.setValue(formatDateForAPI(value!))}
                
            />


            { meta.touched && meta.error ? (
                <p className='ml-2 text-red-800 font-medium'>* {meta.error}</p>
            ) : null}
        </div>
    )
}