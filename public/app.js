(function () {
  const L = window.LoginLib;
  const R = window.RegistrationLib;
  const E = window.EventLib;
  const P = window.ReportLib;
  const K = { students: "cem_students", events: "cem_events", regs: "cem_regs", session: "cem_session" };

  function load(key, fallback) {
    try {
      const v = JSON.parse(localStorage.getItem(key));
      return v === null ? fallback : v;
    } catch (e) { return fallback; }
  }
  function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  const $ = (id) => document.getElementById(id);
  function h(tag, text, cls) {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (cls) el.className = cls;
    return el;
  }

  let toastTimer;
  function notify(text, ok) {
    const t = $("toast");
    t.textContent = text;
    t.className = ok ? "ok" : "err";
    t.style.display = "block";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.style.display = "none"; }, 3000);
  }

  if (load(K.events, null) === null) {
    save(K.events, [
      { title: "Tech Fest", date: "2026-10-20", venue: "Main Auditorium" },
      { title: "Cultural Day", date: "2026-11-05", venue: "College Ground" }
    ]);
  }
  let session = load(K.session, null);

  function showAuth(which) {
    $("login-form").hidden = which !== "login";
    $("register-form").hidden = which !== "register";
    $("auth-tab-login").classList.toggle("active", which === "login");
    $("auth-tab-register").classList.toggle("active", which === "register");
  }
  function showView(name) {
    document.querySelectorAll(".view").forEach((v) => { v.hidden = v.id !== "view-" + name; });
    document.querySelectorAll(".nav").forEach((b) => b.classList.toggle("active", b.dataset.view === name));
  }

  function renderEvents() {
    const events = load(K.events, []);
    const regs = load(K.regs, []);
    const box = $("event-list");
    box.innerHTML = "";
    if (events.length === 0) box.appendChild(h("p", "No events yet.", "muted"));
    events.forEach((ev) => {
      const card = h("div", undefined, "card");
      card.appendChild(h("h3", ev.title));
      card.appendChild(h("p", ev.date + "  |  " + ev.venue));
      const count = regs.filter((r) => r.event === ev.title).length;
      card.appendChild(h("p", count + " registered", "muted"));
      if (session.role === "admin") {
        const del = h("button", "Delete", "danger");
        del.onclick = () => {
          save(K.events, load(K.events, []).filter((x) => x.title !== ev.title));
          save(K.regs, load(K.regs, []).filter((r) => r.event !== ev.title));
          render();
        };
        card.appendChild(del);
      } else {
        const already = regs.some((r) => r.event === ev.title && r.student === session.username);
        const btn = h("button", already ? "Registered" : "Register");
        btn.disabled = already;
        btn.onclick = () => {
          const res = E.registerForEvent(load(K.regs, []), ev.title, session.username);
          if (!res.ok) { notify(res.error, false); return; }
          save(K.regs, res.registrations);
          notify("Registered for " + ev.title, true);
          render();
        };
        card.appendChild(btn);
      }
      box.appendChild(card);
    });
  }

  function renderMine() {
    const box = $("mine-list");
    box.innerHTML = "";
    if (session.role === "admin") {
      box.appendChild(h("p", "Organisers do not register for events.", "muted"));
      return;
    }
    const mine = load(K.regs, []).filter((r) => r.student === session.username);
    if (mine.length === 0) box.appendChild(h("p", "You have not registered for any event yet.", "muted"));
    mine.forEach((r) => {
      const row = h("div", undefined, "row");
      row.appendChild(h("span", r.event));
      const cancel = h("button", "Cancel", "danger");
      cancel.onclick = () => {
        save(K.regs, load(K.regs, []).filter((x) => !(x.event === r.event && x.student === r.student)));
        render();
      };
      row.appendChild(cancel);
      box.appendChild(row);
    });
  }

  function renderReport() {
    const box = $("report-box");
    box.innerHTML = "";
    if (session.role !== "admin") return;
    const rows = P.eventReport(load(K.events, []), load(K.regs, []));
    const table = h("table");
    const head = h("tr");
    ["Event", "Registrations"].forEach((t) => head.appendChild(h("th", t)));
    table.appendChild(head);
    let total = 0;
    rows.forEach((r) => {
      total += r.count;
      const tr = h("tr");
      tr.appendChild(h("td", r.title));
      tr.appendChild(h("td", String(r.count)));
      table.appendChild(tr);
    });
    box.appendChild(table);
    box.appendChild(h("p", "Total registrations: " + total + "  |  Registered students: " + load(K.students, []).length, "muted"));
  }

  function render() {
    const loggedIn = session !== null;
    $("auth").hidden = loggedIn;
    $("app").hidden = !loggedIn;
    $("userbar").hidden = !loggedIn;
    if (!loggedIn) return;
    $("whoami").textContent = session.name + " (" + session.role + ")";
    $("admin-box").hidden = session.role !== "admin";
    $("nav-report").hidden = session.role !== "admin";
    renderEvents();
    renderMine();
    renderReport();
  }

  $("auth-tab-login").onclick = () => showAuth("login");
  $("auth-tab-register").onclick = () => showAuth("register");
  document.querySelectorAll(".nav").forEach((b) => { b.onclick = () => showView(b.dataset.view); });

  $("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = $("login-user").value.trim().toLowerCase();
    const password = $("login-pass").value;
    const students = load(K.students, []);
    const extra = {};
    students.forEach((s) => { extra[s.email] = s.password; });
    if (!L.login(username, password, extra)) { notify("Invalid username or password", false); return; }
    const found = students.find((s) => s.email === username);
    session = { username, name: found ? found.name : username, role: username === "admin" ? "admin" : "student" };
    save(K.session, session);
    e.target.reset();
    showView("events");
    render();
    notify("Welcome, " + session.name, true);
  });

  $("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const res = R.registerStudent(load(K.students, []), {
      name: $("reg-name").value.trim(),
      email: $("reg-email").value.trim(),
      phone: $("reg-phone").value.trim(),
      password: $("reg-pass").value
    });
    if (!res.ok) { notify(res.errors.join(", "), false); return; }
    save(K.students, res.students);
    e.target.reset();
    showAuth("login");
    notify("Account created. Please log in.", true);
  });

  $("event-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const ev = E.createEvent({
        title: $("ev-title").value.trim(),
        date: $("ev-date").value,
        venue: $("ev-venue").value.trim()
      });
      const events = load(K.events, []);
      if (events.some((x) => x.title === ev.title)) { notify("An event with this title already exists", false); return; }
      events.push(ev);
      save(K.events, events);
      e.target.reset();
      notify("Event created", true);
      render();
    } catch (err) { notify(err.message, false); }
  });

  $("logout").onclick = () => {
    session = null;
    save(K.session, null);
    showAuth("login");
    render();
  };

  render();
})();
