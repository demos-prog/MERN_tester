import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([])


  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users)
    })
  }, [])

  async function getUsers() {
    const resp = await fetch('http://localhost:5050/users');
    if (resp.ok) {
      return await resp.json()
    }
  }

  async function deleteUsers() {
    const resp = await fetch('http://localhost:5050/users', {
      method: 'DELETE'
    });
    if (resp.ok) {
      setUsers([])
      alert('users are cleared !')
    } else {
      alert('smth went wrong')
    }
  }


  return (
    <>
      <button onClick={deleteUsers}>Clear data</button>
      <a href="http://localhost:5173/createuser">Create user</a>

      <ul>
        {users.map((user, i) => {
          return (
            <li key={i}>
              {user.name} - {user.age}
            </li>
          )
        })}
      </ul>
    </>
  );
}