import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { getBase64ImageSrc } from "../../../utils/getBase64ImageSrc";

interface ProductImage {
  id: number;
  image: string;
}

interface Props {
  images: ProductImage[];
}

const ProductImages: React.FC<Props> = ({ images }) => {
  const [imagesData, setImagesData] = useState<ProductImage[]>(images);
  const [mainImage, setMainImage] = useState<ProductImage>(images[0]);

  const removeImage = (id: number) => {
    const newImages = imagesData.filter((img) => img.id !== id);
    setImagesData(newImages);
    if (mainImage.id === id) {
      setMainImage(newImages[0] || { id: 0, image: "" });
    }
  };

  if (!imagesData || imagesData.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mt-4 mb-2">Product Images</h2>

      {mainImage?.image && (
        <div className="mb-4">
          <img
            src={getBase64ImageSrc(mainImage.image)}
            alt="Main Product"
            className="w-full max-w-48 max-h-48 rounded-xl shadow object-cover"
          />
        </div>
      )}

      {imagesData.length > 1 && (
        <div className="flex gap-4 flex-wrap items-center justify-start">
          {imagesData.map((img) => (
            <div key={img.id} className="relative">
              <img
                src={getBase64ImageSrc(img.image)}
                alt={`Thumbnail ${img.id}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 border-2 cursor-pointer rounded object-cover ${
                  mainImage.id === img.id
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
              />
              {/* Optional remove button */}
              {/* <button
                onClick={() => removeImage(img.id)}
                className="absolute top-1 right-1 p-1 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white"
              >
                <FiX size={12} />
              </button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;
