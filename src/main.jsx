import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SvgBeermat from './SvgBeermat.jsx'
import image_database from './database/imageDB.jsx';

import { v4 as uuidv4 } from 'uuid';

import './css/fonts.css'
import './css/theme.css'
import './css/general.css'
import './css/breakpoints.css'

console.log('main uuid test ', uuidv4())



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SvgBeermat />
  </StrictMode>,
)
