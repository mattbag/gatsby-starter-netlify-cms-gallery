import React from "react";
import github from '../img/github-icon.svg';
import logo from '../img/logo.svg';
import Link from 'gatsby-link';
export const Navbar = () => (
    <nav className="navbar is-transparent">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <figure className="image">
              <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
            </figure>
          </Link>
        </div>
        <div className="navbar-start">
          <Link className="navbar-item" to="/about">
            About
          </Link>
          <Link className="navbar-item" to="/products">
            Products
          </Link>
        </div>
        <div className="navbar-end">
          <a className="navbar-item" href="https://github.com/mattbag/gatsby-starter-netlify-cms-gallery" target="_blank" rel="noopener noreferrer">
            <span className="icon">
              <img src={github} alt="Github" />
            </span>
          </a>
        </div>
      </div>
    </nav>
  );