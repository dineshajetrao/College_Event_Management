function createEvent({ title, date, venue }) {
  if (!title || !date) throw new Error("Title and date are required");
  return { title, date, venue: venue || "TBD" };
}

function registerForEvent(registrations, eventTitle, studentId) {
  const exists = registrations.some(
    (r) => r.event === eventTitle && r.student === studentId
  );
  if (exists) return { ok: false, error: "Already registered for this event" };
  return {
    ok: true,
    registrations: [...registrations, { event: eventTitle, student: studentId }]
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { createEvent, registerForEvent };
} else {
  window.EventLib = { createEvent, registerForEvent };
}
