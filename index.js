var url = ""
var username = ""
var password = ""

document.querySelectorAll("#credentialDiv input").forEach((element) => element.addEventListener("change", updateValues))
document.querySelectorAll("#credentialDiv input").forEach((element) => element.addEventListener("change", renderTimetable))
document.getElementById("weekSelector").addEventListener("change", renderTimetable)

function updateValues() {
  url = document.getElementById("schoolUrlInput").value
  username = document.getElementById("usernameInput").value
  password = document.getElementById("passwordInput").value
}

async function renderTimetable() {
  updateValues()
  var output = await retrieveTimetable(url, await getAccessToken(url, username, password), +document.getElementById("weekSelector").value)
  document.querySelectorAll(".dayRow").forEach((element) => element.remove())
  days = output.Days.forEach((day) => {
    dayRow = document.createElement("div")
    dayRow.setAttribute("class","dayRow")
    output.Hours.forEach((hour) => {
      var Lesson
      day.Atoms.forEach((selectedLesson) => {if (selectedLesson.HourId == hour.Id) {Lesson = selectedLesson}})
      lessonCell = document.createElement("div")
      try {
        output.Subjects.forEach((subject) => {if (subject.Id == Lesson.SubjectId) {lessonCell.innerHTML = subject.Abbrev}})
      } catch {}
      try {if (lessonCell.innerHTML == "") {
        lessonCell.innerHTML = Lesson.Change.TypeAbbrev
        lessonCell.style.backgroundColor = "#ff000020"
      }} catch {}
      try {if (lessonCell.innerHTML == "" && day.DayType != "WorkDay") {
        lessonCell.innerHTML = day.DayDescription
        lessonCell.style.backgroundColor = "#2299ff20"
      }} catch {}
      lessonCell.setAttribute("class","lessonCell")
      dayRow.appendChild(lessonCell)
    })
    document.getElementById("timetableEmbed").appendChild(dayRow)
  })
}
