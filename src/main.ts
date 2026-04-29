import { Plugin } from 'obsidian'
import { openDesktopWindow } from 'feature/desktop'

export default class DesktopNotePlugin extends Plugin {
  async onload() {
    await openDesktopWindow()
  }

  onunload() {
  }
}
