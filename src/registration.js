function validateRegistration({ name, email, phone }) {
  const errors = [];
  if (!name || name.trim().length < 2) errors.push("Name is required");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "")) errors.push("Invalid email");
  if (!/^\d{10}$/.test(phone || "")) errors.push("Phone must be 10 digits");
  return { valid: errors.length === 0, errors };
}

function registerStudent(students, data) {
  const errors = validateRegistration(data).errors.slice();
  if (!data.password || data.password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }
  if (errors.length > 0) return { ok: false, errors };
  const email = data.email.trim().toLowerCase();
  if (students.some((s) => s.email === email)) {
    return { ok: false, errors: ["Email is already registered"] };
  }
  const student = {
    name: data.name.trim(),
    email,
    phone: data.phone,
    password: data.password
  };
  return { ok: true, students: [...students, student] };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { validateRegistration, registerStudent };
} else {
  window.RegistrationLib = { validateRegistration, registerStudent };
}
