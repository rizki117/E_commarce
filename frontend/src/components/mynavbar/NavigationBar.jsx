
 import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Bell, Menu } from 'lucide-react';
import useGetMe from '../../hooks/useGetMe'; // Hook asli Anda
import Logo from './Logo'; // Komponen Logo asli Anda

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Menggunakan hook asli Anda
  const { user } = useGetMe();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="pintarnya-navbar">
        <div className="navbar-container">
          {/* Logo Section - Menggunakan Logo asli */}
          <NavLink 
            to="/" 
            className="logo-section"
            style={{ textDecoration: 'none' }}
          >
            <div className="logo-wrapper">
              <Logo width={120} height={36} />
            </div>
          </NavLink>

          {/* Search Bar - Desktop */}
          <div className="search-container desktop-search">
            <div className="search-bar">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Cari Produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="right-section">
            {/* Notification Bell */}
            <button className="notification-btn">
              <Bell size={24} className="bell-icon" />
            </button>

            {/* Mobile Menu Toggle */}
            <button className="menu-toggle" onClick={toggleMenu}>
              <Menu size={24} />
            </button>

            {/* Desktop Navigation Links - Menggunakan NavLink */}
            <div className="desktop-nav">
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Home
              </NavLink>
              
              <NavLink 
                to="/about"
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                About
              </NavLink>

              {/* Tampilkan Dashboard hanya jika user sudah login */}
              {user && (
                <NavLink 
                  to="/dashboard"
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  Dashboard
                </NavLink>
              )}

              {/* Dropdown Shop */}
              <div className="dropdown">
                <button className="nav-link dropdown-btn">Shop</button>
                <div className="dropdown-content">
                  <NavLink 
                    to="/shop/all-products"
                    className="dropdown-link"
                  >
                    All Products
                  </NavLink>
                  <NavLink 
                    to="/shop/popular-items"
                    className="dropdown-link"
                  >
                    Popular Items
                  </NavLink>
                  <NavLink 
                    to="/shop/new-arrivals"
                    className="dropdown-link"
                  >
                    New Arrivals
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="mobile-search">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Cari Produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                `mobile-nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            
            <NavLink 
              to="/about"
              className={({ isActive }) => 
                `mobile-nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>

            {/* Tampilkan Dashboard di mobile jika user login */}
            {user && (
              <NavLink 
                to="/dashboard"
                className={({ isActive }) => 
                  `mobile-nav-link ${isActive ? 'active' : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            )}

            {/* Mobile Dropdown Shop */}
            <div className="mobile-dropdown">
              <span className="mobile-nav-link">Shop</span>
              <div className="mobile-dropdown-content">
                <NavLink 
                  to="/shop/all-products" 
                  className="mobile-sub-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Products
                </NavLink>
                <NavLink 
                  to="/shop/popular-items" 
                  className="mobile-sub-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Popular Items
                </NavLink>
                <NavLink 
                  to="/shop/new-arrivals" 
                  className="mobile-sub-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  New Arrivals
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </nav>

      <style jsx>{`
        .pintarnya-navbar {
          background: linear-gradient(135deg, #4A90E2 0%, #357ABD 50%, #2E5B9A 100%);
          box-shadow: 0 2px 20px rgba(74, 144, 226, 0.3);
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: 0;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          gap: 20px;
        }

        /* Logo Section */
        .logo-section {
          display: flex;
          align-items: center;
          color: white;
          min-width: fit-content;
          transition: all 0.3s ease;
        }

        .logo-section:hover {
          color: white;
          text-decoration: none;
          transform: scale(1.02);
        }

        .logo-wrapper {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        /* Search Section */
        .search-container {
          flex: 1;
          max-width: 600px;
        }

        .desktop-search {
          display: flex;
        }

        .mobile-search {
          display: none;
          padding: 0 20px 16px 20px;
        }

        .search-bar {
          position: relative;
          width: 100%;
        }

        .search-input {
          width: 100%;
          padding: 14px 20px 14px 50px;
          border: none;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          font-size: 16px;
          color: #333;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          transform: translateY(-1px);
        }

        .search-input::placeholder {
          color: #999;
          font-size: 15px;
        }

        .search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          z-index: 1;
        }

        /* Right Section */
        .right-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .notification-btn {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .notification-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
        }

        .bell-icon {
          color: white;
        }

        .menu-toggle {
          display: none;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          width: 44px;
          height: 44px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .menu-toggle:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 16px;
          padding: 8px 16px;
          border-radius: 20px;
          transition: all 0.3s ease;
          background: transparent;
          border: none;
          cursor: pointer;
          position: relative;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #FFD700;
          transform: translateY(-1px);
          text-decoration: none;
        }

        /* Active state untuk NavLink */
        .nav-link.active {
          background: rgba(255, 255, 255, 0.2);
          color: #FFD700;
          text-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
        }

        /* Dropdown */
        .dropdown {
          position: relative;
        }

        .dropdown-btn {
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .dropdown-content {
          display: none;
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          padding: 8px 0;
          min-width: 180px;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }

        .dropdown-link {
          display: block;
          padding: 12px 20px;
          color: #333;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .dropdown-link:hover {
          background: linear-gradient(135deg, #4A90E2, #357ABD);
          color: white;
          text-decoration: none;
        }

        /* Mobile Menu */
        .mobile-menu {
          display: none;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding: 16px 20px;
        }

        .mobile-nav-link {
          display: block;
          padding: 12px 0;
          color: #333;
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .mobile-nav-link:hover {
          color: #4A90E2;
          text-decoration: none;
        }

        .mobile-nav-link.active {
          color: #4A90E2;
          font-weight: 600;
          background: rgba(74, 144, 226, 0.1);
          border-radius: 8px;
          margin: 0 -8px;
          padding: 12px 8px;
        }

        .mobile-dropdown-content {
          padding-left: 20px;
        }

        .mobile-sub-link {
          display: block;
          padding: 8px 0;
          color: #666;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .mobile-sub-link:hover {
          color: #4A90E2;
          text-decoration: none;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .navbar-container {
            padding: 12px 16px;
          }

          .desktop-search {
            display: none;
          }

          .mobile-search {
            display: block;
          }

          .desktop-nav {
            display: none;
          }

          .menu-toggle {
            display: flex;
          }

          .mobile-menu {
            display: block;
          }
        }

        @media (max-width: 480px) {
          .navbar-container {
            padding: 10px 12px;
          }

          .mobile-search {
            padding: 0 12px 12px 12px;
          }

          .search-input {
            padding: 12px 16px 12px 45px;
            font-size: 15px;
          }
        }
      `}</style>
    </>
  );
};

export default NavigationBar;