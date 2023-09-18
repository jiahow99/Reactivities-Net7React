'use client'

import Image from "next/image";
import { Dropzone } from "./Dropzone";
import React, { useEffect } from "react";

interface Props {
  setFiles: (files:any) => void;
  files: any;
}

export const PhotoUpload = ({setFiles, files}: Props) => {

  useEffect(() => {
    const _initTE = async () => {
      const use = (await import('tw-elements')).initTE;
      const { Lightbox } = await import('tw-elements');
      use({ Lightbox });
    };
    _initTE();
  }, []);

  
  return (
    <div 
      data-te-lightbox-init
      className="grid grid-cols-3 gap-2 items-center"
    >
      <Dropzone setFiles={setFiles} />

      {files && files.length > 0 && files.map((file: any) => (
        <Image key={file.preview}
          data-te-img={file.preview}
          src={file.preview}
          width={500}
          height={500}
          alt={"upload-image"}
          className="cursor-zoom-in data-[te-lightbox-disabled]:cursor-auto"
        />
      ))}

      
    </div>
  )
}
