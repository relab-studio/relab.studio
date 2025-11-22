// main.js

// 1. Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// 2. State dropdown with all 50 states
const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];

const stateSelect = document.getElementById("stateSelect");
if (stateSelect) {
  stateSelect.innerHTML = states
    .map((s) => `<option value="${s}">${s}</option>`)
    .join("");
  // default to Georgia because, duh :)
  stateSelect.value = "Georgia";
}

// 3. Simple signup capture (front-end only for now)
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    if (!name || !email) return;

    const user = { name, email, createdAt: new Date().toISOString() };
    localStorage.setItem("relabUser", JSON.stringify(user));

    alert(`Welcome to RE/LAB, ${name}! Your account is created locally. 
To accept payments later, connect Stripe on the backend.`);
    signupForm.reset();
  });
}

// 4. Use stored user name for a simple "login"
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const raw = localStorage.getItem("relabUser");
    if (!raw) {
      alert("No saved RE/LAB account found on this device yet.");
      return;
    }
    const user = JSON.parse(raw);
    alert(`Welcome back, ${user.name}!`);
  });
}

// 5. Smooth scroll to section function (used on Mock Exam button)
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
window.scrollToSection = scrollToSection;

// 6. Buttons that should eventually open Stripe / membership
["joinBtn", "heroTrialBtn", "startMemberQuizBtn"].forEach((id) => {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener("click", () => {
    alert(
      "This is where Stripe checkout or your membership portal will open once it's connected."
    );
  });
});

// 7. Free 10-question quiz placeholder
const startFreeQuizBtn = document.getElementById("startFreeQuizBtn");
if (startFreeQuizBtn) {
  startFreeQuizBtn.addEventListener("click", () => {
    const chosenState = stateSelect ? stateSelect.value : "Georgia";
    alert(
      `Here we’ll load a 10-question warm-up for ${chosenState}. We’ll build the quiz engine next.`
    );
  });

// main.js

// 1. Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// 2. State dropdown with all 50 states
const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];

const stateSelect = document.getElementById("stateSelect");
if (stateSelect) {
  stateSelect.innerHTML = states
    .map((s) => `<option value="${s}">${s}</option>`)
    .join("");
  // default to Georgia because, duh :)
  stateSelect.value = "Georgia";
}

// 3. Simple signup capture (front-end only for now)
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    if (!name || !email) return;

    const user = { name, email, createdAt: new Date().toISOString() };
    localStorage.setItem("relabUser", JSON.stringify(user));

    alert(`Welcome to RE/LAB, ${name}! Your account is created locally. 
To accept payments later, connect Stripe on the backend.`);
    signupForm.reset();
  });
}

// 4. Use stored user name for a simple "login"
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const raw = localStorage.getItem("relabUser");
    if (!raw) {
      alert("No saved RE/LAB account found on this device yet.");
      return;
    }
    const user = JSON.parse(raw);
    alert(`Welcome back, ${user.name}!`);
  });
}

// 5. Smooth scroll to section function (used on Mock Exam button)
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
window.scrollToSection = scrollToSection;

// 6. Buttons that should eventually open Stripe / membership
["joinBtn", "heroTrialBtn", "startMemberQuizBtn"].forEach((id) => {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener("click", () => {
    alert(
      "This is where Stripe checkout or your membership portal will open once it's connected."
    );
  });
});

// 7. Free 10-question quiz placeholder
const startFreeQuizBtn = document.getElementById("startFreeQuizBtn");
if (startFreeQuizBtn) {
  startFreeQuizBtn.addEventListener("click", () => {
    const chosenState = stateSelect ? stateSelect.value : "Georgia";
    alert(
      `Here we’ll load a 10-question warm-up for ${chosenState}. We’ll build the quiz engine next.`
    );
  });
}
