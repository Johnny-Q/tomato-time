const electron = require("electron");

const {app, BrowserWindow, Menu} = electron;

var appWindow;
app.on("ready", function(){
    appWindow = new BrowserWindow({
        nodeintegration: true,
        width: 1600,
        height: 900
    })
    //Menu.setApplicationMenu(null);
    appWindow.loadURL(`file://${__dirname}/src/timer.html`);
});