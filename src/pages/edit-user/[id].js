import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function EditUser() {
  const [user, setUser] = useState({ name: '', email: '' });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/users`)
        .then(response => response.json())
        .then(data => {
          const userToEdit = data.find(user => user.id === parseInt(id));
          setUser(userToEdit);
        });
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: parseInt(id), ...user })
    });

    router.push('/');
  };

  return (
    <div className="container">
      <h1>Edit User</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" value={user.name} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" value={user.email} onChange={handleChange} required />
        </FormGroup>
        <Button type="submit" color="primary">Update</Button>
      </Form>
    </div>
  );
}
