const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')

if(require('electron-squirrel-startup')) return;

let win;

const createMainWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    transparent: true,      // Enable window transparency
    frame: false,           // Disable window frame (optional, often paired with transparency)
    backgroundColor: '#00000000', // Fully transparent background
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: "./icon.png",
    autoHideMenuBar: true
  })

  globalShortcut.register('CommandOrControl+Shift+I', () => {
    const focused = BrowserWindow.getFocusedWindow();
    if (focused) focused.webContents.toggleDevTools();
  });


  win.loadFile('index.html')
  win.setIcon('icon.png')
  win.removeMenu()
  win.setMenuBarVisibility(false)
}

ipcMain.on('open-settings', () => {
  const popup = new BrowserWindow({
    width: 700,
    height: 600,
    parent: win,
    modal: true,
    show: false,
    autoHideMenuBar: true
  });

  popup.loadFile('settings.html');
  popup.removeMenu()
  popup.setMenuBarVisibility(false)
  popup.once('ready-to-show', () => {
    popup.show();
  });
})

app.whenReady().then(createMainWindow);
