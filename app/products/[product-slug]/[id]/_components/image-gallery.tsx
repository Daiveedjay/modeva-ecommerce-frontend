// "use client";

// import { useState } from "react";
// import Image from "next/image";

// interface MediaItem {
//   url: string;
//   order: number;
// }

// interface ImageGalleryProps {
//   product_name: string;
//   product_primary_image: string;
//   sortedMedia: MediaItem[];
// }

// export default function ImageGallery({
//   product_name,
//   product_primary_image,
//   sortedMedia,
// }: ImageGalleryProps) {
//   // Initialize with primary image as the first item
//   const allImages = [{ url: product_primary_image, order: -1 }, ...sortedMedia];

//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const selectedImage = allImages[selectedIndex];

//   const handleImageClick = (index: number) => setSelectedIndex(index);

//   return (
//     <div className="space-y-4 p-8 gap-10 flex-3 flex">
//       {/* Main Display Image */}
//       <div className="bg-muted flex-3 overflow-hidden aspect-square flex items-center justify-center">
//         <Image
//           src={selectedImage.url || "/placeholder.svg"}
//           alt={product_name}
//           width={600}
//           height={600}
//           className="w-full border border-border h-full object-cover"
//         />
//       </div>

//       {/* Thumbnail Strip */}
//       <div className="flex flex-col flex-1 gap-4">
//         {allImages.map((thumb, idx) => (
//           <button
//             key={idx}
//             onClick={() => handleImageClick(idx)}
//             className={`bg-muted cursor-pointer border h-32 w-24 mx-auto overflow-hidden aspect-square transition-all ${
//               selectedIndex === idx
//                 ? "border-foreground border-2 ring-2 ring-primary/20"
//                 : "border-border hover:border-primary/50"
//             }`}>
//             <Image
//               src={thumb.url || "/placeholder.svg"}
//               alt={`${product_name} view ${idx + 1}`}
//               width={100}
//               height={100}
//               className="w-full h-full object-cover"
//             />
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";

interface MediaItem {
  url: string;
  order: number;
}

interface ImageGalleryProps {
  product_name: string;
  product_primary_image: string;
  sortedMedia: MediaItem[];
}

export default function ImageGallery({
  product_name,
  product_primary_image,
  sortedMedia,
}: ImageGalleryProps) {
  const allImages = [{ url: product_primary_image, order: -1 }, ...sortedMedia];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = allImages[selectedIndex];

  const handleImageClick = (index: number) => setSelectedIndex(index);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 flex-1 lg:flex-[1.5]">
      {/* Main Display Image */}
      <div className="bg-muted overflow-hidden aspect-square flex items-center justify-center order-2 lg:order-1 flex-1">
        <Image
          src={selectedImage.url || "/placeholder.svg"}
          alt={product_name}
          width={600}
          height={600}
          priority
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Strip */}
      <div className="flex lg:flex-col gap-2 lg:gap-4 overflow-x-auto lg:overflow-x-visible flex-1 lg:flex-none order-1 lg:order-2">
        {allImages.map((thumb, idx) => (
          <button
            key={idx}
            onClick={() => handleImageClick(idx)}
            className={`flex-shrink-0 bg-muted cursor-pointer border h-20 sm:h-24 lg:h-32 w-20 sm:w-24 lg:w-24 overflow-hidden aspect-square transition-all ${
              selectedIndex === idx
                ? "border-foreground border-2 ring-2 ring-primary/20"
                : "border-border hover:border-primary/50"
            }`}>
            <Image
              src={thumb.url || "/placeholder.svg"}
              alt={`${product_name} view ${idx + 1}`}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
