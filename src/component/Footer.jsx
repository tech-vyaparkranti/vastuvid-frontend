import React, { useEffect } from 'react'
import $ from "jquery"
import logo from '../assets/images/logo.png'
const Footer = () => {
    useEffect(() => {
        $(".marquee").each(function () {
            var $marquee = $(this);
            var $itemContainer = $marquee.find(".marquee-item-container");
            var elements = $itemContainer.find(".marquee-item").length;
            var repeatCount = elements < 5 ? 5 : elements;

            for (var i = 0; i < repeatCount; i++) {
                $itemContainer.clone().appendTo($marquee);
            }
        });

    }, [])
    return (
        <>
            <style>{`
            .footer-divider {
                    width: 100%;
                    height: 3px;
                    background: linear-gradient(90deg, #f2ebeeff, #f0ebedff);
                    margin: 15px 0;
                    border-radius: 2px;
            }
                     .header-logo {
                margin-top:5px;
  background-color: rgba(255, 255, 255, 10); /* white with slight transparency */
  padding: 8px;             /* some space around the logo */
  border-radius: 8px;       /* rounded corners (optional) */
  display: inline-block;    /* make the background fit the logo */
}
  .marquee-container .marquee .marquee-item-container .marquee-item svg{
  width:50px !important;
  height:50px !important;
  }
  .marquee-container{
  padding:50px 0px;}
        
        `}</style>

            <footer className="footer-area bg-color-primary overflow-hidden">
                <div className="marquee-container fade-anim">
                    <div className="marquee">
                        <a className="marquee-item-container" href="/contact">
                            <div className="marquee-item text-color-white">
                                <h1 className="text-color-white " style={{ fontSize: "40px", letterSpacing: "5px" }}>Let’s work together</h1>
                                <svg

                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="10"
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
                <div className="footer-divider"></div>

                <div className="footer__center section-padding-top-bottom" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-12">
                                <div className="footer-widgets-wrapper">
                                    <div className="footer-widgets fade-anim" data-delay="0.6">
                                        <div className="social-links">
                                            <img src={logo} className='header-logo img-fluid' />
                                            <div>
                                                <b style={{ color: "white" }}>Company name</b>
                                                <p style={{ color: "white" }}>Description</p>
                                            </div>
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


                                    <div className="footer-widgets contact text-color-white fade-anim">

                                        <h6 className="widget-title text-color-white">Contact</h6>
                                        <div class="social-links">
                                            <ul class="custom-ul">
                                                <li>
                                                    <a href="https://x.com" target="_blank">
                                                        <i class="fab fa-x-twitter"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://instagram.com" target="_blank">
                                                        <i class="fab fa-instagram"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://linkedin.com" target="_blank">
                                                        <i class="fab fa-linkedin"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://behance.net" target="_blank">
                                                        <i class="fab fa-behance"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://dribbble.com" target="_blank">
                                                        <i class="fab fa-dribbble"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

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
            </footer >
        </>
    )
}

export default Footer