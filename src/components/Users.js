import { useState, useEffect } from "react";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    let isMounted = true;
    const controler = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controler.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
    
    return () => {
      isMounted = false;
      controler.abort();
    };
  }, []);
  return (
    <article>
      <h1>Users List</h1>
      {users?.length ? (
        <ul>
          {users?.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No Users to display!</p>
      )}
    </article>
  );
};
export default Users;
