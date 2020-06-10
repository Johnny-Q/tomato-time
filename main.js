const electron = require("electron");
const fs = require("fs");
const {app, BrowserWindow, Menu, ipcMain} = electron;
var appWindow;

var file = fs.readFileSync("checkins.txt");

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



app.on("quit", function(){
    fs.writeFileSync("checkins.json", file);
});

ipcMain.on("check-in", function(e, data){
    console.log(data);
    file += data;
    file += "\n\n";
});