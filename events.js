const eventDates = {
  '2025-05-18': 'Printmaking in the Park — Riverside Green, 11am–3pm',
  '2025-06-06': 'In Full Color: Youth Showcase — Common Thread Gallery, 6–9pm',
  '2025-06-22': 'Summer Solstice Social — Common Thread Courtyard, 5–8pm'
};
let displayedDate = new Date(2025, 5, 1);
const monthLabel = document.querySelector('#calendar-month');
const daysContainer = document.querySelector('#calendar-days');
const calendarMessage = document.querySelector('#calendar-message');
const calendarSignup = document.querySelector('#calendar-signup');
const keyFor = (year, month, day) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
function drawCalendar() {
  const year = displayedDate.getFullYear();
  const month = displayedDate.getMonth();
  monthLabel.textContent = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(displayedDate);
  daysContainer.innerHTML = '';
  for (let i = 0; i < new Date(year, month, 1).getDay(); i += 1) daysContainer.append(document.createElement('span'));
  const totalDays = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= totalDays; day += 1) {
    const dateKey = keyFor(year, month, day);
    const dayButton = document.createElement('button');
    dayButton.textContent = day;
    if (eventDates[dateKey]) { dayButton.className = 'has-event'; dayButton.title = 'View event'; dayButton.addEventListener('click', () => { calendarMessage.textContent = eventDates[dateKey]; calendarSignup.href = `mailto:hello@commonthreadarts.org?subject=${encodeURIComponent(`Event signup: ${eventDates[dateKey].split(' — ')[0]}`)}`; calendarSignup.hidden = false; }); }
    daysContainer.append(dayButton);
  }
}
document.querySelector('#previous-month').addEventListener('click', () => { displayedDate.setMonth(displayedDate.getMonth() - 1); drawCalendar(); });
document.querySelector('#next-month').addEventListener('click', () => { displayedDate.setMonth(displayedDate.getMonth() + 1); drawCalendar(); });
drawCalendar();
