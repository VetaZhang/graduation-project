var app = require('app');
var BrowserWindow = require('browser-window');
require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1200, height: 750, title: 'Electron'});
  mainWindow.setMinimumSize(600, 450);
  mainWindow.openDevTools()
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
});
