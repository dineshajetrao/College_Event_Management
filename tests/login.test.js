const { login } = require("../src/login");

test("valid login works", () => {
  expect(login("admin", "admin123")).toBe(true);
});

test("wrong password fails", () => {
  expect(login("admin", "wrong")).toBe(false);
});

test("unknown user fails", () => {
  expect(login("nobody", "x")).toBe(false);
});
