import { App } from 'obsidian'

declare global {
  interface Window {
    app: App
  }
}

export const app = window.app
