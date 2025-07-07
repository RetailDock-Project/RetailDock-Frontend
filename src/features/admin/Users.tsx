import React, { useState } from "react";
import { FilePlus, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/ui/reusable/PageHeader";
import { Button } from "../../components/ui/reusable/Button";
import { SearchInput } from "../../components/ui/reusable/SearchInput";
import { DropdownList } from "../../components/ui/reusable/DropdownList";
import UserList from "./UserList";
import AddUserModal from "./AddUserModal";
import { useUsers } from "../../hooks/useUsers";
import { useRoles } from "../../hooks/useRoles";
import { useQuery } from "@tanstack/react-query";
import { getUsersStats } from "../../services/adminapi/adminApi";
import { registerUser } from "../../services/api/authApi";
import toast from "react-hot-toast";
// Placeholder component

const Users: React.FC = () => {
  //   const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchParam, setSearchParam] = useState<string | null>(null);

  const [roleId, setRoleID] = useState<string | null>(null);

  const {
    data: usersData,
    isLoading,
    isError,
    refetch: usersRefetch,
  } = useUsers({
    search: searchParam,
    roleId: roleId,
  });

  const { data: usersStats } = useQuery({
    queryKey: ["userstats"],
    queryFn: () => getUsersStats(),
  });

  const { data: rolesData } = useRoles();
  console.log("roles data", rolesData);

  const handleAddUser = async (user: any) => {
    console.log("New User:", user);
    // Call your API here to add the user
    try {
      console.log(user);

      var response = await registerUser(user);
      console.log(response);
      toast.success(response?.data);
      usersRefetch();
    } catch (error) {}
  };

  console.log(usersData);
  console.log(rolesData);

  return (
    <div className="p-6 overflow-auto scrollbar-hide max-h-screen">
      <PageHeader
        title="User Management"
        subtitle="Manage all registered users"
        actions={
          <>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => console.log("Export clicked")}
            >
              <FilePlus size={16} />
              Export
            </Button>
            <Button
              size="sm"
              variant="primary"
              className="flex items-center gap-2"
              onClick={() => setShowAddModal(true)}
            >
              <UserPlus size={16} />
              Add User
            </Button>
          </>
        }
      />

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="bg-white border rounded-xl shadow p-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold">
            {usersStats?.data?.totalUsers ?? 0}
          </h2>
          <span className="text-gray-600">Total Users</span>
        </div>
        <div className="bg-white border rounded-xl shadow p-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-green-600">
            {usersStats?.data?.activeUsers ?? 0}
          </h2>
          <span className="text-gray-600">Active</span>
        </div>
        <div className="bg-white border rounded-xl shadow p-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-red-600">
            {usersStats?.data?.inactiveUsers ?? 0}
          </h2>
          <span className="text-gray-600">Inactive</span>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border rounded-xl shadow p-4 mt-6">
        <h3 className="text-lg font-medium mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <SearchInput onSearch={(query: string) => setSearchParam(query)} />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            {/* <DropdownList
              options={rolesData?.data}
              onSelect={(roleId: string) => setRoleID(roleId)}
              label="Select Role"
            /> */}
            <DropdownList
              options={rolesData?.data}
              includeDefaultOption={true}
              defaultOptionLabel="All Roles"
              onSelect={(roleId) => setRoleID(roleId)}
            />
          </div>
        </div>
      </div>

      {/* User List Table */}
      <UserList users={usersData?.data || []} />

      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
};

export default Users;
