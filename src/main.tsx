import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,         // Animation duration in milliseconds
  easing: 'ease-in-out', // Easing function
  once: false,           // Whether animation should happen only once - while scrolling down
  offset: 100,           // Offset (in px) from the original trigger point
  delay: 0,              // global delay
  mirror: true,          // Whether elements should animate out while scrolling past them
});

createRoot(document.getElementById("root")!).render(<App />);
