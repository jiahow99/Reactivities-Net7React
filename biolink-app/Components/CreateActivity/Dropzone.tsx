import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

interface Props {
    setFiles: (files:any) => void;
}

export const Dropzone = ({setFiles}: Props) => {
    const onDrop = useCallback((acceptedFiles:any) => {
        // Create preview property
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
        // console.log(acceptedFiles.map((file: any) => Object.assign(file, {
        //     preview: URL.createObjectURL(file)
        //   })));
        
      }, [setFiles])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} 
            className={`${isDragActive ? 'bg-black/50' : 'bg-white/50 '} border-2 flex justify-center items-center h-32 rounded-lg cursor-pointer hover:bg-black/50 duration-200`}>
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center">
            <p className='text-3xl'>+</p>
            <p>Drop {!isDragActive && 'Files Here'}</p>
            </div>
        </div>
    )
}
