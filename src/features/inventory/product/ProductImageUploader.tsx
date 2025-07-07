import React, { useRef, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";

type Props = {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  maxImages?: number;
};

const ProductImageUploader: React.FC<Props> = ({
  images,
  setImages,
  maxImages = 5,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);
    const validImages = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validImages.length !== selectedFiles.length) {
      setError("Some files were not valid images.");
      return;
    }

    if (images.length + validImages.length > maxImages) {
      setError(`You can upload up to ${maxImages} images only.`);
      return;
    }

    setImages((prev) => [...prev, ...validImages]);
    setError("");
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const openFilePicker = () => inputRef.current?.click();

  return (
    <div className="bg-white border p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Product Images</h2>

      {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-24 h-24 rounded border overflow-hidden"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-white/80 hover:bg-red-500 hover:text-white p-1 rounded-full text-xs"
              title="Remove"
            >
              <FiX />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
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
