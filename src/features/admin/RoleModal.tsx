import React, { useEffect, useState } from "react";
import Modal from "../../components/ui/reusable/Modal";
import { Button } from "../../components/ui/reusable/Button";

export type Permission = {
  id: number;
  name: string;
};

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
};

export type NewRole = {
  name: string;
  permissionIds: number[];
};

type RoleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (role: NewRole) => void;
  initialData?: Role | null;
  allPermissions: Permission[]; // ✅ passed from parent instead of hardcoded
};

const RoleModal: React.FC<RoleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  allPermissions,
}) => {
  const [roleName, setRoleName] = useState("");
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>(
    []
  );

  useEffect(() => {
    if (initialData) {
      setRoleName(initialData.name);
      setSelectedPermissionIds(initialData.permissions.map((p) => p.id));
    } else {
      setRoleName("");
      setSelectedPermissionIds([]);
    }
  }, [initialData]);

  const togglePermission = (permId: number) => {
    setSelectedPermissionIds((prev) =>
      prev.includes(permId)
        ? prev.filter((id) => id !== permId)
        : [...prev, permId]
    );
  };

  const handleSave = () => {
    if (!roleName || selectedPermissionIds.length === 0) return;
    onSave({ name: roleName, permissionIds: selectedPermissionIds });
    onClose();
  };

  console.log(allPermissions);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 max-h-64 overflow-y-auto pr-2">
            {allPermissions?.map((perm) => (
              <label key={perm.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedPermissionIds.includes(perm.id)}
                  onChange={() => togglePermission(perm.id)}
                />
                {perm.name}
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
