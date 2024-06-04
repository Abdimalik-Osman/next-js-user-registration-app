'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Table } from 'reactstrap';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const deleteUser = async (id) => {
    await fetch(`/api/users?userId=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="container">
      <h1>User List</h1>
      <Link href="/add-user">
        <Button color="primary">Add User</Button>
      </Link>
      <Table className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link href={`/edit-user/${user.id}`}>
                  <Button className='mx-2' color="warning">Edit</Button>
                </Link>
                <Button color="danger" onClick={() => deleteUser(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
