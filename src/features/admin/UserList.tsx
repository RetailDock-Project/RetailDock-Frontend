import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/reusable/Button";
import Modal from "../../components/ui/reusable/Modal";
import { useRoles } from "../../hooks/useRoles";
import { formatDate } from "../../utils/formatDate";
import { updateUser } from "../../services/adminapi/adminApi";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  created: string;
};

type UserListProps = {
  users: User[];
};

const UserList: React.FC<UserListProps> = ({ users }) => {
  const { data: rolesData } = useRoles();
  console.log(rolesData);

  const [localUsers, setLocalUsers] = useState<User[]>(users);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedRole, setEditedRole] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Sync local state with props when users prop changes
  React.useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handleConfirmDelete = () => {
    if (!userToDelete) return;
    setLocalUsers(localUsers.filter((u) => u.id !== userToDelete.id));
    setIsDeleteOpen(false);
    setUserToDelete(null);
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditedRole(user.role);
    setIsEditOpen(true);
  };

  const handleSave = async () => {
    if (!selectedUser) return;
    if (!editedRole) return;
    try {
      console.log(selectedUser.id, editedRole);
      //   await updateUser({ userId: selectedUser.id, newRoleId: editedRole });
    } catch (error: any) {}
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">
        User List ({localUsers.length})
      </h2>

      <div className="overflow-x-auto rounded-md border shadow bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Created</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {localUsers.map((user) => (
              <tr key={user.id}>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <span className="block">
                    {formatDate(user.created).humanReadable}
                  </span>
                  <span>{formatDate(user.created).fullDate}</span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openEditModal(user)}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setUserToDelete(user);
                      setIsDeleteOpen(true);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {localUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500">No users found.</div>
        )}
      </div>

      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        head="Delete User"
        subHead="This action cannot be undone."
        badge={userToDelete?.email}
      >
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            Are you sure you want to delete{" "}
            <span className="font-medium text-black">{userToDelete?.name}</span>
            ?
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal for Edit */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        head="Edit User"
        subHead={`Update role`}
        width="max-w-lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              disabled={true}
              type="text"
              value={selectedUser?.name}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 
               focus:outline-none focus:ring focus:ring-blue-500 
               disabled:bg-gray-100 disabled:text-gray-500 
               disabled:cursor-not-allowed disabled:opacity-70"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="">Select Role</option>

              {rolesData?.data?.map((role: any) => (
                <option value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>

          <div className="text-right">
            <Button variant="primary" size="sm" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserList;
