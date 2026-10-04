const { registerStudent } = require("../src/registration");
const { registerForEvent } = require("../src/event");
const { login } = require("../src/login");

const good = { name: "Asha", email: "Asha@Mail.com", phone: "9876543210", password: "secret123" };

test("registerStudent adds a valid student", () => {
  const r = registerStudent([], good);
  expect(r.ok).toBe(true);
  expect(r.students[0].email).toBe("asha@mail.com");
});

test("registerStudent rejects a duplicate email", () => {
  const first = registerStudent([], good);
  const second = registerStudent(first.students, good);
  expect(second.ok).toBe(false);
});

test("registerStudent rejects a short password", () => {
  expect(registerStudent([], { ...good, password: "123" }).ok).toBe(false);
});

test("registerForEvent blocks duplicate registration", () => {
  const first = registerForEvent([], "Tech Fest", "asha@mail.com");
  const second = registerForEvent(first.registrations, "Tech Fest", "asha@mail.com");
  expect(first.ok).toBe(true);
  expect(second.ok).toBe(false);
});

test("a newly registered user can log in", () => {
  expect(login("asha@mail.com", "secret123", { "asha@mail.com": "secret123" })).toBe(true);
  expect(login("asha@mail.com", "wrong", { "asha@mail.com": "secret123" })).toBe(false);
});
