const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "icon.png"
  })

  win.loadFile('index.html')
  win.removeMenu()
}

app.whenReady().then(() => {
  createWindow()
})
