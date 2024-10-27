import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import useRoles from "../../hooks/useRoles";

interface Role {
  _id: string;
  name: string;
}

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [role, setRole] = useState<string>("");

  const roleList = useRoles();

  useEffect(() => {
    setRoles(roleList);
  }, [roleList]);

  const addNewRole = async () => {
    try {
      const { data, status } = await axios.post(
        `http://localhost:5000/api/users/roles`,
        { name: role }
      );
      if (status === 201) {
        setRoles((prevRoles) => [
          ...prevRoles,
          { _id: data._id, name: data.name },
        ]);
        setRole(""); // Clear the input after adding
      }
    } catch (error) {
      console.error("Error creating role", error);
    }
  };

  const handleDelete = async (role: Role) => {
    const isConfirm = confirm(`Are you sure to delete ${role.name} role?`);
    if (isConfirm) {
      setRoles((prevRoles) =>
        prevRoles.filter((prevRole) => prevRole._id !== role._id)
      );
      toast.error("Role Deleted", {
        duration: 3000,
        position: "top-right",
      });
      try {
        await axios.delete(`http://localhost:5000/api/users/roles/${role._id}`);
      } catch (error) {
        console.error("Error deleting role:", error);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <input
        type="text"
        placeholder="Add new role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />
      <button className="btn btn-primary ml-5" onClick={addNewRole}>
        +Add Role
      </button>

      <div className="divider"></div>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={role._id}>
              <th>{index + 1}</th>
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
  );
};

export default Roles;
