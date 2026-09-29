const { validateRegistration } = require("../src/registration");

test("valid registration passes", () => {
  const r = validateRegistration({ name: "Asha", email: "a@b.com", phone: "9876543210" });
  expect(r.valid).toBe(true);
});

test("invalid email fails", () => {
  const r = validateRegistration({ name: "Asha", email: "bad", phone: "9876543210" });
  expect(r.valid).toBe(false);
});

test("short phone fails", () => {
  const r = validateRegistration({ name: "Asha", email: "a@b.com", phone: "123" });
  expect(r.valid).toBe(false);
});