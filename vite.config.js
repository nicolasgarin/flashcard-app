import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        "react-bootstrap/Col",
        'react-bootstrap/Nav',
        'react-bootstrap/Row',
        'react-bootstrap/Tab'
      ],
    },
  },
  base: "/flashcard-app/"
})
