import React, { useState, useEffect } from "react";
import axios from "axios";
import useUsers from "../../hooks/useUsers";
import useRoles from "../../hooks/useRoles";


const Users = () => {

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const userList = useUsers();
  const roleList = useRoles();

  useEffect(() => {
    setUsers(userList);
  }, [userList]);

  useEffect(() => {
    setRoles(roleList);
  }, [roleList]);


  const assignRole = async (e) => {
    
    const { role, user } = JSON.parse(e.target.value);

    const roleId = role._id;
    const roleName = role.name;

    const userId = user._id; // Assumed user object is available
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${userId}/roles`, { roleId: roleId });
      console.log(response);
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId
              ? { ...user, roles: [...user.roles, { name: roleName, _id: roleId }] }
              : user
          )
        );
      }
    } catch (error) {
      console.error("Failed to update user role", error);
    }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Pick a role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user)=> (
              
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
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
                  <div>{role.name}</div>
                ))}
                <div></div>
              </td>
              <td>{user.email}</td>
              <td>
              <select
                className="select select-ghost w-full max-w-xs"
                onChange={assignRole}
              >
                <option disabled selected>Pick a Role</option>
                {roles.map((role) => (
                  <option key={role._id} value={JSON.stringify({ role, user })}>{role.name}</option>
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
