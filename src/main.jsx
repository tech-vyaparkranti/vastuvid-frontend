import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
gsap.core.globals('ScrollTrigger', ScrollTrigger);
gsap.core.globals('SplitText', SplitText);
// ✅ REGISTER PLUGINS HERE, ONCE, GLOBALLY.
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
