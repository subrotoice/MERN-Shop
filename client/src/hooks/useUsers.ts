import axios from "axios";
import { useEffect, useState } from "react";

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/all")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return users;
};

export default useUsers;
