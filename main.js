const { app, BrowserWindow } = require('electron')
const createWindow = () => {
    const win = new BrowserWindow({
      width: 250,
      height: 360,
      icon: '../yes-or-no-wheel-app/images/flower.ico',
      autoHideMenuBar: true,
      maximizable: false
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})