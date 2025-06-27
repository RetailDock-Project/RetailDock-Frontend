import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const dummyImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGSDnCl9epU3jv2qgAXqAYF6YrJ7r6B450VA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUiADDSbLkrFBxnESZTA8kDi-PjLXEXnIJzQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTihNno_mkTrIIEeW805ANI4-Yq_NhH3PbA&s",
];

const ProductImages: React.FC = () => {
  const [images, setImages] = useState(dummyImages);
  const [mainImage, setMainImage] = useState(dummyImages[0]);

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    if (mainImage === images[index]) {
      setMainImage(newImages[0] || "");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mt-4 mb-2">Product Images</h2>
      {mainImage && (
        <div className="mb-4">
          <img
            src={mainImage}
            alt="Main Product"
            className="w-full max-w-xs max-h-xs rounded-xl shadow"
          />
        </div>
      )}
      <div className="flex gap-4 flex-wrap items-center justify-start">
        {images.map((src, idx) => (
          <div key={idx} className="relative">
            <img
              src={src}
              alt={`Thumbnail ${idx}`}
              onClick={() => setMainImage(src)}
              className={`w-20 h-20 border-2 cursor-pointer rounded ${
                mainImage === src ? "border-blue-500" : "border-gray-200"
              }`}
            />
            {/* <button
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 p-1 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white"
            >
              <FiX size={12} />
            </button> */}
          </div>
        ))}
        {/* <div className="w-20 h-20 border-2 border-dashed text-gray-400 rounded flex items-center justify-center text-xs cursor-pointer hover:border-blue-400">
          + Add
        </div> */}
      </div>
    </div>
  );
};

export default ProductImages;
