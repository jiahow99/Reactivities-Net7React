'use client'
import { useField } from 'formik';
import React, {useCallback, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'

export const Dropzone = () => {
    // Use field
    const [field, meta, helpers] = useField("images");

    // Create "preview" property on each file & Update formik "files" onDrop
    const onDrop = useCallback((acceptedFiles:any) => {
        const filesWithPreview = acceptedFiles.map((file: any) => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }));
        helpers.setValue([...field.value ,...filesWithPreview]);
      }, [])
    
    // UseDropzone
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    // Dispose of preview URLs when the component unmounts
    useEffect(() => {
      return () => {
          field.value.forEach((file: any) => URL.revokeObjectURL(file.preview));
      };
    }, [field.value]);

    return (
        <div {...getRootProps()} 
            className={`${isDragActive ? 'bg-black/50' : 'bg-white/50 '} flex justify-center items-center h-32 rounded-lg cursor-pointer hover:bg-black/50 border-2 border-transparent hover:border-secondary duration-200`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center">
              <p className='text-3xl'>+</p>
              <p>Drop {!isDragActive && 'Files Here'}</p>
            </div>
        </div>
    )
}
