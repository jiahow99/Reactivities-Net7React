'use client'
import React, { useCallback, useRef, useState } from "react"
import "cropperjs/dist/cropper.css";
import {  X } from "react-feather";
import { CropperComponent } from "./CropperComponent";
import { DropzoneComponent } from "./DropzoneComponent";
import { BackButton } from "./BackButton";
import Loading from "@/Components/Loading";
import userStore from "@/stores/UserStore";

interface Props {
    setUploadOpen: (value: boolean) => void
}

export const UploadPhoto = ({ setUploadOpen }: Props) => {
    // States
    const [preview, setPreview] = useState<string>();

    return (
        <>
        <div className="fixed top-0 left-0 w-full h-screen bg-black/30 backdrop-blur-sm z-40 flex flex-col justify-center items-center">
            {/* Close button */}
            <div className="absolute top-10 right-20">
                <X onClick={() => setUploadOpen(false)} className="scale-150 cursor-pointer" />
            </div>

            {/* Back button */}
            {preview &&
            <BackButton setPreview={setPreview} />
            }
            
            {/* Dropzone */}
            {!preview &&
            <DropzoneComponent setPreview={setPreview} /> 
            }
            
            {/* Cropper */}
            {preview && 
            <CropperComponent preview={preview} setUploadOpen={setUploadOpen} />
            }
        </div>
        </>
    )
}

