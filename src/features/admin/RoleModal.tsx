import React, { useEffect, useState } from "react";
import Modal from "../../components/ui/reusable/Modal";
import { Button } from "../../components/ui/reusable/Button";

export type Role = {
  id: number;
  name: string;
  permissions: string[];
};

export type NewRole = Omit<Role, "id">;

type RoleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (role: NewRole) => void;
  initialData?: Role | null;
};

const allPermissions = [
  "Manage Users",
  "Edit Products",
  "View Reports",
  "Delete Orders",
  "Manage Inventory",
  "Access Dashboard",
];

const RoleModal: React.FC<RoleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setRoleName(initialData.name);
      setSelectedPermissions(initialData.permissions);
    } else {
      setRoleName("");
      setSelectedPermissions([]);
    }
  }, [initialData]);

  const togglePermission = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSave = () => {
    if (!roleName) return;
    onSave({ name: roleName, permissions: selectedPermissions });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      head={initialData ? "Edit Role" : "Add New Role"}
      subHead="Assign permissions to this role"
      width="max-w-xl"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Role Name</label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Permissions</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {allPermissions.map((perm, index) => (
              <label key={index} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(perm)}
                  onChange={() => togglePermission(perm)}
                />
                {perm}
              </label>
            ))}
          </div>
        </div>

        <div className="pt-4 text-right">
          <Button variant="secondary" className="mr-2" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {initialData ? "Update Role" : "Save Role"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RoleModal;
