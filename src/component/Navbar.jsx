import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.png";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openSubMenus, setOpenSubMenus] = useState({});
    const [isSticky, setIsSticky] = useState(false);

    // Handle sticky header on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (!isMobileMenuOpen) {
            setOpenSubMenus({});
        }
    };

    // Toggle submenu
    const toggleSubMenu = (menuId) => {
        setOpenSubMenus(prev => ({
            ...prev,
            [menuId]: !prev[menuId]
        }));
    };

    // Close mobile menu when route changes
    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
        setOpenSubMenus({});
    };

    return (
        <>
            <div className={`quanto-menu-wrapper ${isMobileMenuOpen ? 'quanto-body-visible' : ''}`}>
                <div className="quanto-menu-area text-center">
                    <div className="quanto-menu-mobile-top">
                        <div className="mobile-logo">
                            <Link to="/" onClick={handleLinkClick}>
                                <img src="./assets/images/logo-1.svg" alt="logo" />
                            </Link>
                        </div>
                        <button className="quanto-menu-toggle mobile" onClick={toggleMobileMenu}>
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                    <div className="quanto-mobile-menu">
                        <ul>
                            <li className="menu-item-has-children">
                                <Link to="#" onClick={(e) => { e.preventDefault(); toggleSubMenu('demo'); }}>
                                    Demo
                                    <span className="quanto-mean-expand"></span>
                                </Link>
                                <ul className={`sub-menu quanto-submenu ${openSubMenus['demo'] ? 'quanto-open' : ''}`} style={{ display: openSubMenus['demo'] ? 'block' : 'none' }}>
                                    <li><Link to="/index" onClick={handleLinkClick}>Digital Agency</Link></li>
                                    <li><Link to="/index-2" onClick={handleLinkClick}>Creative Agency</Link></li>
                                    <li><Link to="/index-3" onClick={handleLinkClick}>Design Studio</Link></li>
                                    <li><Link to="/index-4" onClick={handleLinkClick}>branding agency</Link></li>
                                    <li><Link to="/index-5" onClick={handleLinkClick}>modern agency</Link></li>
                                    <li><Link to="/index-6" onClick={handleLinkClick}>personal portfolio</Link></li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <Link to="#" onClick={(e) => { e.preventDefault(); toggleSubMenu('pages'); }}>
                                    Pages
                                    <span className="quanto-mean-expand"></span>
                                </Link>
                                <ul className={`sub-menu quanto-submenu ${openSubMenus['pages'] ? 'quanto-open' : ''}`} style={{ display: openSubMenus['pages'] ? 'block' : 'none' }}>
                                    <li><Link to="/about" onClick={handleLinkClick}>About Us</Link></li>
                                    <li><Link to="/service" onClick={handleLinkClick}>Service - 1</Link></li>
                                    <li><Link to="/service-2" onClick={handleLinkClick}>Service - 2</Link></li>
                                    <li><Link to="/service-details" onClick={handleLinkClick}>Service Details</Link></li>
                                    <li><Link to="/career" onClick={handleLinkClick}>Career</Link></li>
                                    <li><Link to="/career-details" onClick={handleLinkClick}>Career Details</Link></li>
                                    <li><Link to="/team" onClick={handleLinkClick}>Team</Link></li>
                                    <li><Link to="/team-details" onClick={handleLinkClick}>Team Details</Link></li>
                                    <li><Link to="/pricing" onClick={handleLinkClick}>Pricing</Link></li>
                                    <li><Link to="/faq" onClick={handleLinkClick}>FAQ's</Link></li>
                                    <li><Link to="/404" onClick={handleLinkClick}>Error 404</Link></li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <Link to="#" onClick={(e) => { e.preventDefault(); toggleSubMenu('portfolio'); }}>
                                    Portfolio
                                    <span className="quanto-mean-expand"></span>
                                </Link>
                                <ul className={`sub-menu quanto-submenu ${openSubMenus['portfolio'] ? 'quanto-open' : ''}`} style={{ display: openSubMenus['portfolio'] ? 'block' : 'none' }}>
                                    <li><Link to="/portfolio-masonry" onClick={handleLinkClick}>Portfolio Masonry</Link></li>
                                    <li><Link to="/portfolio-standard" onClick={handleLinkClick}>Portfolio Standard</Link></li>
                                    <li><Link to="/portfolio-gallery" onClick={handleLinkClick}>Portfolio Gallery</Link></li>
                                    <li><Link to="/portfolio-slider" onClick={handleLinkClick}>Portfolio Slider</Link></li>
                                    <li><Link to="/portfolio-card" onClick={handleLinkClick}>Portfolio Card</Link></li>
                                    <li><Link to="/portfolio-details" onClick={handleLinkClick}>Portfolio Details</Link></li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <Link to="#" onClick={(e) => { e.preventDefault(); toggleSubMenu('blog'); }}>
                                    Blog
                                    <span className="quanto-mean-expand"></span>
                                </Link>
                                <ul className={`sub-menu quanto-submenu ${openSubMenus['blog'] ? 'quanto-open' : ''}`} style={{ display: openSubMenus['blog'] ? 'block' : 'none' }}>
                                    <li><Link to="/blog-grid" onClick={handleLinkClick}>Blog Grid</Link></li>
                                    <li><Link to="/blog-list" onClick={handleLinkClick}>Blog List</Link></li>
                                    <li><Link to="/blog-details" onClick={handleLinkClick}>Blog Details</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/contact" onClick={handleLinkClick}>Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="quanto-mobile-menu-btn">
                        <div className="sidebar-wrap">
                            <h6>27 Division St, New York,</h6>
                            <h6>NY 10002, USA</h6>
                        </div>
                        <div className="sidebar-wrap">
                            <h6><Link to="tel:1800123654987">+1 800 123 654 987 </Link></h6>
                            <h6>
                                <Link to="mailto:quanto.agency@mail.com">quanto.agency@mail.com</Link>
                            </h6>
                        </div>
                        <div className="social-btn style3">
                            <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <span className="link-effect">
                                    <span className="effect-1"><i className="fab fa-facebook"></i></span>
                                    <span className="effect-1"><i className="fab fa-facebook"></i></span>
                                </span>
                            </Link>
                            <Link to="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                                <span className="link-effect">
                                    <span className="effect-1"><i className="fab fa-instagram"></i></span>
                                    <span className="effect-1"><i className="fab fa-instagram"></i></span>
                                </span>
                            </Link>
                            <Link to="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                <span className="link-effect">
                                    <span className="effect-1"><i className="fab fa-twitter"></i></span>
                                    <span className="effect-1"><i className="fab fa-twitter"></i></span>
                                </span>
                            </Link>
                            <Link to="https://dribbble.com/" target="_blank" rel="noopener noreferrer">
                                <span className="link-effect">
                                    <span className="effect-1"><i className="fab fa-dribbble"></i></span>
                                    <span className="effect-1"><i className="fab fa-dribbble"></i></span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <header className={`quanto-header main-header bg-color-white ${isSticky ? 'sticky' : ''}`} id="sticky-menu">
                <div className="sticky-wrap">
                    <div className="sticky-active">
                        <div className="container custom-container">
                            <div className="row gx-3 align-items-center justify-content-between">
                                <div className="col-8 col-sm-auto">
                                    <div className="header-logo">
                                        <Link to="/">
                                            <img src={logo} alt="logo" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="col text-end text-lg-center">
                                    <nav className="main-menu menu-style1 d-none d-lg-block">
                                        <ul>
                                            <li>
                                                <Link to="/">Home</Link>
                                            </li>
                                            <li className="menu-item-has-children">
                                                <Link to="#">Pages</Link>
                                                <ul className="sub-menu">
                                                    <li><Link to="/about">About Us</Link></li>
                                                    <li><Link to="/service">Service</Link></li>
                                                    <li><Link className="no-border" to="/teams">Team</Link></li>
                                                    <li><Link to="/pricing">Pricing</Link></li>
                                                    <li><Link to="/faq">FAQ's</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="/portfolio">Portfolio</Link>
                                            </li>
                                            <li>
                                                <Link to="/blog">Blog</Link>
                                            </li>
                                            <li>
                                                <Link to="/contact">Contact</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                    <button
                                        className="menuBar-toggle quanto-menu-toggle d-inline-block d-lg-none"
                                        onClick={toggleMobileMenu}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                        >
                                            <path
                                                d="M24.4444 26V28H0V26H24.4444ZM40 19V21H0V19H40ZM40 12V14H15.5556V12H40Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="col-auto d-none d-lg-block">
                                    <Link className="quanto-link-btn btn-pill" to="/contact">
                                        Get in touch
                                        <span>
                                            <i className="fa-solid fa-arrow-right arry1"></i>
                                            <i className="fa-solid fa-arrow-right arry2"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;