'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

//const express = require('express');
//const expressApp = express();
var myapp1=require('./src/app.js');
var expressApp=myapp1.ini_express();
const debug = require('debug')('express-test:server');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
var server;
function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	debug('Listening on ' + bind);

	if(mainWindow != null)	mainWindow.loadURL('file://' + __dirname + '/index2.html');
	//mainWindow.loadURL('http://127.0.0.1:3000/tts');
	//mainWindow.toggleDevTools();
}


// Quit when all windows are closed.
app.on('window-all-closed', function() {
		// On OS X it is common for applications and their menu bar
		// to stay active until the user quits explicitly with Cmd + Q
		if (process.platform != 'darwin') {
		app.quit();
		}
		});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
var port=3000;
server = require('http').createServer(expressApp);

app.on('ready', function() {
		// Create the browser window.
		mainWindow = new BrowserWindow({width: 1000, height: 625});
		mainWindow.webContents.openDevTools();
		// and load the index.html of the app.
		// mainWindow.loadURL('file://' + __dirname + 'src/public/index.html');
		// mainWindow.loadURL('http://localhost:3000/tts');
		// Emitted when the window is closed.
		mainWindow.on('closed', function() {
				// Dereference the window object, usually you would store windows
				// in an array if your app supports multi windows, this is the time
				// when you should delete the corresponding element.
				mainWindow = null;
				server.close();
				});

		server.listen(port);
		//server.on('error', onError);
		server.on('listening', onListening);
		console.log('listening at:', port);



});
