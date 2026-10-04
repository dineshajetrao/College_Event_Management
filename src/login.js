const defaultUsers = { admin: "admin123", student: "student123" };

function login(username, password, extraUsers = {}) {
  const all = { ...defaultUsers, ...extraUsers };
  return Object.prototype.hasOwnProperty.call(all, username) &&
         all[username] === password;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { login };
} else {
  window.LoginLib = { login };
}
