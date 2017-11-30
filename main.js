const {app, BrowserWindow, dialog} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function walkSync (dir, fileTree) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir)
    fileTree = fileTree || {
        name: dir,
        children: [],
        path: dir
    }
    files.forEach(function(file) {
        const path = dir + '/' + file
        const fileNode = {
            name: file,
            children: [],
            path
        }
        fileTree.children.push(fileNode)
        if (fs.statSync(path).isDirectory()) {
            walkSync(path, fileNode)
        }
    })
    return fileTree
}

exports.selectDirectory = function () {
    const path = dialog.showOpenDialog(win, {
        properties: ['openDirectory']
    })
    if(path) return walkSync(path[0])
    return []
}

exports.selectFile = function (path) {
    var fs = fs || require('fs')
    return fs.readFileSync(path, 'utf8')
}

exports.writeFile = function (path, text) {
    var fs = fs || require('fs')
    return fs.writeFileSync(path, text)
}

exports.alertMessage = function (text) {
    const response = dialog.showMessageBox({
        message: text,
        buttons: ['Yes', 'No', 'Cancel']
    })
    return response
}
