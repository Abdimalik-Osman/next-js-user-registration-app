import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

function readData() {
  const fileData = fs.readFileSync(dataFilePath);
  return JSON.parse(fileData);
}

function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const users = readData();
      res.status(200).json(users);
      break;
    case 'POST':  
    
      const newUser = req.body;
      const data = readData();
      const newId = data.length > 0 ? Math.max(...data.map(user => user.id)) + 1 : 1;
      newUser.id = newId;
      data.push(newUser);
      writeData(data);
      res.status(201).json(newUser);
      break;
    case 'PUT':
      const { id, ...updatedUser } = req.body;
      let usersData = readData();
      usersData = usersData.map(user => (user.id === id ? { id, ...updatedUser } : user));
      writeData(usersData);
      res.status(200).json({ id, ...updatedUser });
      break;
    case 'DELETE':
      const { userId } = req.query;
      let usersList = readData();
      usersList = usersList.filter(user => user.id !== parseInt(userId));
      writeData(usersList);
      res.status(200).json({ message: `User with id ${userId} deleted` });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
