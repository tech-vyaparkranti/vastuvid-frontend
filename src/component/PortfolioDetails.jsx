import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link for SPA navigation
import 'swiper/css'; // Optional, only if you plan to add Swiper sliders
import 'odometer/themes/odometer-theme-default.css'; // Optional, only if you plan to add Odometer counters
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import Aos from 'aos';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const PortfolioDetails = () => {
    const smootherRef = useRef(null);
    const gsapContext = useRef(null);

    useEffect(() => {
        // Initialize AOS
        Aos.init({
            duration: 2000,
            once: false, // Allow animations to replay on scroll
            mirror: true, // Animate elements when scrolling past them again
        });

        // GSAP Context for animations and cleanup
        gsapContext.current = gsap.context(() => {
            // Preloader
            $('.preloader').delay(800).fadeOut('slow');

            // Sticky Menu
            const handleScroll = () => {
                const scroll = window.scrollY;
                if (scroll > 50) {
                    $('#sticky-menu').addClass('sticky-menu');
                    $('.quanto-menu-area').addClass('sticky');
                } else {
                    $('#sticky-menu').removeClass('sticky-menu');
                    $('.quanto-menu-area').removeClass('sticky');
                }
            };
            window.addEventListener('scroll', handleScroll);

            // Set Background Image
            $('[data-bg-src]').each(function () {
                const src = $(this).attr('data-bg-src');
                $(this).css('background-image', `url(${src})`).addClass('background-image').removeAttr('data-bg-src');
            });

            // Custom Cursor
            const cursor = document.querySelector('.cursor');
            if (cursor) {
                const editCursor = (e) => {
                    cursor.style.left = `${e.clientX}px`;
                    cursor.style.top = `${e.clientY}px`;
                };
                window.addEventListener('mousemove', editCursor);
                document.querySelectorAll('a, .cursor-pointer').forEach((item) => {
                    item.addEventListener('mouseover', () => cursor.classList.add('cursor-active'));
                    item.addEventListener('mouseout', () => cursor.classList.remove('cursor-active'));
                });
            }

            // Smooth Scrolling
            if (window.innerWidth > 767 && document.querySelector('#has_smooth')) {
                smootherRef.current = ScrollSmoother.create({
                    smooth: 0.9,
                    effects: window.innerWidth < 1500 ? false : true,
                    smoothTouch: 0.1,
                    normalizeScroll: { allowNestedScroll: true },
                    ignoreMobileResize: true,
                });
            }

            // GSAP Sticky for Headers
            document.querySelectorAll('.gsap-sticky').forEach((stickyElement) => {
                ScrollTrigger.create({
                    trigger: stickyElement,
                    start: 'top 100px',
                    endTrigger: '.gsap-scroll',
                    end: 'bottom bottom',
                    pin: true,
                    pinSpacing: false,
                });
            });

            // Move Animation for Content
            document.querySelectorAll('.move-anim').forEach((splitTextLine) => {
                const delay_value = splitTextLine.getAttribute('data-delay') || 0.1;
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: splitTextLine,
                        start: 'top 85%',
                        duration: 1.3,
                        toggleActions: 'play none none none',
                    },
                });
                const itemSplitted = new SplitText(splitTextLine, { type: 'lines' });
                gsap.set(splitTextLine, { perspective: 400 });
                itemSplitted.split({ type: 'lines' });
                tl.from(itemSplitted.lines, {
                    duration: 1,
                    delay: parseFloat(delay_value),
                    opacity: 0,
                    rotationX: -80,
                    force3D: true,
                    transformOrigin: 'top center -50',
                    stagger: 0.1,
                });
            });

            // Fade Animation for Content and Thumbnails
            document.querySelectorAll('.fade-anim').forEach((item) => {
                const fade_direction = item.getAttribute('data-direction') || 'bottom';
                const onscroll_value = item.getAttribute('data-on-scroll') || 1;
                const duration_value = parseFloat(item.getAttribute('data-duration') || 1.15);
                const fade_offset = parseFloat(item.getAttribute('data-offset') || 50);
                const delay_value = parseFloat(item.getAttribute('data-delay') || 0.15);
                const ease_value = item.getAttribute('data-ease') || 'power2.out';
                const animation_settings = {
                    opacity: 0,
                    ease: ease_value,
                    duration: duration_value,
                    delay: delay_value,
                };
                if (fade_direction === 'top') animation_settings.y = -fade_offset;
                if (fade_direction === 'left') animation_settings.x = -fade_offset;
                if (fade_direction === 'bottom') animation_settings.y = fade_offset;
                if (fade_direction === 'right') animation_settings.x = fade_offset;
                if (onscroll_value == 1) {
                    animation_settings.scrollTrigger = {
                        trigger: item,
                        start: 'top 85%',
                    };
                }
                gsap.from(item, animation_settings);
            });

            // Word Animation for Titles
            document.querySelectorAll('.word-anim').forEach((word_anim_item) => {
                const stagger_value = parseFloat(word_anim_item.getAttribute('data-stagger') || 0.04);
                const translateX_value = word_anim_item.getAttribute('data-translateX') || false;
                const translateY_value = word_anim_item.getAttribute('data-translateY') || false;
                const onscroll_value = word_anim_item.getAttribute('data-on-scroll') || 1;
                const data_delay = parseFloat(word_anim_item.getAttribute('data-delay') || 0.1);
                const data_duration = parseFloat(word_anim_item.getAttribute('data-duration') || 0.75);
                const split_word = new SplitText(word_anim_item, { type: 'chars, words' });
                const animation_settings = {
                    duration: data_duration,
                    delay: data_delay,
                    autoAlpha: 0,
                    stagger: stagger_value,
                };
                if (translateX_value) animation_settings.x = parseFloat(translateX_value);
                if (translateY_value) animation_settings.y = parseFloat(translateY_value);
                if (!translateX_value && !translateY_value) animation_settings.x = 20;
                if (onscroll_value == 1) {
                    animation_settings.scrollTrigger = {
                        trigger: word_anim_item,
                        start: 'top 90%',
                    };
                }
                gsap.from(split_word.words, animation_settings);
            });

            // Image Parallax Animation for Thumbnails
            document.querySelectorAll('.quanto-hero__thumb, .portfolio-details__image').forEach((thumb) => {
                const image = thumb.querySelector('img');
                const dataSpeed = parseFloat(thumb.querySelector('img').getAttribute('data-speed') || 0.8);
                gsap.to(image, {
                    yPercent: 20 * (1 - dataSpeed),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: thumb,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                });
            });

            // Section Jump for Scroll Links
            document.querySelectorAll('.section-link').forEach((link) => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    const targetID = link.getAttribute('href');
                    if (targetID === '#header') {
                        gsap.to(window, { duration: 1.5, scrollTo: { y: 0 }, ease: 'power2.inOut' });
                    } else {
                        const targetSection = document.querySelector(targetID);
                        if (targetSection) {
                            gsap.to(window, { duration: 1, scrollTo: { y: targetSection, offsetY: 50 } });
                        } else {
                            console.error(`Section with ID ${targetID} does not exist.`);
                        }
                    }
                });
            });
        });

        // Cleanup
        return () => {
            if (smootherRef.current) smootherRef.current.kill();
            gsapContext.current.revert();
            window.removeEventListener('scroll', () => { });
            window.removeEventListener('mousemove', () => { });
            document.querySelectorAll('a, .cursor-pointer').forEach((item) => {
                item.removeEventListener('mouseover', () => { });
                item.removeEventListener('mouseout', () => { });
            });
            document.querySelectorAll('.section-link').forEach((link) => {
                link.removeEventListener('click', () => { });
            });
            console.log('Cleaned up animations and event listeners');
        };
    }, []);

    return (
        <>
            <div className="cursor d-none d-lg-block"></div>
            <div className="preloader">
                <div className="spinner-wrap">
                    <div className="preloader-logo">
                        <img src="/assets/images/preloader.svg" alt="Preloader" className="img-fluid" loading="lazy" />
                    </div>
                    <div className="spinner"></div>
                </div>
            </div>
            <Link to="#header" id="scroll-top" className="back-to-top-btn section-link">
                <i className="fa-solid fa-arrow-up"></i>
            </Link>
            <div >
                <div id="smooth-content">
                    <section className="quanto-hero-common-section section-padding-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row g-4">
                                <div className="col-lg-12 col-xxl-11">
                                    <div className="quanto-hero-common__content move-anim" data-delay="0.45">
                                        <h1 className="title word-anim" data-delay="0.60">Hopscotch Payments</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="quanto-image-area style-2 overflow-hidden">
                        <div className="container custom-container position-relative">
                            <Link to="#quanto-portfolio-details-section" className="scroll-down section-link">
                                Scroll down
                                <img src="/assets/images/icons/scroll-down.svg" alt="Scroll down" loading="lazy" />
                            </Link>
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto-hero__thumb text-end fade-anim" data-delay="0.30" data-direction="bottom">
                                        <img
                                            src="/assets/images/portfolio-details/portfolio-details-thumb.png"
                                            alt="Image Area"
                                            data-speed="0.8"
                                            className="d-block w-100"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="quanto-portfolio-details-section" className="quanto-portfolio-details-section section-padding-top-bottom">
                        <div className="container custom-container">
                            <div className="row g-4 justify-content-between">
                                <div className="col-lg-4 gsap-sticky">
                                    <h2 className="portfolio-details__title word-anim" data-delay="0.45">
                                        Project overview
                                    </h2>
                                </div>
                                <div className="col-lg-6 gsap-scroll">
                                    <div className="portfolio-details__content">
                                        <p className="move-anim" data-delay="0.45">
                                            Tasked with revamping the branding and corporate website for Bit Weaver Studio, a forward-thinking
                                            creative agency, our team delved deep into their ethos, distilling their essence into a kaleidoscope
                                            of colors, shapes, and narratives. Seamlessly blending innovative design with user-centric
                                            functionality, we transformed their online presence into an immersive journey, reflecting their
                                            diverse talents and imaginative approach. From the fluidity of the logo to the intricacies of the
                                            interface, every element was meticulously crafted, resulting in a captivating showcase of
                                            Reimagining Reality creativity and our studio's design finesse.
                                        </p>
                                        <p className="portfolio-text move-anim" data-delay="0.60">
                                            This package is ideal for businesses aiming to launch new products, enhance existing ones, or
                                            establish a competitive edge in their industry. By combining thoughtful design, strategic
                                            innovation, and a user-first approach, we create products.
                                        </p>
                                        <Link to="/index" className="quanto-link-btn">
                                            Visit live website
                                            <span>
                                                <i className="fa-solid fa-arrow-right arry1"></i>
                                                <i className="fa-solid fa-arrow-right arry2"></i>
                                            </span>
                                        </Link>
                                    </div>
                                    <div className="portfolio-details__info row-padding-top">
                                        {[
                                            { title: 'Category', info: 'Branding', delay: 0.2 },
                                            { title: 'Service', info: 'Brand Strategy', delay: 0.4 },
                                            { title: 'Date', info: 'March 6, 2024', delay: 0.6 },
                                            { title: 'Client', info: 'MirrorTheme', delay: 0.8 },
                                            { title: 'Software', info: 'Webflow, Figma', delay: 1.0 },
                                        ].map((item, index) => (
                                            <div key={index} className="portfolio-details-box fade-anim" data-delay={item.delay}>
                                                <span className="title">{item.title}</span>
                                                <h6 className="info">{item.info}</h6>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3 g-lg-4 section-padding-top">
                                {[
                                    '/assets/images/portfolio-details/portfolio-details-fig-1.png',
                                    '/assets/images/portfolio-details/portfolio-details-fig-2.png',
                                    '/assets/images/portfolio-details/portfolio-details-fig-3.png',
                                ].map((src, index) => (
                                    <div key={index} className={`col-${index === 2 ? '12' : 'sm-6'} overflow-hidden portfolio-details__image fade-anim`} data-delay={0.30 + index * 0.15}>
                                        <img
                                            src={src}
                                            alt="portfolio-details-fig"
                                            data-speed="0.8"
                                            className="w-100"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PortfolioDetails;