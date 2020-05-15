const electron = require("electron");
const fs = require("fs");
const {app, BrowserWindow, Menu, ipcMain} = electron;
var file = fs.readFileSync("checkins.txt");
var appWindow;

app.on("ready", function(){
    appWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true
        },
        width: 1600,
        height: 900
    });

    Menu.setApplicationMenu(null);
    appWindow.loadURL(`file://${__dirname}/src/timer.html`);
});



app.on("quit", function(){
    fs.writeFileSync("checkins.txt", file);
});

var checkin;

ipcMain.on("done-work", function(e,data){
    checkin = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true
        },
        width: 500,
        height: 500
    })
    checkin.loadURL(`file://${__dirname}/src/checkin.html`);
});

ipcMain.on("check-in", function(e, data){
    console.log(data);
    file += data;
    file += "\n\n";
    checkin.close();
});