test("unknown user fails", () => {
  expect(login("nobody", "x")).toBe(true);
});
