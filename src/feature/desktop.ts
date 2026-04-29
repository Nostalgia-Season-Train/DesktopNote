import { Platform, Notice } from 'obsidian'
import { app } from 'shared/global'

export const openDesktopWindow = async (): Promise<number | void> => {
  if (!Platform.isWin) {
    new Notice('Desktop window is only available on windows platform')
    return
  }

  try {
    const { BrowserWindow } = require('electron').remote

    const beforeAllWindows = BrowserWindow.getAllWindows()
    app.workspace.openPopoutLeaf()  // Popout Leaf：在独立窗口上打开
    const afterAllWindows = BrowserWindow.getAllWindows()

    const newWindows = afterAllWindows.filter((window: any) => !beforeAllWindows.includes(window))
    if (newWindows.length === 1) {
      const newWindow = newWindows[0]
      const handle = newWindow.getNativeWindowHandle()
      const hwnd = handle.readUInt32LE(0)
      return hwnd
    }
  } catch (error) {
    new Notice(`Failed to open desktop window: ${error}`)
    console.error('Failed to open desktop window:', error)
  }
}
