import { Plugin } from 'obsidian'
import { openDesktopWindow } from './desktop'

export default class DesktopNotePlugin extends Plugin {
  async onload() {
    await openDesktopWindow()
  }

  onunload() {
  }
}
