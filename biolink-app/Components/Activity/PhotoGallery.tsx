'use client'
import React, { useEffect } from 'react'

interface Props {
  images: Array<string>,
}

const PhotoGallery = ({images}: Props) => {

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
      className="flex w-full h-64"
    >
      <img 
        src="/profile-cover.jpg" 
        data-te-img="/profile-cover.jpg"
        className='w-1/2 pr-2 h-full object-cover cursor-zoom-in data-[te-lightbox-disabled]:cursor-auto' 
        alt="background 1" 
      />

      {images.length < 3
      ? 
      <img 
        src="/profile-cover.jpg" 
        data-te-img="/profile-cover.jpg"
        className='w-1/2 pl-2 h-full object-cover cursor-zoom-in data-[te-lightbox-disabled]:cursor-auto' 
        alt="background 1" 
      />
      : 
      <div className="w-1/2 flex flex-col gap-2">
          <img 
            src="/profile-cover.jpg" 
            data-te-img="/profile-cover.jpg"
            className='w-full h-32 object-cover cursor-zoom-in data-[te-lightbox-disabled]:cursor-auto' 
            alt="background 2" 
          />
          <img 
            src="/profile-cover.jpg" 
            data-te-img="/profile-cover.jpg"
            className='w-full h-32 object-cover cursor-zoom-in data-[te-lightbox-disabled]:cursor-auto' 
            alt="background 3" 
          />
      </div>
      }
    </div> 
  )
}

export default PhotoGallery