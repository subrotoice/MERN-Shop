import React, { useState, useEffect } from "react";
// import axios from "axios";
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
              <th></th>
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
              <select className="select w-full max-w-xs">
                <option disabled selected>Pick a role for this user</option>
                {roles.map((role)=> (
                  <option>{role.name}</option>
                ))}
                
              </select>
              </td>
            </tr>
            ))}
            
          </tbody>
          {/* foot */}
          {/* <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot> */}
        </table>
      </div>
    </div>
  );
};

export default Users;
