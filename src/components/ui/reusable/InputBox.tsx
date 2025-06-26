import React from "react";

type InputBoxProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: any; // Optional icon (e.g., Search, User, Mail)
  error?: string;
  disabled?: boolean;
  required?: boolean;
};

export const InputBox: React.FC<InputBoxProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
  disabled = false,
  required = false,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-2 text-sm rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition
            ${Icon ? "pl-10" : ""}
            ${error ? "border-red-500" : "border-gray-300"}
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
        />
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

// const ExampleForm = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");

//   return (
//     <div className="space-y-4 max-w-md mx-auto p-6">
//       <InputBox
//         label="Full Name"
//         value={name}
//         onChange={setName}
//         placeholder="John Doe"
//         icon={User}
//         required
//       />

//       <InputBox
//         label="Email Address"
//         type="email"
//         value={email}
//         onChange={setEmail}
//         placeholder="john@example.com"
//         icon={Mail}
//         error={!email.includes("@") && email ? "Invalid email" : ""}
//         required
//       />
//     </div>
//   );
// };
