function eventReport(events, registrations) {
  return events.map(e => ({
    title: e.title,
    count: registrations.filter(r => r.event === e.title).length
  }));
}

module.exports = { eventReport };
