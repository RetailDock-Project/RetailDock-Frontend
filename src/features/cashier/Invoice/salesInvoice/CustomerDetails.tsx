import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

type customerDetailsProps={
name:string | null;
 gstNumber:string | null;
 mobileNumber:string| null;
 address:string| null;
 email:string| null;
}

const CustomerDetails: React.FC<customerDetailsProps> = ({name,gstNumber,mobileNumber,address,email}) => {
  return (
    <div className=" p-6 rounded-xl shadow border bg-white">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🏢 Customer Details
      </h2>

      <div className="text-sm">
        <p className="font-medium">{name}</p>
  {    gstNumber&&  <p className="text-gray-600">GST: {gstNumber}</p>}

        <div className="mt-3 space-y-2 text-gray-700">
          <p className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5" />
           {address}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} />{mobileNumber}
          </p>
          <p className="flex items-center gap-2">
            <Mail size={16} />{email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
