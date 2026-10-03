const { eventReport } = require("../src/report");

test("counts registrations per event", () => {
  const out = eventReport([{ title: "Fest" }], [{ event: "Fest" }, { event: "Fest" }]);
  expect(out[0].count).toBe(2);
});
