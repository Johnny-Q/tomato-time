const electron = require("electron");
const fs = require("fs");
const {app, BrowserWindow, Menu, ipcMain} = electron;
var appWindow;

var file = fs.readFileSync("checkins.json");
var checkins = JSON.parse(file);
app.on("ready", function(){
    appWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true
        },
        width: 1600,
        height: 900
    });

    //Menu.setApplicationMenu(null);
    appWindow.loadURL(`file://${__dirname}/src/timer.html`);
});


ipcMain.on("check-in", function(e, data){
    console.log(data);
    checkins.push(data);
    fs.writeFileSync("checkins.json", JSON.stringify(checkins));
});