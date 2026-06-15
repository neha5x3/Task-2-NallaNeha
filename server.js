const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Sample Data
let users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com"
  }
];

// Home Route
app.get("/", (req, res) => {
  res.send("Backend API is Running!");
});

// GET All Users
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// GET User By ID
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// POST Create User
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and Email are required"
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser
  });
});

// PUT Update User
app.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const { name, email } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user
  });
});

// DELETE User
app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = users.findIndex(user => user.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  users.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});