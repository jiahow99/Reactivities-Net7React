'use client'

import Image from "next/image";
import { Dropzone } from "./Dropzone";
import React, { useEffect } from "react";
import { useField } from "formik";
import { Trash } from "react-feather";

interface Props {
  setFiles: (files:any) => void;
}

export const PhotoUpload = ({setFiles}: Props) => {
  const [field, meta, helpers] = useField("images");
  const {value} = meta;
  const {setValue} = helpers;

  // Init TE
  useEffect(() => {
    const _initTE = async () => {
      const use = (await import('tw-elements')).initTE;
      const { Lightbox } = await import('tw-elements');
      use({ Lightbox });
    };
    _initTE();
  }, []);

  // Remove image 
  const handleDelete = (path: string) => {
    setValue(value.filter((file: any) => file.path !== path));
  }

  return (
    <div 
      data-te-lightbox-init
      className="grid grid-cols-3 gap-2 items-center mt-2 border-[3px] rounded-lg p-3"
    >
      <Dropzone />

      {meta.value && meta.value.length > 0 && meta.value.map((file: any) => (
        <div className="relative">
          <div className="absolute top-0 right-0 bg-black/50 backdrop-blur-sm p-3 rounded-full cursor-pointer group">
            <Trash onClick={() => handleDelete(file.path)} className="group-hover:text-red-400 duration-200" />
          </div>
          <Image key={file.preview}
            data-te-img={file.preview}
            src={file.preview}
            width={500}
            height={500}
            alt={"upload-image"}
            className="cursor-zoom-in data-[te-lightbox-disabled]:cursor-auto"
          />
        </div>
      ))}

      
    </div>
  )
}
