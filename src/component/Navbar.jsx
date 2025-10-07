import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-1.svg';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubMenus, setOpenSubMenus] = useState({});
    const toggleSpeed = 400; // matches old jQuery toggleSpeed

    // ✅ Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMenuOpen((prev) => {
            const newState = !prev;
            if (!newState) {
                setOpenSubMenus({});
            }
            return newState;
        });
    };

    // ✅ Toggle sub-menu (mobile only)
    const toggleSubMenu = (menuId) => {
        setOpenSubMenus((prev) => {
            const newState = { ...prev, [menuId]: !prev[menuId] };
            Object.keys(newState).forEach((key) => {
                if (key !== menuId) newState[key] = false;
            });
            return newState;
        });
    };

    // ✅ Reset menu on desktop resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 991.99) {
                setIsMenuOpen(false);
                setOpenSubMenus({});
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ✅ Reusable SubMenuItem
    const SubMenuItem = ({ to, children }) => (
        <li>
            <Link to={to}>{children}</Link>
        </li>
    );

    // ✅ Menu Item with Submenu (fixed)
    const MenuItemWithChildren = ({ id, title, to = "#", children }) => {
        const isOpen = openSubMenus[id];

        const handleToggle = (e) => {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                toggleSubMenu(id);
            }
        };

        return (
            <li className={`quanto-item-has-children ${isOpen ? 'quanto-active' : ''}`}>
                {to === "#" ? (
                    <a href="#" onClick={(e) => e.preventDefault()}>
                        {title}
                        <span
                            className="quanto-mean-expand"
                            onClick={handleToggle}
                            style={{ cursor: 'pointer' }}
                        ></span>
                    </a>
                ) : (
                    <Link to={to}>
                        {title}
                        <span
                            className="quanto-mean-expand"
                            onClick={handleToggle}
                            style={{ cursor: 'pointer' }}
                        ></span>
                    </Link>
                )}

                <ul
                    className={`quanto-submenu ${isOpen ? 'quanto-open' : ''}`}
                    style={{
                        display: isOpen ? 'block' : 'none',
                        transition: `all ${toggleSpeed}ms ease-in-out`,
                    }}
                >
                    {children}
                </ul>
            </li>
        );
    };

    return (
        <div>
            {/* ✅ Mobile Menu Drawer */}
            <div className={`quanto-menu-wrapper ${isMenuOpen ? 'quanto-body-visible' : ''}`}>
                <div className="quanto-menu-area text-center">
                    <div className="quanto-menu-mobile-top">
                        <div className="mobile-logo">
                            <Link to="/">
                                <img src={logo} alt="Quanto Agency Logo" />
                            </Link>
                        </div>
                        <button className="quanto-menu-toggle mobile" onClick={toggleMobileMenu}>
                            <i className={isMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
                        </button>
                    </div>

                    <div className="quanto-mobile-menu">
                        <ul>
                            <MenuItemWithChildren id="demo" title="Demo">
                                <SubMenuItem to="/">Digital Agency</SubMenuItem>
                                <SubMenuItem to="/index-2">Creative Agency</SubMenuItem>
                                <SubMenuItem to="/index-3">Design Studio</SubMenuItem>
                                <SubMenuItem to="/index-4">Branding Agency</SubMenuItem>
                                <SubMenuItem to="/index-5">Modern Agency</SubMenuItem>
                                <SubMenuItem to="/index-6">Personal Portfolio</SubMenuItem>
                            </MenuItemWithChildren>

                            <MenuItemWithChildren id="pages" title="Pages">
                                <SubMenuItem to="/about">About Us</SubMenuItem>
                                <SubMenuItem to="/service">Service - 1</SubMenuItem>
                                <SubMenuItem to="/service-2">Service - 2</SubMenuItem>
                                <SubMenuItem to="/service-details">Service Details</SubMenuItem>
                                <SubMenuItem to="/team">Team</SubMenuItem>
                                <SubMenuItem to="/pricing">Pricing</SubMenuItem>
                                <SubMenuItem to="/faq">FAQ's</SubMenuItem>
                            </MenuItemWithChildren>

                            <li className="quanto-item-has-children">
                                <Link to="/portfolio">
                                    Portfolio
                                    <span className="quanto-mean-expand"></span>
                                </Link>
                            </li>
                            <li className="quanto-item-has-children">
                                <Link to="/blog">
                                    Blog
                                    <span className="quanto-mean-expand"></span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact Us</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="quanto-mobile-menu-btn">
                        <div className="sidebar-wrap">
                            <h6>27 Division St, New York,</h6>
                            <h6>NY 10002, USA</h6>
                        </div>
                        <div className="sidebar-wrap">
                            <h6><a href="tel:1800123654987">+1 800 123 654 987</a></h6>
                            <h6><a href="mailto:quanto.agency@mail.com">quanto.agency@mail.com</a></h6>
                        </div>
                        <div className="social-btn style3">
                            <a href="https://www.facebook.com/">
                                <span className="link-effect">
                                    <span className="effect-1"><i className="fab fa-facebook"></i></span>
                                    <span className="effect-1"><i className="fab fa-facebook"></i></span>
                                </span>
                            </a>
                            <a href="https://instagram.com/">
                                <span className="link-effect">
                                    <span className="effect-1"><i className="fab fa-instagram"></i></span>
                                    <span className="effect-1"><i className="fab fa-instagram"></i></span>
                                </span>
                            </a>
                            <a href="https://twitter.com/">
                                <span className="link-effect">
                                    <span className="effect-1"><i className="fab fa-twitter"></i></span>
                                    <span className="effect-1"><i className="fab fa-twitter"></i></span>
                                </span>
                            </a>
                            <a href="https://dribbble.com/">
                                <span className="link-effect">
                                    <span className="effect-1"><i className="fab fa-dribbble"></i></span>
                                    <span className="effect-1"><i className="fab fa-dribbble"></i></span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ Desktop Navbar */}
            <header className="quanto-header main-header bg-color-white" id="sticky-menu">
                <div className="sticky-wrap">
                    <div className="sticky-active">
                        <div className="container custom-container">
                            <div className="row gx-3 align-items-center justify-content-between">
                                <div className="col-8 col-sm-auto">
                                    <div className="header-logo">
                                        <Link to="/">
                                            <img src={logo} alt="Quanto Agency Logo" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="col text-end text-lg-center">
                                    <nav className="main-menu menu-style1 d-none d-lg-block">
                                        <ul>
                                            <li><Link to="/">Home</Link></li>

                                            <MenuItemWithChildren id="desktop-pages" title="Pages">
                                                <SubMenuItem to="/about">About Us</SubMenuItem>
                                                <SubMenuItem to="/services">Service</SubMenuItem>
                                                <SubMenuItem to="/teams">Team</SubMenuItem>
                                                <SubMenuItem to="/pricing">Pricing</SubMenuItem>
                                                <SubMenuItem to="/faq">FAQ's</SubMenuItem>
                                            </MenuItemWithChildren>

                                            <li className="quanto-item-has-children">
                                                <Link to="/portfolio">
                                                    Portfolio
                                                    <span className="quanto-mean-expand"></span>
                                                </Link>
                                            </li>
                                            <li className="quanto-item-has-children">
                                                <Link to="/blog">
                                                    Blog
                                                    <span className="quanto-mean-expand"></span>
                                                </Link>
                                            </li>
                                            <li><Link to="/contact">Contact</Link></li>
                                        </ul>
                                    </nav>

                                    <button
                                        className="menuBar-toggle quanto-menu-toggle d-inline-block d-lg-none"
                                        onClick={toggleMobileMenu}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <path d="M24.4444 26V28H0V26H24.4444ZM40 19V21H0V19H40ZM40 12V14H15.5556V12H40Z" fill="currentColor" />
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
        </div>
    );
};

export default Navbar;
