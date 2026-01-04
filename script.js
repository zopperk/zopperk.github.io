const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxsTm1mqfzjitrnV4izqFWSHq7BWp_zZEfbY1q3aQO66hnK0ewYGk2a5_Q2zLSJNmVj/exec";

let selectedGrade = "";

const screens = {
  grade: document.getElementById("screen-grade"),
  notes: document.getElementById("screen-notes"),
  thanks: document.getElementById("screen-thanks"),
};

// Show today's date on all screens
const todayText = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});
document.querySelectorAll(".today").forEach(el => (el.textContent = todayText));

// Grade buttons — render a styled pill on the notes screen
const selectedGradeEl = document.getElementById("selected-grade");

function renderSelectedPill(sourceButton) {
  const computed = window.getComputedStyle(sourceButton);
  const pill = document.createElement("div");
  pill.className = "selected-pill";
  pill.innerHTML = sourceButton.innerHTML;

  // Copy key visual styles from the source button so the pill matches
  const props = [
    "backgroundColor",
    "color",
    "padding",
    "borderRadius",
    "minWidth",
    "margin",
    "fontSize",
    "textAlign",
    "border",
  ];
  props.forEach(p => {
    try {
      pill.style[p] = computed[p];
    } catch (e) {}
  });

  // Ensure block layout and centered margin
  pill.style.display = "block";
  pill.style.margin = pill.style.margin || "10px auto";

  // Force fixed width to match screen 1 buttons and ensure only the
  // <b> element remains bold.
  pill.style.width = "250px";
  pill.style.boxSizing = "border-box";
  pill.style.fontWeight = "normal";

  selectedGradeEl.innerHTML = "";
  selectedGradeEl.appendChild(pill);
}

document.querySelectorAll("[data-grade]").forEach(button => {
  button.addEventListener("click", () => {
    selectedGrade = button.dataset.grade;
    renderSelectedPill(button);
    showScreen("notes");
  });
});

// Submit
document.getElementById("submit").addEventListener("click", async () => {
  const notes = document.getElementById("notes").value;

  await fetch(SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grade: selectedGrade,
      notes: notes,
    }),
  });

  showScreen("thanks");
});

// Back
document.getElementById("back").addEventListener("click", () => {
  showScreen("grade");
});

// Screen switcher
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}