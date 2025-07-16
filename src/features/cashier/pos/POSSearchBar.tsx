import React, { useRef, useState } from "react";
import { Search } from "lucide-react";

type Props = {
  searchText:string;
  setSearchText: (text: string) => void;
};

const POSSearchBar: React.FC<Props> = ({ setSearchText,searchText }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraOpen(true);
      }
    } catch (err) {
      console.error("Failed to access camera:", err);
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-4 border p-4 mt-2 shadow-lg rounded-xl">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchText}
            placeholder="Search products Name or ProductCode..."
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
          />
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
        </div>
        <button
          onClick={openCamera}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Scan
        </button>
        <button className="border px-4 py-2 rounded-md text-sm">Barcode</button>
      </div>

      {isCameraOpen && (
        <div className="border rounded overflow-hidden mt-2">
          <video ref={videoRef} className="w-full h-64" />
        </div>
      )}
    </div>
  );
};

export default POSSearchBar;
