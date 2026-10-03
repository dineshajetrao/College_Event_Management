function validateRegistration({ name, email, phone }) {
  const errors = [];
  if (!name || name.trim().length < 2) errors.push("Name is required");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "")) errors.push("Invalid email");
  if (!/^\d{10}$/.test(phone || "")) errors.push("Phone must be 10 digits");
  return { valid: errors.length === 0, errors };
}

module.exports = { validateRegistration };