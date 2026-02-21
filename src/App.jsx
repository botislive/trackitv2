import './index.css'
import { Provider } from 'jotai'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Provider>
      <Dashboard />
    </Provider>
  )
}

export default App
