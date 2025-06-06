//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import ImageModal from './modals.jsx'

// createRoot(document.getElementById('header-root')).render(
//   <StrictMode>
//     <Header />
//   </StrictMode>,
// )
// createRoot(document.getElementById('profile-root')).render(
//   <StrictMode>
//     <Profile />
//   </StrictMode>,
// )

// createRoot(document.getElementById('gallery-root')).render(
//   <StrictMode>
//     <DisplayCards />
//   </StrictMode>,
// )

// createRoot(document.getElementById('footer-root')).render(
//   <StrictMode>
//     <Footer />
//   </StrictMode>,
// )

createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>
)