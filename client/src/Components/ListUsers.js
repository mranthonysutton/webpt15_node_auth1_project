import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../utils/AxiosWithAuth";

const ListUsers = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    AxiosWithAuth()
      .get("api/users")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => console.log(error.response.data));
  }, []);

  console.log(userData);

  return (
    <div>
      <h2>Users</h2>
      {userData.map((user) => (
        <div className="user" key={user.id}>
          <h3>{user.username}</h3>
        </div>
      ))}
    </div>
  );
};

export default ListUsers;
