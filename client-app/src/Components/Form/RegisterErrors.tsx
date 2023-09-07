import React from 'react';

interface Props {
    message: object | null;
}


export default function RegisterErrors ({message}: Props) {
    let errors: [string,string][] = [];

    if (typeof message === 'object') {
        errors = Object.entries(message!);
    }
    
    return (
        <div className='text-red-400 tracking-wide'>
            {errors.map(([key,value]: [string,string], index:number) => (
                <p key={key}>{value}</p>
            ) )}
        </div>
        
        
    )
}