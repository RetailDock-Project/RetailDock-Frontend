import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  addLedger,
  addNewSubGroup,
  getAllGroupForLedgerCreation,
  type LedgerForm,
} from "../../../services/api/AccountsApi/accountsApi";
import Modal from "../../../components/ui/reusable/Modal";

// Validation Schema
const ledgerValidationSchema = Yup.object().shape({
  ledgerName: Yup.string().required("Ledger name is required"),
  groupId: Yup.string().uuid("Select a valid group").required("Group is required"),
  openingBalance: Yup.number()
    .min(0, "Opening balance cannot be negative")
    .required("Opening balance is required"),
  drCr: Yup.string().oneOf(["Dr", "Cr"], "Invalid type").required("Dr/Cr is required"),
  details: Yup.object().shape({
    contactName: Yup.string().nullable(),
    contactNumber: Yup.string().nullable(),
    address: Yup.string().nullable(),
    gstNumber: Yup.string().nullable(),
    bankName: Yup.string().nullable(),
    accountNumber: Yup.string().nullable(),
    ifscCode: Yup.string().nullable(),
    upiId: Yup.string().nullable(),
  }),
});

const AddLedger: React.FC = () => {
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [parentId, setParentId] = useState("");


  // get all apis
  const { data: groups ,refetch} = useQuery({
    queryKey: ["allGroups"],
    queryFn: getAllGroupForLedgerCreation,
    
  });



  //set inital values
  const initialValues: LedgerForm = {
    ledgerName: "",
    groupId: "",
    openingBalance: 0,
    drCr: "Dr",
    details: {
      contactName: "",
      contactNumber: "",
      address: "",
      gstNumber: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      upiId: "",
    },
  };
//add new ledger 
  const handleAddLedger = async (values: LedgerForm, { resetForm }: any) => {
    try {
      await addLedger(values);
      toast.success("Ledger added successfully");
      resetForm();
      refetch();
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to add ledger";
      console.error("Add Ledger Error:", message);
      toast.error(message);
    }
  };




  // add new group
   const handleAddGroup = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!groupName && !parentId) {
    toast.error("Group name and parent group are required");
    return;
  }

  try {
    const payload = {
      groupName: groupName,
      parentId: parentId,
    };
    await addNewSubGroup(payload);
    toast.success("Group added successfully");

    // Reset form fields
    setGroupName("");
    setParentId("");
    setIsAddGroupModalOpen(false);

    // Optionally, refetch group list if needed
    // queryClient.invalidateQueries(["allGroups"]);

  } catch (error) {
    console.error("Error adding group:", error);
    toast.error("Failed to add group");
  }
};

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Ledger</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={ledgerValidationSchema}
        onSubmit={handleAddLedger}
      >
        {({ values, handleChange }) => (
          <Form>
            {/* Ledger Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ledger Name</label>
              <Field
                type="text"
                name="ledgerName"
                className="w-full border rounded px-4 py-2 text-sm"
                placeholder="Enter ledger name"
              />
              <ErrorMessage name="ledgerName" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Group Select */}
            <div className="mb-4 flex gap-4 flex-wrap items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Group</label>
                <Field
                  as="select"
                  name="groupId"
                  className="w-full border rounded px-4 py-2 text-sm"
                >
                  <option value="">-- Select a group --</option>
                  {groups?.map((group: any) => (
                    <option key={group.id} value={group.id}>
                      {group.groupName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="groupId" component="div" className="text-red-500 text-sm" />
              </div>
              <button
                type="button"
                className="text-blue-600 text-sm hover:underline"
                onClick={() => setIsAddGroupModalOpen(true)}
              >
                + Add Group
              </button>
            </div>

            {/* Opening Balance and Dr/Cr */}
            <div className="mb-4 flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Opening Balance</label>
                <Field
                  type="number"
                  name="openingBalance"
                  className="w-full border rounded px-4 py-2 text-sm"
                />
                <ErrorMessage name="openingBalance" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Opening Balance Type</label>
                <Field
                  as="select"
                  name="drCr"
                  className="w-full border rounded px-4 py-2 text-sm"
                >
                  <option value="Dr">Debit</option>
                  <option value="Cr">Credit</option>
                </Field>
                <ErrorMessage name="drCr" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            {/* Contact Details */}
            <h3 className="text-md font-semibold mt-6 mb-2 text-gray-700">Additional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(values.details).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                  </label>
                  <Field
                    type="text"
                    name={`details.${key}`}
                    className="w-full border rounded px-4 py-2 text-sm"
                    placeholder={`Enter ${key}`}
                  />
                  <ErrorMessage
                    name={`details.${key}`}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
              >
                Add Ledger
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Group Modal */}
      <Modal
        isOpen={isAddGroupModalOpen}
        onClose={() => setIsAddGroupModalOpen(false)}
        head="Add Group"
        subHead="Create a new ledger group"
        badge="Group"
      >
        <form
       onSubmit={handleAddGroup} className="space-y-4">
        
        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
              placeholder="Enter group name"
              className="w-full border px-3 py-2 rounded text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parent Group</label>
            <select
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm"
              required
            >
              <option value="">-- Select a parent group --</option>
              {groups?.map((group: any) => (
                <option key={group.id} value={group.id}>
                  {group.groupName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
              Add Group
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddLedger;
