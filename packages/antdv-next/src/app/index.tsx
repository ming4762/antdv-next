import type { App as AppPlugin } from 'vue'
import type { AppProps } from './App'
import App_ from './App'
import useApp from './useApp'

export type { AppProps }

type CompoundedComponent = typeof App_ & {
  useApp: typeof useApp
}

const App = App_ as CompoundedComponent
;(App as any).install = (app: AppPlugin) => {
  app.component(App.name, App)
}

App.useApp = useApp

export default App as typeof App_ & {
  useApp: typeof useApp
}
