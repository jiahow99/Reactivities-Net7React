'use client'
import { User } from "@/models/User";
import userStore from "@/stores/UserStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import toast from 'react-hot-toast';
import { useDebouncedCallback } from "use-debounce";

interface Props {
  preview: string
  setUploadOpen: (value: boolean) => void
}


export const CropperComponent = ({ preview, setUploadOpen }: Props) => {
  // Active user
  const { data, update } = useSession();
  const user = data?.user as User;

  // use Router
  const router = useRouter();
  
  // Ref
  const cropperRef = useRef<ReactCropperElement>(null);

  // States
  const [userBlob, setUserBlob] = useState<Blob>()

  const { uploadPhoto } = userStore;
  
  // On Crop
  const onCrop = useDebouncedCallback(
    () => {
      const cropper = cropperRef.current?.cropper;
      cropper?.getCroppedCanvas().toBlob(blob => setUserBlob(blob!))
    }, 100
  )

  // Hanlde Upload
  const handleUpload = async () => {
    if (!userBlob) return ;

    // Loading tostr
    const loadingToast = toast.loading('Uploading your photo');

    // Call api
    const response = await uploadPhoto(userBlob, user.token);
    
    // If success, show toaster and update user image
    // If fail show toastr with error message
    if(response.ok) {
      toast.success('Successfuly set your photo');
      const newPhoto = await response.json();
      // Update next auth user
      await update({
        ...data,
        user: {
          ...user,
          image: newPhoto.url
        }
      });
    } else{
      const errorMessage = response.statusText;
      toast.error(errorMessage);      
    }

    // Hide loading toastr, refresh page without SSR and close modal
    toast.dismiss(loadingToast);
    setUploadOpen(false);
  };


  return (
    <>
    <div className="flex gap-16">
        <Cropper
            src={preview}
            crop={onCrop}
            preview=".img-preview"
            aspectRatio={1}
            guides={false}
            ref={cropperRef}
            viewMode={1}
            background={false}
            responsive={true}
            checkOrientation={false}
            width={400}
        />  
        <div className="flex flex-col justify-center items-center gap-3">
            <div className="img-preview w-[300px] h-[300px] rounded-full overflow-hidden" />
        </div>
    </div>
    <button onClick={handleUpload} className="create w-4/12 my-5">Upload</button> 
    </>
  )
}

