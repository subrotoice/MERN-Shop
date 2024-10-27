import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import useRoles from "../../hooks/useRoles";
import useUsers from "../../hooks/useUsers";

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
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const userList = useUsers(); // Assuming it returns User[]
  const roleList = useRoles(); // Assuming it returns Role[]

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
        `https://mernshopdev.vercel.app/api/users/${userId}/roles`,
        {
          roleId,
        }
      );
      console.log(response);

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
                    <div key={role._id}>{role.name}</div>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
