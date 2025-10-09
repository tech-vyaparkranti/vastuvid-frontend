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

const TeamDetails = () => {
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
            document.querySelectorAll('.team-details__thumb').forEach((thumb) => {
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
                    <section className="quanto-team-details-section section-padding-top-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row g-4 justify-content-between">
                                <div className="col-xl-6 col-xxl-5">
                                    <div className="team-details__thumb fade-anim" data-delay="0.30" data-direction="left">
                                        <img
                                            src="/assets/images/team-details/team-details-thumb.png"
                                            alt="team-details__thumb"
                                            data-speed="0.8"
                                            className="w-100"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-xxl-6 gsap-scroll">
                                    <div className="team-details__content">
                                        <h2 className="member-title word-anim" data-delay="0.50">Audrey Tassel</h2>
                                        <h5 className="member-description move-anim" data-delay="0.70">
                                            Administrative & HR Assistant
                                        </h5>
                                        <div className="member-info">
                                            <p className="fade-anim" data-delay="0.80">
                                                Jassica Oliver is known for her ability to take a creative brief and run with it, coming back
                                                with fresh ideas and a perfectly built design file every time. From digital design to
                                                long-format layouts, she blends beautiful and intuitive with each project she touches. She also
                                                happens to be the queen of deadline-crushing, all while maintaining a can-do, Zen attitude
                                                that keeps the whole Statement team centered.
                                            </p>
                                            <p className="fade-anim" data-delay="1.00">
                                                When he’s not building strong alliances with other creatives, project managers and
                                                stakeholders alike, you’ll find him giving voice to client strategies with fresh, compelling
                                                concepts and delightfully clever messaging.
                                            </p>
                                        </div>
                                        <div className="member-contacts fade-anim" data-delay="1.20">
                                            <h5>
                                                <a href="mailto:audrey@tassel.com">audrey@tassel.com</a>
                                            </h5>
                                            <a href="tel:+18884567890">+1 888 456 7890</a>
                                        </div>
                                        <div className="member-social fade-anim" data-delay="1.40">
                                            <ul className="custom-ul">
                                                {[
                                                    { href: 'https://x.com', icon: 'fa-x-twitter' },
                                                    { href: 'https://instagram.com', icon: 'fa-instagram' },
                                                    { href: 'https://linkedin.com', icon: 'fa-linkedin' },
                                                    { href: 'https://behance.net', icon: 'fa-behance' },
                                                    { href: 'https://dribbble.com', icon: 'fa-dribbble' },
                                                ].map((social, index) => (
                                                    <li key={index}>
                                                        <a href={social.href} target="_blank" rel="noopener noreferrer">
                                                            <i className={`fab ${social.icon}`}></i>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <form className="w-100 team-details__message fade-anim" data-delay="1.60">
                                            <div className="row g-3 mb-4 fade-anim" data-delay="0.40">
                                                <div className="col-md-6">
                                                    <input type="text" className="form-control" placeholder="Your name" />
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="email" className="form-control" placeholder="Enter e-mail address" />
                                                </div>
                                            </div>
                                            <div className="mb-4 mb-lg-5 fade-anim" data-delay="0.60">
                                                <textarea className="form-control" rows="9" placeholder="Write your message"></textarea>
                                            </div>
                                            <button className="quanto-link-btn btn-pill bg-color-2">
                                                Submit
                                                <span>
                                                    <i className="fa-solid fa-arrow-right arry1"></i>
                                                    <i className="fa-solid fa-arrow-right arry2"></i>
                                                </span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default TeamDetails;