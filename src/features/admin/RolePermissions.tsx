import React, { useState } from "react";
import { PageHeader } from "../../components/ui/reusable/PageHeader";
import { Button } from "../../components/ui/reusable/Button";
import { PlusCircle, ShieldCheck } from "lucide-react";
import type { NewRole, Role } from "./RoleModal";
import RoleModal from "./RoleModal";
import { useQuery } from "@tanstack/react-query";
import {
  addRoleAndPermissions,
  getAllPermissions,
  getRolesAndPermissions,
  updateRoleAndPermissions,
} from "../../services/adminapi/adminApi";

const RolePermissions: React.FC = () => {
  const { data: rolesAndPermissions, refetch } = useQuery({
    queryKey: ["rolesAndPermissions"],
    queryFn: getRolesAndPermissions,
  });

  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const handleSaveRole = async (roleData: NewRole) => {
    // You can extend this logic to refetch or mutate roles
    try {
      if (editingRole) {
        await updateRoleAndPermissions(editingRole?.id, roleData);
      }
      await addRoleAndPermissions(roleData);
      setEditingRole(null);
      setShowModal(false);
      refetch();
    } catch (error) {}
  };

  const { data: allPermissions } = useQuery({
    queryKey: ["allPermissions"],
    queryFn: () => getAllPermissions(),
  });
  console.log(editingRole);

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
        {rolesAndPermissions?.data?.map((role: any) => (
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
                {role.permissions?.map((perm: any) => (
                  <li key={perm.id}>{perm.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <RoleModal
        allPermissions={allPermissions?.data}
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
