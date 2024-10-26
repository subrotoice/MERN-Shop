import axios from "axios";
import { useEffect, useState } from "react";

const useRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/roles")
      .then((res) => setRoles(res.data))
      .catch((err) => console.log(err));
  }, []);

  return roles;
};

export default useRoles;
