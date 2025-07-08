import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllGroupForLedgerCreation } from "../../../services/api/AccountsApi/accountsApi";
import Modal from "../../../components/ui/reusable/Modal";
import toast from "react-hot-toast";

type LedgerDetails = {
    contactName: string;
    contactNumber: string;
    address: string;
    gstNumber: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    upiId: string;
};

type LedgerForm = {
    ledgerName: string;
    groupId: string;
    openingBalance: number;
    drCr: string;
    details: LedgerDetails;
};



const AddLedger: React.FC = () => {
    const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
const [parentId, setParentId] = useState("");


    const [formData, setFormData] = useState<LedgerForm>({
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
    });





//     const handleAddGroup = async (groupData: { groupName: string; parentId: string }) => {
//   try {
//     // await addGroupApi(groupData); // Your POST API function
//     toast.success("Group added successfully");
//     setIsAddGroupModalOpen(false);
//     setGroupName("");
//     setParentId("");
//     // queryClient.invalidateQueries(["allGroups"]); // Refresh group list
//   } catch (err) {
//     toast.error("Failed to add group");
//   }
// };










    //   const [groups, setGroups] = useState([]);
    const { data: groups } = useQuery({
        queryKey: ["allGroups"],
        queryFn: getAllGroupForLedgerCreation,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name in formData.details) {
            setFormData({
                ...formData,
                details: { ...formData.details, [name]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = () => {
        console.log("Submitting:", formData);
        // Add API call here
    };
    // const handleAddGroup = () => {
    //     // You can submit new group here
    //     setIsAddGroupModalOpen(false);
    // };
    return (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Ledger</h2>

            {/* Ledger Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ledger Name</label>
                <input
                    type="text"
                    name="ledgerName"
                    value={formData.ledgerName}
                    onChange={handleChange}
                    className="w-full border rounded px-4 py-2 text-sm"
                    placeholder="Enter ledger name"
                />
            </div>

            {/* Group Select */}
            <div className="mb-4 flex gap-4 flex-wrap items-end">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Group</label>
                    <select
                        name="groupId"
                        value={formData.groupId}
                        onChange={handleChange}
                        className="w-full border rounded px-4 py-2 text-sm"
                    >
                        <option value="">-- Select a group --</option>
                        {groups?.map((group: any) => (
                            <option key={group.id} value={group.id}>
                                {group.groupName}
                            </option>
                        ))}
                    </select>
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
                    <input
                        type="number"
                        name="openingBalance"
                        value={formData.openingBalance}
                        onChange={handleChange}
                        className="w-full border rounded px-4 py-2 text-sm"
                    />
                </div>

                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Opening Balance Type</label>
                    <select
                        name="drCr"
                        value={formData.drCr}
                        onChange={handleChange}
                        className="w-full border rounded px-4 py-2 text-sm"
                    >
                        <option value="Dr">Debit</option>
                        <option value="Cr">Credit</option>
                    </select>
                </div>
            </div>

            {/* Contact Details */}
            <h3 className="text-md font-semibold mt-6 mb-2 text-gray-700">Additional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData.details).map(([key, value]) => (
                    <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                        </label>
                        <input
                            type="text"
                            name={key}
                            value={value}
                            onChange={handleChange}
                            className="w-full border rounded px-4 py-2 text-sm"
                            placeholder={`Enter ${key}`}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
                >
                    Add Ledger
                </button>
            </div>

            <Modal
                isOpen={isAddGroupModalOpen}
                onClose={() => setIsAddGroupModalOpen(false)}
                head="Add Group"
                subHead="Create a new ledger group"
                badge="Group"
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        // Call your add group API here with groupName and parentId
                        // handleAddGroup({ groupName, parentId });
                    }}
                    className="space-y-4"
                >
                    {/* Group Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Group Name
                        </label>
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            required
                            placeholder="Enter group name"
                            className="w-full border px-3 py-2 rounded text-sm"
                        />
                    </div>

                    {/* Parent Group */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Parent Group
                        </label>
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

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
                        >
                            Add Group
                        </button>
                    </div>
                </form>
            </Modal>


        </div>
    );
};

export default AddLedger;
