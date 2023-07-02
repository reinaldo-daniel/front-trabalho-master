import { useState, useEffect } from "react";

import './App.css';
import { Outlet } from "react-router-dom";

import Header from './componentes/Header';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setIsScrolled(window.scrollY > 150);
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

  return (
    <div className='app'>
      <Header isScrolled={isScrolled}/>
      <Outlet />
    </div>
  );
}

export default App;
