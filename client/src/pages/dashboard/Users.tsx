import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { FaRegUser, FaChevronDown } from "react-icons/fa6";
import useRoles from "../../hooks/useRoles";
import useUsers from "../../hooks/useUsers";
import { MdClear } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import UserEditModal from "../../components/dashboard/users/UserEditModal";
import { MdDeleteForever, MdEdit  } from "react-icons/md";
import toast from "react-hot-toast";



// Define interfaces for User and Role
interface Role {
  _id: string;
  name: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  photoURL: string;
  roles: Role[];
}

const Users = () => {
  const currentUser = useAuth();
  console.log(currentUser.user)
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userList = useUsers(); // Assuming it returns User[]
  const roleList = useRoles(); // Assuming it returns Role[]

  // const isAdmin = currentUser.roles.some(roleId => 
  //   roles.find(role => role._id.toString() === roleId.toString() && role.name === 'admin')
  // );

  // console.log(isAdmin)

  useEffect(() => {
    setUsers(userList);
  }, [userList]);

  useEffect(() => {
    setRoles(roleList);
  }, [roleList]);

  const assignRole = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { role, user }: { role: Role; user: User } = JSON.parse(
      e.target.value
    );

    const roleId = role._id;
    const roleName = role.name;
    const userId = user._id;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${userId}/roles`,
        {
          roleId,
        }
      );

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === userId
              ? { ...u, roles: [...u.roles, { name: roleName, _id: roleId }] }
              : u
          )
        );
      }
    } catch (error) {
      console.error("Failed to update user role", error);
    }
  };

  const detachRole = async (role, user) => {
    const isConfirm = confirm(`Are you sure to remove ${role.name} role for this user?`);

    if (isConfirm) {
      const roleId = role._id;
      const roleName = role.name;
      const userId = user._id;

      try {
        const response = await axios.put(
          `http://localhost:5000/api/users/${userId}/roles/detach`,
          {
            roleId,
          }
        );
        console.log(response);
        if (response.status === 200) {
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u._id === userId
                ? { ...u, roles: u.roles.filter((role) => role._id !== roleId) }
                : u
            )
          );
          
        }
      } catch (error) {
        console.error("Failed to update user role", error);
      }
    }
  };

  const handleEditClick = (user) => {
    console.log(user)
    setSelectedUser(user);
    console.log(selectedUser)

    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleUpdate = async () => {
    if (selectedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? selectedUser : user
        )
      );
      try {
        await axios.put(
          `http://localhost:5000/api/users/${selectedUser._id}/edit`,
          selectedUser
        );
        setIsModalOpen(false);
        toast.success("User Updated");
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  }

  const handleDelete = async (user) => {
    const isConfirm = confirm(`Are you sure to delete ${user.name}?`);
    if (isConfirm) {
      setUsers((prevusers) =>
        prevusers.filter((u) => u._id !== user._id)
      );
      try {
        await axios.delete(`http://localhost:5000/api/users/${user._id}`);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Pick a role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={`${user.name}'s avatar`}
                          />
                        ) : (
                          <FaRegUser className="w-10 h-10" />
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.roles.map((role) => (
                    <div key={role._id} className="flex items-center space-x-1">
                      <span>{role.name}</span>
                      {user.firebaseUid !== currentUser.user.uid && (
                        <MdClear className="text-red-700 cursor-pointer flex-shrink-0 flex items-center justify-center" onClick={() => detachRole(role, user)} />
                      )}
                    </div>
                  ))}
                </td>
                <td>{user.email}</td>
                <td>
                  <select
                    className="select select-ghost w-full max-w-xs"
                    onChange={assignRole}
                  >
                    <option disabled selected>
                      Pick a Role
                    </option>
                    {roles.map((role) => (
                      <option
                        key={role._id}
                        value={JSON.stringify({ role, user })}
                      >
                        {role.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditClick(user)}>
                      <MdEdit className="h-6 w-6" />
                    </button>
                    {user.firebaseUid !== currentUser.user.uid && (
                      <button onClick={() => handleDelete(user)}>
                        <MdDeleteForever className="h-6 w-6 text-red-700" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedUser && (
        <UserEditModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          user={selectedUser}
          setUser={setSelectedUser}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Users;
