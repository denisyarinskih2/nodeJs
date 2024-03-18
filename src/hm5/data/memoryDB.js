const { v4: uuidv4 } = require("uuid");

let users = [];

function getUsers() {
  return users.map((user) => {
    const {
      data: {
        user: { id, name, email },
      },
      links,
    } = user;
    return {
      data: {
        user: {
          id,
          name,
          email,
        },
        links,
      },
      error: null,
    };
  });
}

function createUser(userData) {
  const id = uuidv4();
  const newUser = {
    data: {
      user: {
        id,
        name: userData.name,
        email: userData.email,
      },
      links: {
        self: `/api/users${id}`,
        hobbies: `/api/users/${id}/hobbies`,
      },
    },
    error: null,
  };
  users.push(newUser);
  return newUser;
}

function deleteUser(userId) {
  const index = users.findIndex((user) => user.data.user.id === userId);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
}

function getUserHobbies(userId) {
  const user = users.find((user) => user.data.user.id === userId);
  let response = null;
  if (user) {
    return (response = {
      data: {
        hobbies: user && user.data.user.hobbies ? user.data.user.hobbies : [],
        links: {
          self: `/api/users${userId}`,
          hobbies: `/api/users/${userId}/hobbies`,
        },
      },
    });
  }

  return response;
}

function updateUserHobbies(userId, newHobbies) {
  const userIndex = users.findIndex((user) => user.data.user.id === userId);
  if (userIndex !== -1) {
    const {
      data: {
        user: { hobbies = [] },
      },
    } = users[userIndex];
    users[userIndex].data.user.hobbies = Array.from(
      new Set([...hobbies, ...newHobbies])
    );
    return users[userIndex].data.user.hobbies;
  }
  return null;
}

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  getUserHobbies,
  updateUserHobbies,
};
