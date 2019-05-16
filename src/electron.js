const { app, BrowserWindow, shell, ipcMain, Menu, TouchBar } = require('electron');
const { TouchBarButton, TouchBarLabel, TouchBarSpacer } = TouchBar;

const path = require('path');

let mainWindow;

createWindow = () => {
	mainWindow = new BrowserWindow({
		backgroundColor: '#FFFFFF',
		minWidth: 375,
		show: false,
		titleBarStyle: 'hiddenInset',
		webPreferences: {
			nodeIntegration: false,
			preload: __dirname + '/preload.js',
		},
		height: 860,
		width: 1280,
	});

	mainWindow.loadURL('http://localhost:3000');

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();

		ipcMain.on('open-external-window', (event, arg) => {
			shell.openExternal(arg);
		});
	});
};

app.on('ready', () => {
	createWindow();
});

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

ipcMain.on('load-page', (event, arg) => {
	mainWindow.loadURL(arg);
});