import { Platform, Notice } from 'obsidian'
import { app } from 'shared/global'

export const openDesktopWindow = async (): Promise<void> => {
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
  } catch (error) {
    new Notice(`Failed to open desktop window: ${error}`)
    console.error('Failed to open desktop window:', error)
  }
}
