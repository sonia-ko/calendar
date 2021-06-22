// DECLARING VARIABLES

// DOM elements
const container = document.querySelector(".container");
const btnOpenCalendar = document.querySelector(".open-calendar");

// dates:
let initialMonth, initialYear;
let today = new Date();
let month = (initialMonth = today.getMonth() + 1);
let date = today.getDate();
let year = (initialYear = today.getFullYear());
let numberOfDaysInMonth = new Date(year, month, 0).getDate();
let numberOfDaysInPrevMonth = new Date(year, month - 1, 0).getDate();

// prettier-ignore
const months = [ "December", "January", "February", "March", "April", "May","June", "July", "August", "September", "October", "November", "December"];

// calendar functionality
let currentMonthOpened = true;
let highlidtherEl;
let searchingForTheFirstDay = true;
let counter = 1;
let newMonthCounter = 1;
let previousMonthCounter = numberOfDaysInPrevMonth;

/////////// FUNCTIONS ///////////////////

function generateCalendarHeader() {
  let html = `<table> 
   
  <tr class="current-month">
<th class="arrow arrow-back">&lt;</th>
<th class="header-table" colspan="5">${months[month]} ${year}</th>
<th class="arrow arrow-next">&gt;</th>
</tr>
<tr>
          <th id="0">Sun</th>
          <th id="1">Mon</th>
          <th id="2">Tue</th>
          <th id="3">Wed</th>
          <th id="4">Thu</th>
          <th id="5">Fri</th>
          <th id="6">Sat</th>
           
        </tr> 
        </table>`;
  container.insertAdjacentHTML("beforeend", html);
}

function generateCalendarDates() {
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    document.querySelector("table").appendChild(row);

    for (let i = 0; i < 7; i++) {
      let td = document.createElement("td");
      td.classList.add(`day-${i}`);
      row.appendChild(td);
      fillTheTable(td);

      if (currentMonthOpened && td.textContent === date.toString()) {
        addTodayLabel(td);
      }
    }
  }
  generatePrevMonthDates();
}

function addTodayLabel(td) {
  td.classList.add("today");
  td.innerHTML = `${td.textContent}<br> today`;
}

function fillTheTable(td) {
  let firstDayInMonth = new Date(year, month - 1, 1).getDay();

  if (searchingForTheFirstDay) {
    if (td.classList.contains(`day-${firstDayInMonth}`)) {
      td.textContent = "1";
      td.classList.remove("date-inactive-prev");
      td.classList.add("date-active");
      searchingForTheFirstDay = false;
    } else {
      td.classList.add("date-inactive-prev");
      td.classList.remove("date-active");
    }
  } else {
    if (counter < numberOfDaysInMonth) {
      counter++;
      td.textContent = counter;
      td.classList.remove("date-inactive");
      td.classList.remove("date-inactive-prev");
      td.classList.add("date-active");
    } else {
      td.classList.remove("date-active");
      td.classList.add("date-inactive");
      td.textContent = newMonthCounter;
      newMonthCounter++;
    }
  }
}

function generatePrevMonthDates() {
  const daysOfPreMonth = document.querySelectorAll(".date-inactive-prev");

  for (let i = daysOfPreMonth.length - 1; i >= 0; i--) {
    daysOfPreMonth[i].textContent = previousMonthCounter;
    previousMonthCounter--;
  }
}

function switchMonths(param) {
  if (currentMonthOpened) {
    document.querySelector(".today").classList.add("today-inactive");
    document.querySelector(".today").classList.remove("today");
  }
  searchingForTheFirstDay = true;
  currentMonthOpened = false;

  if (param === "next") {
    month < 12 ? month++ : ((month = 1), year++);
  } else if (param === "prev") {
    month > 1 ? month-- : ((month = 12), year--);
  }

  today = new Date(year, month - 1, date);
  numberOfDaysInMonth = new Date(year, month, 0).getDate();
  counter = 1;
  numberOfDaysInPrevMonth = previousMonthCounter = new Date(
    year,
    month - 1,
    0
  ).getDate();

  document.querySelector(
    ".header-table"
  ).textContent = `${months[month]} ${year}`;
  let tds = [...document.querySelectorAll("td")];

  newMonthCounter = 1;

  tds.forEach(function (td) {
    fillTheTable(td);
  });

  generatePrevMonthDates();

  if (year === initialYear && month === initialMonth) {
    let td = document.querySelector(".today-inactive");
    addTodayLabel(td);
    currentMonthOpened = true;
  }
}

function removeHighligther() {
  if (highlidtherEl) {
    highlidtherEl.classList.remove("highlighted");
  }
}

////////////DOM events///////////////////

btnOpenCalendar.addEventListener("click", function () {
  btnOpenCalendar.classList.add("hidden");
  generateCalendarHeader();
  generateCalendarDates();
});

container.addEventListener("click", function (e) {
  if (e.target.classList.contains("date-active")) {
    if (highlidtherEl) {
      highlidtherEl.classList.remove("highlighted");
      highlidtherEl = e.target;
      e.target.classList.add("highlighted");
    } else {
      highlidtherEl = e.target;
      e.target.classList.add("highlighted");
    }
  } else if (e.target.classList.contains("arrow-next")) {
    switchMonths("next");
    removeHighligther();
  } else if (e.target.classList.contains("arrow-back")) {
    switchMonths("prev");
    removeHighligther();
  }
});
