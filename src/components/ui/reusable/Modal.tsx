import React from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  head: string;
  subHead?: string;
  badge?: string;
  children: React.ReactNode;
  width?: string; // 👈 New width prop (Tailwind class)
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  head,
  subHead,
  badge,
  children,
  width = "max-w-4xl", // 👈 Default width
}) => {
  if (!isOpen) return null;

  //   max-w-md	~28rem modal
  // max-w-lg	~32rem modal
  // max-w-2xl	~42rem modal
  // max-w-full	Full width on small screens

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
  className={`bg-white w-full ${width} rounded-xl shadow-xl max-h-[90vh] overflow-y-auto`}

      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b bg-white">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{head}</h2>
            {subHead && <p className="text-sm text-gray-500">{subHead}</p>}
          </div>
          <div className="flex items-center gap-2">
            {badge && (
              <span className="text-sm bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full capitalize">
                {badge}
              </span>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>

        {/* Modal Content from Parent */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
