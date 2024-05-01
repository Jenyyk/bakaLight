const { app, BrowserWindow } = require('electron')

if(require('electron-squirrel-startup')) return;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "icon.png",
    autoHideMenuBar: true
  })

  win.loadFile('index.html')
  win.setIcon('icon.png')
  win.removeMenu()
  win.setMenuBarVisibility(false)
}

app.whenReady().then(() => {
  createWindow()
})
