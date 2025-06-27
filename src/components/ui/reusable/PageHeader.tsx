import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type PageHeaderProps = {
  backTo?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  backTo,
  title,
  subtitle,
  actions,
  className = "",
}) => {
  const navigate = useNavigate();

  return (
    <div className={`flex justify-between items-center mb-6 ${className}`}>
      {/* Back + Title */}
      <div className="flex justify-start items-center">
        {backTo && (
          <button
            onClick={() => navigate(backTo)}
            className="flex items-center text-xs text-blue-600 hover:underline mb-4"
          >
            <ArrowLeft className="mr-1" size={16} />
            Back
          </button>
        )}
        <div className="pl-6">
          <h1 className="text-xl font-semibold mb-0">{title}</h1>
          {subtitle && (
            <span className="text-xs text-gray-500">{subtitle}</span>
          )}
        </div>
      </div>

      {/* Actions */}
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
};
