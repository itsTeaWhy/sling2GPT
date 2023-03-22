import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useRef } from 'react';

export default function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  return (
    <header id='navbar'>
      <h3>sling2GPT</h3>
      <nav ref={navRef} className='linksContainer'>
        <a href='/#'>Hello! (:</a>
        <a href='/#'>Here</a>
        <a href='/#'>Are</a>
        <a href='/#'>Some</a>
        <a href='/#'>Links</a>
        <a href='/#'>I</a>
        <a href='/#'>Won't</a>
        <a href='/#'>Use</a>
        <a className='emoji' href='/#'>
          😜✌️
        </a>
        <button className='nav-btn nav-close-btn' onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className='nav-btn' onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}
