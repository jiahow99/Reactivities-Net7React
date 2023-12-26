'use client'
import { ErrorMessage } from "@/Components/ErrorMessage"
import { poppins } from "@/font/Poppins"
import { useField } from "formik"

interface Props {
    label: string
    value?: string | number
    name: string
    type: string
    placeholder?: string
}

const DetailsInput = ({ label, ...props }: Props) => {
    const [field, meta, helper] = useField(props.name);

    return (
        <>
            <p className={`${poppins.className} tracking-wider`}>{label}</p>
            <input {...field} {...props} className='details-input' />

            {meta.error &&
                <ErrorMessage error={meta.error} />
            }
        </>
    )
}

export default DetailsInput