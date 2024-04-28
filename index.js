//kdo jsem abych komentoval svůj kód

var url = ""
var username = ""
var password = ""

document.querySelectorAll("#credentialDiv input").forEach((element) => element.addEventListener("change", updateValues))
document.querySelectorAll("#credentialDiv input").forEach((element) => element.addEventListener("change", renderTimetable))
document.querySelectorAll("#credentialDiv input").forEach((element) => element.addEventListener("change", saveCredentials))
document.getElementById("weekSelector").addEventListener("change", renderTimetable)

loadCredentials()
renderTimetable()

function updateValues() {
  url = document.getElementById("schoolUrlInput").value
  username = document.getElementById("usernameInput").value
  password = document.getElementById("passwordInput").value
}

function loadCredentials() {
  document.getElementById("schoolUrlInput").value = localStorage.getItem("savedUrl")
  document.getElementById("usernameInput").value = localStorage.getItem("savedUsername")
  document.getElementById("passwordInput").value = localStorage.getItem("savedPassword")
}
function saveCredentials() {
  updateValues()
  localStorage.setItem("savedUrl",url)
  localStorage.setItem("savedUsername",username)
  localStorage.setItem("savedPassword",password)
}

function differentLogin() {
  document.getElementById("schoolUrlInput").value = ""
  document.getElementById("usernameInput").value = ""
  document.getElementById("passwordInput").value = ""
  localStorage.clear()
  renderTimetable()
}

async function renderTimetable() {
  updateValues()
  var output = await retrieveTimetable(url, await getAccessToken(url, username, password), +document.getElementById("weekSelector").value)
  document.querySelectorAll(".dayRow").forEach((element) => element.remove())
  days = output.Days.forEach((day) => {
    dayRow = document.createElement("div")
    dayRow.setAttribute("class","dayRow")
    if (day.DayType != "WorkDay") {
      dayCell = document.createElement("div")
      dayCell.setAttribute("class","lessonCell")
      dayCell.innerHTML = day.DayDescription
      dayCell.style.width = "100vw"
      dayCell.style.backgroundColor = "#61b0ff"
      dayRow.appendChild(dayCell)
    } else {
      output.Hours.forEach((hour) => {
        var Lesson
        day.Atoms.forEach((selectedLesson) => {if (selectedLesson.HourId == hour.Id) {Lesson = selectedLesson}})
        lessonCell = document.createElement("div")
        try {
          output.Subjects.forEach((subject) => {if (subject.Id == Lesson.SubjectId) {lessonCell.innerHTML = subject.Abbrev}})
        } catch {}
        try {if (lessonCell.innerHTML == "") {
          lessonCell.innerHTML = Lesson.Change.TypeAbbrev
          lessonCell.style.backgroundColor = "#d5767d"
        }} catch {}
        lessonCell.setAttribute("class","lessonCell")
        dayRow.appendChild(lessonCell)
      })
    }
    document.getElementById("timetableEmbed").appendChild(dayRow)
  })
}
