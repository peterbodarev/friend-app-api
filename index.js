const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("server is up"));

let users = [
  {
    id: "1",
    firstName: "Terry",
    lastName: "Medhurst",
    email: "atuny0@sohu.com",
    phone: "+63 791 675 8914",
    username: "@atuny0",
  },
  {
    id: "2",
    firstName: "Sheldon",
    lastName: "Quigley",
    email: "hbingley1@plala.or.jp",
    phone: "+7 813 117 7139",
    username: "@hbingley1",
  },
  {
    id: "3",
    firstName: "Terrill",
    lastName: "Hills",
    email: "rshawe2@51.la",
    phone: "+63 739 292 7942",
    username: "@rshawe2",
  },
];

app.get("/users", (req, res) => {
  res.send({
    success: true,
    message: "data fetched successfully",
    data: users,
  });
});

app.post("/users", (req, res) => {
  const { firstName, lastName, email, phone, username } = req.body;
  if (firstName && lastName && email && phone && username) {
    const newUser = {
      id: (users.length + 1).toString(),
      firstName,
      lastName,
      email,
      phone,
      username,
    };
    users.push(newUser);

    res.send({
      success: true,
      message: "data added successfully",
      data: newUser,
    });
  } else {
    const errors = [];

    const fieldsArray = ["firstName", "lastName", "email", "phone", "username"];
    fieldsArray.forEach((fieldName) => {
      if (!req.body[fieldName]) {
        errors.push({
          field: fieldName,
          error: `${fieldName} is required!`,
        });
      }
    });

    res.send({
      success: false,
      message: "validation error",
      errors,
    });
  }
});

app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, email, phone, username } = req.body;
  const userIndexById = users.findIndex((i) => i.id === id);

  if (
    userIndexById > -1 &&
    firstName &&
    lastName &&
    email &&
    phone &&
    username
  ) {
    const newUser = {
      id,
      firstName,
      lastName,
      email,
      phone,
      username,
    };
    users[userIndexById] = newUser;

    res.send({
      success: true,
      message: "data updated successfully",
      data: newUser,
    });
  } else {
    const errors = [];
    if (userIndexById === -1) {
      errors.push({
        field: "id",
        error: "User not found",
      });
    }

    const fieldsArray = ["firstName", "lastName", "email", "phone", "username"];
    fieldsArray.forEach((fieldName) => {
      if (!req.body[fieldName]) {
        errors.push({
          field: fieldName,
          error: `${fieldName} is required!`,
        });
      }
    });

    res.send({
      success: false,
      message: "Not found and/or validation error",
      errors,
    });
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const userIndexById = users.findIndex((i) => i.id === id);
  if (userIndexById > -1) {
    users = users.filter((i, index) => index !== userIndexById);

    res.send({
      success: true,
      message: "user deleted successfully",
    });
  } else {
    res.send({
      success: false,
      message: "Not found",
    });
  }
});
