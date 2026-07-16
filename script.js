const birthForm = document.getElementById("birthForm");
const birthdateInput = document.getElementById("birthdateInput");
const result = document.getElementById("result");
const ageValue = document.getElementById("ageValue");
const daysValue = document.getElementById("daysValue");
const hoursValue = document.getElementById("hoursValue");
const minutesValue = document.getElementById("minutesValue");
const secondsValue = document.getElementById("secondsValue");
const countdownSub = document.getElementById("countdownSub");
const factText = document.getElementById("factText");

const WEEKDAYS = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

let birthdate = null;
let intervalId = null;

function calcAge(birth, today) {
  let age = today.getFullYear() - birth.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}

function nextBirthday(birth, today) {
  let next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (next < today) {
    next = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }
  return next;
}

function update() {
  const today = new Date();
  const age = calcAge(birthdate, today);
  const next = nextBirthday(birthdate, today);
  const diff = next - today;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  ageValue.textContent = age;
  daysValue.textContent = days;
  hoursValue.textContent = String(hours).padStart(2, "0");
  minutesValue.textContent = String(minutes).padStart(2, "0");
  secondsValue.textContent = String(seconds).padStart(2, "0");

  if (days === 0 && hours === 0 && minutes === 0 && seconds <= 1) {
    countdownSub.textContent = "🎉 Heute ist der Tag!";
  } else {
    countdownSub.textContent = `bis zum ${age + 1}. Geburtstag`;
  }
}

birthForm.addEventListener("submit", (e) => {
  e.preventDefault();
  birthdate = new Date(birthdateInput.value + "T00:00:00");

  const weekday = WEEKDAYS[birthdate.getDay()];
  factText.textContent = `Du wurdest an einem ${weekday} geboren.`;

  result.hidden = false;
  clearInterval(intervalId);
  update();
  intervalId = setInterval(update, 1000);
});
