//kdo jsem abych komentoval svůj kód

var url = ""
var username = ""
var password = ""

document.querySelectorAll("#credentialDiv input").forEach((element) => element.addEventListener("change", updateValues))
document.querySelectorAll("#credentialDiv input").forEach((element) => element.addEventListener("change", renderAll))
document.querySelectorAll("#credentialDiv input").forEach((element) => element.addEventListener("change", saveCredentials))
document.getElementById("weekSelector").addEventListener("change", renderTimetable)

loadCredentials()
renderAll()

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
        lessonCellClass = document.createElement("p")
        lessonCellTeacher = document.createElement("p")
        lessonCellLabel = document.createElement("p")
        try {
          output.Subjects.forEach((subject) => {if (subject.Id == Lesson.SubjectId) {lessonCellLabel.innerHTML = subject.Abbrev}})
          output.Rooms.forEach((room) => {if (room.Id == Lesson.RoomId) {lessonCellClass.innerHTML = room.Abbrev}})
          output.Teachers.forEach((teacher) => {if (teacher.Id == Lesson.TeacherId) {lessonCellTeacher.innerHTML = teacher.Abbrev}})
          if (Lesson.Change != null) {lessonCell.style.backgroundColor = "#d5767d"}
        } catch {}
        try {if (lessonCellLabel.innerHTML == "") {
          lessonCellLabel.innerHTML = Lesson.Change.TypeAbbrev
          lessonCell.style.backgroundColor = (Lesson.Change.ChangeType == "Removed") ? "#d5767d" : "#a0cf94"
        }} catch {}
        lessonCell.appendChild(lessonCellClass)
        lessonCell.appendChild(lessonCellLabel)
        lessonCell.appendChild(lessonCellTeacher)
        lessonCell.setAttribute("class","lessonCell")
        dayRow.appendChild(lessonCell)
      })
    }
    document.getElementById("timetableEmbed").appendChild(dayRow)
  })
}

async function renderGrades() {
  gradeJson = await retrieveGrades(url, await getAccessToken(url, username, password))
  gradeJson.Subjects.forEach((subject) => {
    subjectRow = document.createElement("div")
    subjectRow.setAttribute("class","subjectRow")
    subjectHolder = document.createElement("div")
    subjectLabel = document.createElement("p")
    subjectLabel.innerHTML = subject.Subject.Abbrev
    average = document.createElement("p")
    average.innerHTML = subject.AverageText
    subjectHolder.appendChild(subjectLabel)
    subjectHolder.appendChild(average)
    if (subject.AverageText.includes("%")) {
      totalPoints = document.createElement("p")
      var total = 0, max = 0
      subject.Marks.forEach((mark) => {total += (isNaN(+mark.MarkText) ? 0 : +mark.MarkText)})
      subject.Marks.forEach((mark) => {max += (mark.MaxPoints == 100) ? 0 : mark.MaxPoints})
      totalPoints.innerHTML = `${total}/${max}`
      subjectHolder.appendChild(totalPoints)
    }
    subjectRow.appendChild(subjectHolder)
    subject.Marks.forEach((mark) => {
      markCell = document.createElement("div")
      markCell.setAttribute("class", "markCell")
      if (mark.IsPoints) {
        markCell.innerHTML = `${mark.MarkText}/${mark.MaxPoints}`
      } else {
        markCell.innerHTML = mark.MarkText
      }
      subjectRow.appendChild(markCell)
    })
    document.getElementById("gradesEmbed").appendChild(subjectRow)
  })
}

function renderAll() {
  renderTimetable()
  renderGrades()
}
