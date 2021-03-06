const {BrowserWindow, dialog} = require('electron').remote
const path = require('path')

const processHangBtn = document.getElementById('process-hang')

processHangBtn.addEventListener('click', (event) => {
  const hangWinPath = path.join('file://', __dirname, '../../sections/windows/process-hang.html')
  let win = new BrowserWindow({
    width: 400,
    height: 320,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.on('unresponsive', () => {
    const options = {
      type: 'info',
      title: '渲染器程序沒有回應',
      message: '這個程序已沒有回應。',
      buttons: ['重新載入', '關閉']
    }

    dialog.showMessageBox(options, (index) => {
      if (index === 0) win.reload()
      else win.close()
    })
  })

  win.on('close', () => { win = null })
  win.loadURL(hangWinPath)
  win.show()
})
