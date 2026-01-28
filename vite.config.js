import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: false,
    allowedHosts: [
      'localhost',
      'puls-fizica.vercel.app',
      'puls-fizica.ro',
      '97738a7c05bd.ngrok-free.app',
      'hypertense-rebekah-jasminelike.ngrok-free.dev'
    ],
    // cors: {
    //   origin: ['97738a7c05bd.ngrok-free.app']
    // }
  }
})
