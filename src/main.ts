import { Plugin } from 'obsidian'
import { openDesktopWindow } from 'feature/desktop'

export default class DesktopNotePlugin extends Plugin {
  async onload() {
    // 获取当前插件的绝对路径
    const myId = this.manifest.id
    const myPlugin = (this.app as any).plugins.plugins[myId]
    const myPluginPath = myPlugin.manifest.dir
    const vaultAbspath = (this.app.vault.adapter as any).basePath

    const path = require('path')
    const myPluginAbspath = path.resolve(vaultAbspath, myPluginPath)

    // 绝对路径加载 ffi 和 dll 库
    const libAbspath = path.resolve(myPluginAbspath, 'lib')
    const { load, open, DataType, close } = require(path.resolve(libAbspath, 'ffi-rs.win32-x64-msvc.node'))
    open({
      library: 'setBottom',
      path: path.resolve(libAbspath, 'setBottom.dll')
    })
    const result = load({
      library: 'setBottom',
      funcName: 'test',
      retType: DataType.I32,
      paramsType: [],
      paramsValue: [],
      freeResultMemory: false
    })
    console.log(result)
    close('setBottom')
    await openDesktopWindow()
  }

  onunload() {
  }
}
