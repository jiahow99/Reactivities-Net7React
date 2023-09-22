'use client'
import { Photo } from '@/models/Photo';
import Image from 'next/image';
import React, { useEffect } from 'react'

interface Props {
  images: Photo[],
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
      <Image 
        src={ images[0].url } 
        data-te-img={ images[0].url }
        width={1000}
        height={1000}
        loading='lazy'
        className='w-1/2 pr-2 h-full object-cover cursor-zoom-in data-[te-lightbox-disabled]:cursor-auto transition-opacity opacity-30' 
        onLoadingComplete={(image) => image.classList.remove("opacity-30")}
        alt="background 1" 
      />

      {images.length < 3
      ? 
      <Image 
        src={ images[1].url } 
        data-te-img={ images[1].url } 
        width={1000}
        height={1000}
        loading='lazy'
        className='w-1/2 pr-2 h-full object-cover cursor-zoom-in data-[te-lightbox-disabled]:cursor-auto transition-opacity opacity-30' 
        onLoadingComplete={(image) => image.classList.remove("opacity-30")}
        alt="background 1" 
      />
      : 
      <div className="w-1/2 flex flex-col gap-2">
          <Image 
            src={ images[0].url }  
            data-te-img={ images[0].url } 
            width={1000}
            height={1000}
            loading='lazy'
            className='w-full pr-2 h-32 object-cover cursor-zoom-in data-[te-lightbox-disabled]:cursor-auto transition-opacity opacity-30' 
            onLoadingComplete={(image) => image.classList.remove("opacity-30")}
            alt="background 2" 
          />
          <Image 
            src={ images[1].url } 
            data-te-img={ images[1].url } 
            width={1000}
            height={1000}
            loading='lazy'
            className='w-full pr-2 h-32 object-cover cursor-zoom-in data-[te-lightbox-disabled]:cursor-auto transition-opacity opacity-30' 
            onLoadingComplete={(image) => image.classList.remove("opacity-30")}
            alt="background 3" 
          />
      </div>
      }
    </div> 
  )
}

export default PhotoGallery