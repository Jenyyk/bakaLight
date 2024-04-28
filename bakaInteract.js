//pro dokumentaci knihovny viz bakaInteract.md na githubu

// vrátí access token k zadanému účtu
async function getAccessToken(schoolUrl, inputUser, inputPassword, refreshToken = "") {
  var token = ""
  //pokusí se sehnat uložený refresh token
  refreshToken = localStorage.getItem("refreshToken")
  //nastaví data na odeslání podle toho, jestli sehnal refresh token
  if (refreshToken != "" && refreshToken != null && refreshToken != "undefined") {
    var bodyToSend =`client_id=ANDR&grant_type=refresh_token&refresh_token=${refreshToken}`
  } else {
    var bodyToSend = `client_id=ANDR&grant_type=password&username=${inputUser}&password=${inputPassword}`
  }

  //odešle žádost o acces token
  var response = await fetch(`${schoolUrl}/api/login`, {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: bodyToSend
  })
  json = await response.json()

  //error handling
  //error špatného hesla, často způsoben zavoláním funkce pouze s url školy a neplatným refresh tokenem
  if (json.error_description == 'Špatný login nebo heslo') {throw new Error("Špatný login nebo heslo")}
  //pokud selže s tím, že za to mohl neplatný čí vypršený refresh token, pošle žádost znovu za pomocí hesel (pokud jsou dostupná)
  else if (json.error_description == 'The specified refresh token is invalid.') {
    response = await fetch(`${schoolUrl}/api/login`, {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: `client_id=ANDR&grant_type=password&username=${inputUser}&password=${inputPassword}`
    })
    json = await response.json()
  }

  token = json.access_token
  localStorage.setItem("refreshToken",await json.refresh_token)

  return token
}


// vrátí rozvrh v json formátu
async function retrieveTimetable(schoolUrl, accessToken, weeksIntoFuture=0) {
  var dateInIsoFormat = new Date(+Date.now() + (604800000 * weeksIntoFuture)).toISOString().split('T')[0]
  response = await fetch(`${schoolUrl}/api/3/timetable/actual?date=${dateInIsoFormat}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  return await response.json()
}
