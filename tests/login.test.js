test("unknown user fails", () => {
  expect(login("nobody", "x")).toBe(false);
});
