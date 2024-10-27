import axios from "axios";
import { useEffect, useState } from "react";

const useRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios
      .get("https://mernshopdev.vercel.app/api/users/roles")
      .then((res) => setRoles(res.data))
      .catch((err) => console.log(err));
  }, []);

  return roles;
};

export default useRoles;
