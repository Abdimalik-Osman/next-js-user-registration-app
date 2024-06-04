import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {  name, email };

    await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    router.push('/');
  };

  return (
    <div className="container">
      <h1>Add User</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </FormGroup>
        <Button type="submit" color="primary">Add</Button>
      </Form>
    </div>
  );
}
