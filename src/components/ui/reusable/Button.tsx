import React from "react";
import { cn } from "../../../lib/utils"; // optional utility for class merging

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const styles = {
  base: "inline-flex items-center justify-center rounded font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
  sizes: {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  },
  variants: {
    primary: "bg-blue-900 text-white hover:bg-blue-800 focus:ring-blue-500",
    secondary:
      "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 focus:ring-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  },
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  className,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        styles.base,
        styles.sizes[size],
        styles.variants[variant],
        className,
        disabled && "opacity-50 cursor-not-allowed"
      )}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
