import React, { useRef, useState, useEffect } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import { getBase64ImageSrc } from "../../../utils/getBase64ImageSrc";

export type ProductImage = {
  id: number;
  image: string;
};

type Props = {
  existingImages: ProductImage[];
  setExistingImages: React.Dispatch<React.SetStateAction<ProductImage[]>>;
  newImages: File[];
  setNewImages: React.Dispatch<React.SetStateAction<File[]>>;
  setExistingImageIds: React.Dispatch<React.SetStateAction<number[]>>; // 👈 new prop
  maxImages?: number;
};

const ProductImageUploader: React.FC<Props> = ({
  existingImages,
  setExistingImages,
  newImages,
  setNewImages,
  setExistingImageIds,
  maxImages = 5,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const totalImages = existingImages.length + newImages.length;

  useEffect(() => {
    // Update parent state with the current retained image IDs
    setExistingImageIds(existingImages.map((img) => img.id));
  }, [existingImages, setExistingImageIds]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (totalImages + validImages.length > maxImages) {
      setError(`You can upload up to ${maxImages} images only.`);
      return;
    }

    setNewImages((prev) => [...prev, ...validImages]);
    setError("");
  };

  const handleRemoveExisting = (id: number) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
    // no need to manually update setExistingImageIds here because useEffect handles it
  };

  const handleRemoveNew = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const openFilePicker = () => inputRef.current?.click();

  return (
    <div className="bg-white border p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Product Images</h2>

      {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

      <div className="flex flex-wrap gap-4">
        {/* Existing Images */}
        {existingImages.map((img) => (
          <div
            key={`existing-${img.id}`}
            className="relative w-24 h-24 rounded border overflow-hidden"
          >
            <img
              src={getBase64ImageSrc(img.image)}
              alt={`Existing ${img.id}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleRemoveExisting(img.id)}
              className="absolute top-1 right-1 bg-white/80 hover:bg-red-500 hover:text-white p-1 rounded-full text-xs"
              title="Remove existing image"
            >
              <FiX />
            </button>
          </div>
        ))}

        {/* New Uploaded Images */}
        {newImages.map((file, index) => (
          <div
            key={`new-${index}`}
            className="relative w-24 h-24 rounded border overflow-hidden"
          >
            <img
              src={URL.createObjectURL(file)}
              alt={`New ${index}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleRemoveNew(index)}
              className="absolute top-1 right-1 bg-white/80 hover:bg-red-500 hover:text-white p-1 rounded-full text-xs"
              title="Remove uploaded image"
            >
              <FiX />
            </button>
          </div>
        ))}

        {/* Upload Button */}
        {totalImages < maxImages && (
          <div
            onClick={openFilePicker}
            className="w-24 h-24 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 rounded cursor-pointer transition"
          >
            <FiUpload size={20} />
            <span className="text-xs mt-1 text-center">Upload</span>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesChange}
        className="hidden"
      />
    </div>
  );
};

export default ProductImageUploader;
