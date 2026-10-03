const users = { admin: "admin123", student: "student123" };

function login(username, password) {
  return Object.prototype.hasOwnProperty.call(users, username) &&
         users[username] === password;
}

module.exports = { login };
