import React, { useState } from "react";
import { PageHeader } from "../../components/ui/reusable/PageHeader";
import { Button } from "../../components/ui/reusable/Button";
import { PlusCircle, ShieldCheck } from "lucide-react";
import type { NewRole, Role } from "./RoleModal";
import RoleModal from "./RoleModal";

const initialRoles: Role[] = [
  {
    id: 1,
    name: "Admin",
    permissions: [
      "Manage Users",
      "Edit Products",
      "View Reports",
      "Delete Orders",
    ],
  },
  {
    id: 2,
    name: "Manager",
    permissions: ["Edit Products", "View Reports"],
  },
];

const RolePermissions: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const handleSaveRole = (roleData: NewRole) => {
    if (editingRole) {
      // Update existing role
      setRoles((prev) =>
        prev.map((r) => (r.id === editingRole.id ? { ...r, ...roleData } : r))
      );
    } else {
      // Add new role
      const newRole: Role = {
        ...roleData,
        id: roles.length + 1,
      };
      setRoles([...roles, newRole]);
    }
    setEditingRole(null);
    setShowModal(false);
  };

  return (
    <div className="p-6 overflow-auto max-h-screen">
      <PageHeader
        title="Role Management"
        subtitle="Assign and manage roles with permissions"
        actions={
          <Button
            size="sm"
            variant="primary"
            className="flex items-center gap-2"
            onClick={() => {
              setEditingRole(null);
              setShowModal(true);
            }}
          >
            <PlusCircle size={16} />
            Add Role
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white border rounded-xl shadow p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <ShieldCheck size={18} className="text-blue-500" />
                {role.name}
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setEditingRole(role);
                  setShowModal(true);
                }}
              >
                Edit
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              <span className="font-medium">Permissions:</span>
              <ul className="list-disc list-inside mt-1 text-gray-700">
                {role.permissions.map((perm, i) => (
                  <li key={i}>{perm}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <RoleModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingRole(null);
        }}
        onSave={handleSaveRole}
        initialData={editingRole}
      />
    </div>
  );
};

export default RolePermissions;
