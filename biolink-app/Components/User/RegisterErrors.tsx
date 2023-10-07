
interface Props {
    message: string;
}


export default function RegisterErrors ({message}: Props) {   
    return (
        <div className='text-red-400 tracking-wide'>
            <p>{message}</p>
        </div>
        
        
    )
}