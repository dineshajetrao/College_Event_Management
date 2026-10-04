function eventReport(events, registrations) {
  return events.map(e => ({
    title: e.title,
    count: registrations.filter(r => r.event === e.title).length
  }));
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { eventReport };
} else {
  window.ReportLib = { eventReport };
}
