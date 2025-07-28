import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaBullhorn,
  FaCalendarAlt,
  FaExchangeAlt,
  FaAddressBook,
  FaPlusCircle,
  FaCommentDots,
  FaUserShield,
} from 'react-icons/fa';

// Map nav item labels to icons
const navItems = [
  { to: '/', label: 'Home', icon: <FaHome className="inline mr-2 mb-[2px]" /> },
  { to: '/announcements', label: 'Announcements', icon: <FaBullhorn className="inline mr-2 mb-[2px]" /> },
  { to: '/events', label: 'Events', icon: <FaCalendarAlt className="inline mr-2 mb-[2px]" /> },
  { to: '/buy-sell', label: 'Buy/Sell', icon: <FaExchangeAlt className="inline mr-2 mb-[2px]" /> },
  { to: '/contacts', label: 'Contacts', icon: <FaAddressBook className="inline mr-2 mb-[2px]" /> },
  { to: '/post', label: 'Post Notice', icon: <FaPlusCircle className="inline mr-2 mb-[2px]" /> },
  { to: '/feedback', label: 'Feedback', icon: <FaCommentDots className="inline mr-2 mb-[2px]" /> },
  { to: '/admin', label: 'Admin', icon: <FaUserShield className="inline mr-2 mb-[2px]" /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Brand */}
        <div className="text-2xl font-bold text-[#13C580] tracking-tight">
          Community Board
        </div>

        {/* Hamburger Menu */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-[#13C580] bg-white shadow hover:bg-[#13C580]/10 focus:outline-none focus:ring-2 focus:ring-[#13C580]"
            aria-label="Toggle navigation menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center text-sm font-medium px-3 py-2 rounded-md transition duration-200 ease-in-out
                ${
                  isActive
                    ? 'bg-[#13C580] text-white shadow'
                    : 'text-gray-700 hover:text-[#13C580] hover:bg-[#13C580]/10'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center text-sm font-medium px-3 py-2 rounded-md transition duration-200 ease-in-out
                  ${
                    isActive
                      ? 'bg-[#13C580] text-white shadow'
                      : 'text-gray-700 hover:text-[#13C580] hover:bg-[#13C580]/10'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
