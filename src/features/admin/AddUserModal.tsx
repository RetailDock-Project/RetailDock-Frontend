// components/admin/AddUserModal.tsx
import React, { useState } from "react";
import Modal from "../../components/ui/reusable/Modal";
import { Button } from "../../components/ui/reusable/Button";
import { useRoles } from "../../hooks/useRoles";

type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: {
    name: string;
    email: string;
    orgRoleId: string;
    password: string;
  }) => void;
};

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { data: rolesData } = useRoles();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orgRoleId: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      head="Add New User"
      subHead="Fill in user details to create a new account"
      width="max-w-lg"
    >
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            name="orgRoleId"
            value={formData.orgRoleId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Role</option>

            {rolesData?.data?.map((role: { id: string; name: string }) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Actions */}
        <div className="pt-4 text-right">
          <Button variant="secondary" className="mr-2" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddUserModal;
