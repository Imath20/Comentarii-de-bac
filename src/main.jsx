import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/style.scss'
import App from './App.jsx'
import ScrollManager from './assets/ScrollManager.jsx'
import { TabsProvider } from './assets/TabsProvider.jsx'
import TabsBar from './assets/TabsBar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TabsProvider>
        <TabsBar />
        <ScrollManager />
        <App />
      </TabsProvider>
    </BrowserRouter>
  </StrictMode>,
)
