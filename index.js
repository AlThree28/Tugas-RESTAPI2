const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(200).json({ message: 'User deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
