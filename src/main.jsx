import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/style.scss'
import './firebase/firebase.js'
import App from './App.jsx'
import ScrollManager from './assets/ScrollManager.jsx'
import { TabsProvider } from './assets/TabsProvider.jsx'
import TabsBar from './assets/TabsBar.jsx'
import { AuthProvider } from './firebase/AuthContext.jsx'
import CommandPrompt from './components/CommandPrompt.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TabsProvider>
          <TabsBar />
          <ScrollManager />
          <App />
          <CommandPrompt />
        </TabsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
