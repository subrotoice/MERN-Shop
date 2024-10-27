import React, { useState, useEffect } from "react";
import axios from "axios";
import useRoles from "../../hooks/useRoles";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";


const Roles = () => {

  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState('');

  const roleList = useRoles();

  useEffect(() => {
    setRoles(roleList);
  }, [roleList]);
  
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

  const handleDelete = async (role) => {
    const isConfirm = confirm(`Are you sure to delete ${role.name} role ?`);
    if (isConfirm) {
      setRoles((prevRoles) =>
        prevRoles.filter((prevRole) => prevRole._id !== role._id)
      );
      toast.error("Role Deleted", {
        duration: 3000,
        position: "top-right",
      });
      try {
        await axios.delete(
          `http://localhost:5000/api/users/roles/${role._id}`
        );
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };


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
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {roles.map((role, index) => (
          <tr>
            <th>{index+1}</th>
            <td>{role.name}</td>
            <td>
              <button onClick={() => handleDelete(role)}>
                <MdDeleteForever className="h-6 w-6 text-red-700" />
              </button>
            </td>
          </tr>
        ))}
        
        
      </tbody>
    </table>
  </div>
)};

export default Roles;
