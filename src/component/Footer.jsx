import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="footer-area bg-color-primary overflow-hidden">
                <div className="marquee-container fade-anim">
                    <div className="marquee">
                        <a className="marquee-item-container" href="/contact">
                            <div className="marquee-item text-color-white">
                                <h1 className="text-color-white">Let’s work together</h1>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="150"
                                    height="150"
                                    viewBox="0 0 150 150"
                                    fill="none"
                                >
                                    <path
                                        d="M100.023 58.8388L46.232 112.63L37.3932 103.791L91.1844 50H43.7733V37.5H112.523V106.25H100.023V58.8388Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="footer__center section-padding-top-bottom">
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-12">
                                <div className="footer-widgets-wrapper">
                                    <div className="footer-widgets contact text-color-white fade-anim">
                                        <h6 className="widget-title text-color-white">Contact</h6>
                                        <p className="address">
                                            740 New South Head Rd, Triple Bay Swfw 3108, New York
                                        </p>
                                        <div className="contacts">
                                            <ul className="custom-ul">
                                                <li>
                                                    <a className="email" href="mailto:hello@quanto.agency">
                                                        hello@quanto.agency
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="mobile" href="tel:+18884567890">
                                                        +1 888 456 7890
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="footer-widgets fade-anim" data-delay="0.2">
                                        <h6 className="widget-title text-color-white">Agency</h6>
                                        <div className="widget-links">
                                            <ul className="custom-ul">
                                                <li><a href="/">Home</a></li>
                                                <li><a href="/portfolio-masonry">Case Studies</a></li>
                                                <li><a href="/about">About Us</a></li>
                                                <li><a href="/service">Services</a></li>
                                                <li><a href="#">Testimonials</a></li>
                                                <li><a href="/contact">Contact</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="footer-widgets fade-anim" data-delay="0.4">
                                        <h6 className="widget-title text-color-white">Services</h6>
                                        <div className="widget-links">
                                            <ul className="custom-ul">
                                                <li><a href="/service-details">Brand Strategy</a></li>
                                                <li><a href="/service-details">Web Development</a></li>
                                                <li><a href="/service-details">UI/UX Design</a></li>
                                                <li><a href="/service-details">Digital Marketing</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="footer-widgets fade-anim" data-delay="0.6">
                                        <div className="social-links">
                                            <ul className="custom-ul">
                                                <li>
                                                    <a
                                                        href="https://x.com"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <i className="fab fa-x-twitter"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="https://instagram.com"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <i className="fab fa-instagram"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="https://linkedin.com"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <i className="fab fa-linkedin"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="https://behance.net"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <i className="fab fa-behance"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="https://dribbble.com"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <i className="fab fa-dribbble"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer__bottom has-bodder">
                    <div className="container custom-container p-xxl-0 overflow-hidden">
                        <div className="row">
                            <div className="col-12">
                                <div className="footer__bottom-content row-padding-bottom">
                                    <div className="copyright-text text-color-white">
                                        All rights reserved — 2025 &copy; MirrorTheme
                                    </div>
                                    <a href="#header" className="scroll-to-top section-link">
                                        Back to top <i className="fas fa-angle-up"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer