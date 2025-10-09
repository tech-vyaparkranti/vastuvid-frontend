import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import $ from "jquery"
import logo from "../assets/images/logo.png"
const Navbar = () => {
    useLayoutEffect(() => {
        /*---------- 03. Mobile Menu Active ----------*/
        $.fn.vsmobilemenu = function (options) {
            var opt = $.extend(
                {
                    menuToggleBtn: ".quanto-menu-toggle",
                    bodyToggleClass: "quanto-body-visible",
                    subMenuClass: "quanto-submenu",
                    subMenuParent: "quanto-item-has-children",
                    subMenuParentToggle: "quanto-active",
                    meanExpandClass: "quanto-mean-expand",
                    appendElement: '<span class="quanto-mean-expand"></span>',
                    subMenuToggleClass: "quanto-open",
                    toggleSpeed: 400,
                },
                options
            );

            return this.each(function () {
                var menu = $(this); // Select menu

                // IMPORTANT: Unbind previous handlers before attaching new ones
                $(opt.menuToggleBtn).off("click.vsmobilemenu");
                menu.off("click.vsmobilemenu");
                menu.find("div").off("click.vsmobilemenu");

                // Menu Show & Hide
                function menuToggle() {
                    menu.toggleClass(opt.bodyToggleClass);
                    // ... (rest of menuToggle remains the same)
                    var subMenu = "." + opt.subMenuClass;
                    $(subMenu).each(function () {
                        if ($(this).hasClass(opt.subMenuToggleClass)) {
                            $(this).removeClass(opt.subMenuToggleClass);
                            $(this).css("display", "none");
                            $(this).parent().removeClass(opt.subMenuParentToggle);
                        }
                    });
                }

                // Class Set Up for every submenu (no change needed here)
                menu.find("li").each(function () {
                    var submenu = $(this).find("ul");
                    submenu.addClass(opt.subMenuClass);
                    submenu.css("display", "none");
                    submenu.parent().addClass(opt.subMenuParent);
                    submenu.prev("a").append(opt.appendElement);
                    submenu.next("a").append(opt.appendElement);
                });

                // Toggle Submenu
                function toggleDropDown($element) {
                    if ($($element).next("ul").length > 0) {
                        $($element).parent().toggleClass(opt.subMenuParentToggle);
                        $($element).next("ul").slideToggle(opt.toggleSpeed);
                        $($element).next("ul").toggleClass(opt.subMenuToggleClass);
                    } else if ($($element).prev("ul").length > 0) {
                        $($element).parent().toggleClass(opt.subMenuParentToggle);
                        $($element).prev("ul").slideToggle(opt.toggleSpeed);
                        $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
                    }
                }

                // Submenu toggle Button
                var expandToggler = "." + opt.meanExpandClass;
                $(expandToggler).each(function () {
                    $(this).on("click", function (e) {
                        e.preventDefault();
                        toggleDropDown($(this).parent());
                    });
                });

                // Menu Show & Hide On Toggle Btn click
                $(opt.menuToggleBtn).each(function () {
                    // ADD NAMESPACE (.vsmobilemenu) TO THE HANDLER
                    $(this).on("click.vsmobilemenu", function () {
                        menuToggle();
                    });
                });

                // Hide Menu On out side click
                // ADD NAMESPACE (.vsmobilemenu) TO THE HANDLER
                menu.on("click.vsmobilemenu", function (e) {
                    e.stopPropagation();
                    menuToggle();
                });

                // Stop Hide full menu on menu click
                // ADD NAMESPACE (.vsmobilemenu) TO THE HANDLER
                menu.find("div").on("click.vsmobilemenu", function (e) {
                    e.stopPropagation();
                });
            });
        };

        function applyMenu() {
            if (window.innerWidth <= 991.99) {
                $(".quanto-menu-wrapper.v3").vsmobilemenu();
            } else {
                $(".quanto-menu-wrapper.v2").vsmobilemenu();
            }

            if (
                !$(".quanto-menu-wrapper").hasClass("v2") &&
                !$(".quanto-menu-wrapper").hasClass("v3")
            ) {
                $(".quanto-menu-wrapper").vsmobilemenu();
            }
        }

        // Initial application
        applyMenu();

        // Reapply when the window is resized
        // We should use an event namespace for the resize listener too, and also clear it in the return function
        // For simplicity with your existing structure, let's keep it here for now, 
        // but the unbinding *inside* vsmobilemenu is the critical fix.
        $(window).on("resize.navresize", function () {
            applyMenu();
        });

        // Cleanup function for useLayoutEffect
        return () => {
            // Remove the resize listener when the component unmounts
            $(window).off("resize.navresize");
        };

    }, [])

    const location = useLocation();
    return (
        <>
            <div class="quanto-menu-wrapper">
                <div class="quanto-menu-area text-center">
                    <div class="quanto-menu-mobile-top">
                        <div class="mobile-logo">
                            <Link to="index.html">
                                <img src="./assets/images/logo-1.svg" alt="logo" />
                            </Link>
                        </div>
                        <button class="quanto-menu-toggle mobile">
                            <i class="ri-close-line"></i>
                        </button>
                    </div>
                    <div class="quanto-mobile-menu">
                        <ul>
                            <li class="menu-item-has-children">
                                <Link to="#">Demo</Link>
                                <ul class="sub-menu">
                                    <li>
                                        <Link to="index.html">Digital Agency</Link>
                                    </li>
                                    <li>
                                        <Link to="index-2.html">Creative Agency</Link>
                                    </li>
                                    <li>
                                        <Link to="index-3.html">Design Studio</Link>
                                    </li>
                                    <li>
                                        <Link to="index-4.html">branding agency</Link>
                                    </li>
                                    <li>
                                        <Link to="index-5.html">modern agency</Link>
                                    </li>
                                    <li>
                                        <Link to="index-6.html">personal portfolio</Link>
                                    </li>
                                </ul>
                            </li>
                            <li class="menu-item-has-children">
                                <Link to="#">Pages</Link>
                                <ul class="sub-menu">
                                    <li><Link to="about.html">About Us</Link></li>
                                    <li><Link to="service.html">Service - 1</Link></li>
                                    <li><Link to="service-2.html">Service - 2</Link></li>
                                    <li><Link to="service-details.html">Service Details</Link></li>
                                    <li><Link to="career.html">Career</Link></li>
                                    <li><Link to="career-details.html">Career Details</Link></li>
                                    <li><Link to="team.html">Team</Link></li>
                                    <li><Link to="team-details.html">Team Details</Link></li>
                                    <li><Link to="pricing.html">Pricing</Link></li>
                                    <li><Link to="faq.html">FAQ's</Link></li>
                                    <li><Link to="404.html">Error 404</Link></li>
                                </ul>
                            </li>
                            <li class="menu-item-has-children">
                                <Link to="#">Portfolio</Link>
                                <ul class="sub-menu">
                                    <li><Link to="portfolio-masonry.html">Portfolio Masonry</Link></li>
                                    <li>
                                        <Link to="portfolio-standard.html">Portfolio Standard</Link>
                                    </li>
                                    <li><Link to="portfolio-gallery.html">Portfolio Gallery</Link></li>
                                    <li><Link to="portfolio-slider.html">Portfolio Slider</Link></li>
                                    <li><Link to="portfolio-card.html">Portfolio Card</Link></li>
                                    <li><Link to="portfolio-details.html">Portfolio Details</Link></li>
                                </ul>
                            </li>
                            <li class="menu-item-has-children">
                                <Link to="#">Blog</Link>
                                <ul class="sub-menu">
                                    <li><Link to="blog-grid.html">Blog Grid</Link></li>
                                    <li><Link to="blog-list.html">Blog List</Link></li>
                                    <li><Link to="blog-details.html">Blog Details</Link></li>
                                </ul>
                            </li>

                            <li>
                                <Link to="contact.html">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div class="quanto-mobile-menu-btn">
                        <div class="sidebar-wrap">
                            <h6>27 Division St, New York,</h6>
                            <h6>NY 10002, USA</h6>
                        </div>
                        <div class="sidebar-wrap">
                            <h6><Link to="tel:1800123654987">+1 800 123 654 987 </Link></h6>
                            <h6>
                                <Link to="mailto:quanto.agency@mail.com">quanto.agency@mail.com</Link>
                            </h6>
                        </div>
                        <div class="social-btn style3">
                            <Link to="https://www.facebook.com/">
                                <span class="link-effect">
                                    <span class="effect-1"><i class="fab fa-facebook"></i></span>
                                    <span class="effect-1"><i class="fab fa-facebook"></i></span>
                                </span>
                            </Link>
                            <Link to="https://instagram.com/">
                                <span class="link-effect">
                                    <span class="effect-1"><i class="fab fa-instagram"></i></span>
                                    <span class="effect-1"><i class="fab fa-instagram"></i></span>
                                </span>
                            </Link>
                            <Link to="https://twitter.com/">
                                <span class="link-effect">
                                    <span class="effect-1"><i class="fab fa-twitter"></i></span>
                                    <span class="effect-1"><i class="fab fa-twitter"></i></span>
                                </span>
                            </Link>
                            <Link to="https://dribbble.com/">
                                <span class="link-effect">
                                    <span class="effect-1"><i class="fab fa-dribbble"></i></span>
                                    <span class="effect-1"><i class="fab fa-dribbble"></i></span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                {`
                .sticky-menu{
                background:white;
              
                }
                
                .otherPath a{
                color :#63334E !important;
                }
                .sticky-menu a,
.sticky-menu .nav-link,
.sticky-menu .menu-item {
  color: #63334E !important;
}
 .sticky-menu .quanto-link-btn{
 color:white !important;;
 }
                .header-logo {
                margin-top:5px;
  background-color: rgba(255, 255, 255, 10); /* white with slight transparency */
  padding: 8px;             /* some space around the logo */
  border-radius: 8px;       /* rounded corners (optional) */
  display: inline-block;    /* make the background fit the logo */
}

                `}
            </style>
            <header className="quanto-header main-header" id="sticky-menu">
                <div class="sticky-wrap">
                    <div class="sticky-active">
                        <div class="container custom-container">
                            <div class="row gx-3 align-items-center justify-content-between">
                                <div class="col-8 col-sm-auto">
                                    <div class="header-logo">
                                        <Link to="index.html">
                                            <img src={logo} alt="logo" />
                                        </Link>
                                    </div>
                                </div>
                                <div class="col text-end text-lg-center">
                                    <nav className={`main-menu menu-style1 d-none d-lg-block ${location.pathname !== '/' ? 'otherPath' : ''}`} >
                                        <ul>
                                            <li>
                                                <Link to="/">Home</Link>
                                                {/* <ul class="sub-menu">
                                                    <li><Link to="index.html">Digital Agency</Link></li>
                                                    <li>
                                                        <Link to="index-2.html">Creative Agency</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="index-3.html">Design Studio</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="index-4.html">branding agency</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="index-5.html">modern agency</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="index-6.html">personal portfolio</Link>
                                                    </li>
                                                </ul> */}
                                            </li>
                                            {/* <li class="menu-item-has-children">
                                                <Link to="#">Pages</Link>
                                                <ul class="sub-menu">
                                                    <li><Link to="/about">About Us</Link></li>
                                                    <li >
                                                        <Link to="/service">Service</Link>

                                                    </li>

                                                    <li >
                                                        <Link class="no-border" to="/teams">Team</Link>

                                                    </li>
                                                    <li>
                                                        <Link to="/pricing">Pricing</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/faq">FAQ's</Link>
                                                    </li>

                                                </ul>
                                            </li> */}
                                            <li><Link to="/about">About Us</Link></li>
                                            <li > <Link to="/service">Service</Link></li>
                                            <li>
                                                <Link to="/package">Packages</Link>
                                            </li>
                                            <li>
                                                <Link to="/projects">Projects</Link>
                                            </li>

                                            {/* <li >
                                                <Link to="/portfolio">Portfolio</Link>

                                            </li> */}
                                            <li >
                                                <Link to="/blog">Blog</Link>

                                            </li>
                                            <li>
                                                <Link to="/contact">Contact</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                    <button
                                        class="menuBar-toggle quanto-menu-toggle d-inline-block d-lg-none"
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
                                <div class="col-auto d-none d-lg-block">
                                    <Link class="quanto-link-btn btn-pill" to="./contact.html"
                                    >Get in touch
                                        <span>
                                            <i class="fa-solid fa-arrow-right arry1"></i>
                                            <i class="fa-solid fa-arrow-right arry2"></i>
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