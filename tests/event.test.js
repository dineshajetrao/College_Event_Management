const { createEvent } = require("../src/event");

test("creates an event with default venue", () => {
  expect(createEvent({ title: "Tech Fest", date: "2026-10-10" }).venue).toBe("TBD");
});

test("throws without title", () => {
  expect(() => createEvent({ date: "2026-10-10" })).toThrow();
});
