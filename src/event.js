function createEvent({ title, date, venue }) {
  if (!title || !date) throw new Error("Title and date are required");
  return { title, date, venue: venue || "TBD" };
}

module.exports = { createEvent };
