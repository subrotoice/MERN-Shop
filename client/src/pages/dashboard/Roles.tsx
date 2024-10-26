import React, { useState, useEffect } from "react";
import axios from "axios";
import useRoles from "../../hooks/useRoles";

const Roles = () => {

  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState('');

  const roleList = useRoles();

  useEffect(() => {
    setRoles(roleList);
  }, [roleList]);
  console.log(roles)
  const addNewRole = async() => {
    try {
      const { data, status } = await axios.post(`http://localhost:5000/api/users/roles`, { name: role });
      if (status === 201) {
        setRoles((prevRoles) => [...prevRoles, { name: data.name }]);
      }
    } catch (error) {
      console.error("Error creating role", error);
    }
  }


  return (
  <div className="overflow-x-auto">

    <input type="text" placeholder="Add new role" value={role} onChange={(e)=>{setRole(e.target.value)}} className="input input-bordered w-full max-w-xs" />
    <button className="btn btn-primary ml-5" onClick={addNewRole}>+Add Role</button>

    <div className="divider"></div>

    <table className="table table-zebra">
      {/* head */}
      <thead>
        <tr>
          <th>Serial</th>
          <th>Name</th>
          <th>Permissions</th>
        </tr>
      </thead>
      <tbody>
        {roles.map((role, index) => (
          <tr>
            <th>{index+1}</th>
            <td>{role.name}</td>
            <td></td>
          </tr>
        ))}
        
        
      </tbody>
    </table>
  </div>
)};

export default Roles;
