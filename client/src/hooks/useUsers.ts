import axios from "axios";
import { useEffect, useState } from "react";

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://mernshopdev.vercel.app/api/users/all")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return users;
};

export default useUsers;
