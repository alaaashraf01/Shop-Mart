// 'use client'
// import React from 'react'
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"
// import Autoplay from 'embla-carousel-autoplay'
// import Image from 'next/image'

// export default function ProductSlider({images}:{images:string[]},altContent:string) {
//   return<>
//   <Carousel opts={
//   {loop:true}
// } plugins={[Autoplay({
//           delay: 1500,
//         }),
//       ]}
//         >
//   <CarouselContent>

// {images.map((img,index)=>  
//     <CarouselItem key={index}>
//   <Image src={img} alt={altContent} width={300} height={300}/>
//  </CarouselItem>)}

//   </CarouselContent>
 
// </Carousel>
//   </>
// }
'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

// التعديل هنا: دمج الـ props في object واحد
export default function ProductSlider({ images, altContent }: { images: string[], altContent: string }) {
  return (
    <Carousel 
      opts={{ loop: true }} 
      plugins={[
        Autoplay({ delay: 1500 }),
      ]}
    >
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index} className="flex justify-center">
            <Image 
              src={img} 
              // تأكدي من كتابة alt هنا واستخدام الـ prop المستلمة
              alt={`${altContent} - view ${index + 1}`} 
              width={400} 
              height={400} 
              className="object-contain rounded-2xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}