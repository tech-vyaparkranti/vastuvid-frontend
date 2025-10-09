import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom'; // Import Link for SPA navigation
import Swiper from 'swiper';
import 'swiper/css';
import Odometer from 'odometer';
import 'odometer/themes/odometer-theme-minimal.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import { gsap, Power2 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from 'gsap/SplitText';
import img1 from "../assets/images/clients/logo-3.png";
import video4 from "../assets/images/video.mp4"
import client from "../assets/images/client.webp"
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);

const runOdometer = (element) => {
    if (element) {
        const odometerElements = element.querySelectorAll('.odometer');
        odometerElements.forEach((el) => {
            const finalValue = parseInt(el.getAttribute('data-odometer-final')) || 0;
            if (finalValue) {
                new Odometer({
                    el: el,
                    value: 0,
                    format: '(,ddd).dd',
                });
                setTimeout(() => {
                    el.odometer.update(finalValue);
                }, 100);
            }
        });
    }
};

const Index = () => {
    const heroVideoRef = useRef(null);
    const playBtnRef = useRef(null);
    const cursorRef = useRef(null);
    const horizontalScrollRef = useRef(null);
    const hero5BgRef = useRef(null);
    const [preloaderVisible, setPreloaderVisible] = useState(true);
    const counterItemRefs = useRef([]);
    const activatedCounters = useRef(new Set());

    const setCounterRef = useCallback((el, index) => {
        if (el) {
            counterItemRefs.current[index] = el;
        }
    }, []);

    useEffect(() => {
        // Initialize AOS
        Aos.init({
            duration: 2000,
            once: false, // Allow animations to replay on scroll
            mirror: true, // Animate elements when scrolling past them again
        });

        // GSAP Context for animations and cleanup
        const ctx = gsap.context(() => {
            // Preloader
            setTimeout(() => {
                setPreloaderVisible(false);
                ScrollTrigger.refresh();
            }, 800);

            // Sticky Menus & Background Image Setter
            const handleScroll = () => {
                const stickyMenu = document.getElementById('sticky-menu');
                const quantoMenuArea = document.querySelector('.quanto-menu-area');
                const scrollY = window.scrollY;

                if (stickyMenu) {
                    if (scrollY > 50) {
                        stickyMenu.classList.add('sticky-menu');
                        quantoMenuArea?.classList.add('sticky');
                    } else {
                        stickyMenu.classList.remove('sticky-menu');
                        quantoMenuArea?.classList.remove('sticky');
                    }
                }
            };
            window.addEventListener('scroll', handleScroll);

            // Set Background Image
            $('[data-bg-src]').each(function () {
                const src = $(this).attr('data-bg-src');
                $(this).css('background-image', `url(${src})`).addClass('background-image').removeAttr('data-bg-src');
            });

            // Custom Cursor
            const cursorElement = cursorRef.current;
            if (cursorElement) {
                const editCursor = (e) => {
                    cursorElement.style.left = `${e.clientX}px`;
                    cursorElement.style.top = `${e.clientY}px`;
                };
                window.addEventListener('mousemove', editCursor);
                document.querySelectorAll('a, .cursor-pointer').forEach((item) => {
                    item.addEventListener('mouseover', () => cursorElement.classList.add('cursor-active'));
                    item.addEventListener('mouseout', () => cursorElement.classList.remove('cursor-active'));
                });
            }

            // Smooth Scrolling
            if (window.innerWidth > 767 && document.querySelector('#has_smooth')) {
                ScrollSmoother.create({
                    smooth: 0.9,
                    effects: window.innerWidth < 1500 ? false : true,
                    smoothTouch: 0.1,
                    normalizeScroll: { allowNestedScroll: true },
                    ignoreMobileResize: true,
                });
            }

            // Horizontal Scroll
            const horizontalSection = horizontalScrollRef.current;
            if (window.innerWidth > 1199 && horizontalSection) {
                gsap.to(horizontalSection, {
                    x: () => horizontalSection.scrollWidth * -1,
                    xPercent: 100,
                    scrollTrigger: {
                        trigger: horizontalSection,
                        start: 'center center',
                        end: '+=3000px',
                        pin: horizontalSection,
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                });
            }

            // Hero Video Animation (Pinning)
            const heroThumb = document.querySelector('.quanto-hero__thumb');
            if (heroThumb) {
                let mm = gsap.matchMedia();
                mm.add('(min-width: 768px)', () => {
                    const videoWrapper = heroThumb.querySelector('.video-wrapper');
                    if (videoWrapper) {
                        gsap.to(videoWrapper, {
                            width: '100%',
                            ease: 'power2.inOut',
                            duration: 2, // ⚡ plays smoothly
                            scrollTrigger: {
                                trigger: heroThumb,
                                start: 'top 80%', // 👈 when section top reaches 80% of viewport
                                toggleActions: 'play none none none', // 👈 plays once
                                markers: false  // set true for debugging
                            }
                        });
                    }
                });
            }

            // Move Animation
            document.querySelectorAll('.move-anim').forEach((splitTextLine) => {
                const delay_value = parseFloat(splitTextLine.getAttribute('data-delay')) || 0.1;
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
                    delay: delay_value,
                    opacity: 0,
                    rotationX: -80,
                    force3D: true,
                    transformOrigin: 'top center -50',
                    stagger: 0.1,
                });
            });

            // Fade Animation
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

            // Word Animation
            document.querySelectorAll('.word-anim').forEach((word_anim_item) => {
                const stagger_value = parseFloat(word_anim_item.getAttribute('data-stagger') || 0.04);
                const translateX_value = parseFloat(word_anim_item.getAttribute('data-translateX') || 0);
                const translateY_value = parseFloat(word_anim_item.getAttribute('data-translateY') || 0);
                const onscroll_value = parseInt(word_anim_item.getAttribute('data-on-scroll') || 1);
                const data_delay = parseFloat(word_anim_item.getAttribute('data-delay') || 0.1);
                const data_duration = parseFloat(word_anim_item.getAttribute('data-duration') || 0.75);
                const split_word = new SplitText(word_anim_item, { type: 'chars, words' });
                const animation_settings = {
                    duration: data_duration,
                    delay: data_delay,
                    autoAlpha: 0,
                    stagger: stagger_value,
                    x: translateX_value || (!translateY_value && onscroll_value === 0 ? 20 : 0),
                    y: translateY_value || 0,
                };
                if (onscroll_value === 1) {
                    animation_settings.scrollTrigger = {
                        trigger: word_anim_item,
                        start: !translateX_value && !translateY_value ? 'top 85%' : 'top 90%',
                    };
                }
                gsap.from(split_word.words, animation_settings);
            });

            // Text Invert Animation
            const textInvert = document.querySelector('.text_invert');
            if (textInvert) {
                const splitt = new SplitText(textInvert, { type: 'lines' });
                gsap.set(splitt.lines, { color: '#ddd', overflow: 'hidden' });
                splitt.lines.forEach((target) => {
                    gsap.to(target, {
                        color: '#63334E',
                        duration: 1,
                        ease: 'power2.out',
                        backgroundPositionX: 0,
                        scrollTrigger: {
                            trigger: target,
                            scrub: true,
                            start: 'top 55%',
                            end: 'bottom center',
                        },
                    });
                });
            }

            // Odometer Counter
            counterItemRefs.current.forEach((item, index) => {
                if (item && !activatedCounters.current.has(index)) {
                    ScrollTrigger.create({
                        trigger: item,
                        start: 'top bottom',
                        onEnter: () => {
                            runOdometer(item);
                            activatedCounters.current.add(index);
                        },
                        once: true,
                    });
                }
            });

            // Swiper Slider
            if (typeof Swiper !== 'undefined') {
                const testimonialSlider = new Swiper('.quanto-testimonial__content-slider', {
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween: 20,
                    navigation: {
                        nextEl: '.next-btn',
                        prevEl: '.prev-btn',
                    },
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    thumbs: {
                        swiper: new Swiper('.quanto-testimonial__thumb-slider', {
                            loop: true,
                            slidesPerView: 1,
                            spaceBetween: 20,
                        }),
                    },
                });
            }

            // Marquee
            document.querySelectorAll('.marquee').forEach((marquee) => {
                const existingClones = marquee.querySelectorAll('.marquee-item-container:nth-child(n+2)');
                existingClones.forEach((clone) => clone.remove());
                const itemContainer = marquee.querySelector('.marquee-item-container');
                if (itemContainer) {
                    const elements = itemContainer.querySelectorAll('.marquee-item').length;
                    const repeatCount = elements < 5 ? 5 : elements;
                    for (let i = 0; i < repeatCount; i++) {
                        const clone = itemContainer.cloneNode(true);
                        marquee.appendChild(clone);
                    }
                }
            });

            // Image Reveal Animation
            gsap.utils.toArray('.img_reveal').forEach((img_reveal) => {
                const image = img_reveal.querySelector('img');
                if (!image) return;
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: img_reveal,
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                    },
                });
                tl.set(img_reveal, { autoAlpha: 1 });
                tl.from(img_reveal, { duration: 1, xPercent: -100, ease: 'power2.out' });
                tl.from(image, { duration: 1.5, xPercent: 100, scale: 1.5, ease: Power2.out }, 0);
            });

            // Mouse Hover Effects
            const targetBoxes = document.querySelectorAll('.quanto-pricing-box, .process-box');
            targetBoxes.forEach((box) => {
                let overlay = box.querySelector('.hover-overlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'hover-overlay';
                    box.insertBefore(overlay, box.firstChild);
                    gsap.set(overlay, { autoAlpha: 0, y: 0, x: 0 });
                }

                const getDirection = (box, event) => {
                    const rect = box.getBoundingClientRect();
                    const mouseX = event.clientX - rect.left;
                    const mouseY = event.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const relativeX = mouseX - centerX;
                    const relativeY = mouseY - centerY;
                    const angle = Math.atan2(relativeY, relativeX);
                    const degrees = angle * (180 / Math.PI);
                    if (degrees >= -45 && degrees <= 45) return 'right';
                    if (degrees > 45 && degrees <= 135) return 'bottom';
                    if (degrees > 135 || degrees <= -135) return 'left';
                    return 'top';
                };

                const getAnimationProps = (direction, isEntering) => {
                    const animProps = { autoAlpha: isEntering ? 1 : 0, x: 0, y: 0 };
                    const distance = 100;
                    switch (direction) {
                        case 'right': animProps[isEntering ? 'startX' : 'x'] = distance + '%'; break;
                        case 'left': animProps[isEntering ? 'startX' : 'x'] = -distance + '%'; break;
                        case 'bottom': animProps[isEntering ? 'startY' : 'y'] = distance + '%'; break;
                        case 'top': animProps[isEntering ? 'startY' : 'y'] = -distance + '%'; break;
                    }
                    return animProps;
                };

                const handleMouseEnter = (e) => {
                    const direction = getDirection(box, e);
                    const animProps = getAnimationProps(direction, true);
                    gsap.fromTo(
                        overlay,
                        { autoAlpha: 0, x: animProps.startX || 0, y: animProps.startY || 0 },
                        { duration: 0.5, autoAlpha: 1, x: 0, y: 0, ease: 'power2.out' }
                    );
                };

                const handleMouseLeave = (e) => {
                    const direction = getDirection(box, e);
                    const animProps = getAnimationProps(direction, false);
                    gsap.to(overlay, { duration: 0.5, ...animProps, ease: 'power2.in' });
                };

                box.addEventListener('mouseenter', handleMouseEnter);
                box.addEventListener('mouseleave', handleMouseLeave);
            });

            // Video Control
            const video = heroVideoRef.current;
            const playBtn = playBtnRef.current;
            if (video && playBtn) {
                const videoSpeed = 1.5; // Example: 0.5 for half speed (slower)
                // Example: 1.5 for one and a half speed (faster)

                video.playbackRate = videoSpeed;
                const handlePlay = () => {
                    video.play();
                    playBtn.classList.add('disabled');
                    video.classList.add('pointer');
                };
                const handleVideoClick = () => {
                    if (playBtn.classList.contains('disabled')) {
                        video.pause();
                        playBtn.classList.remove('disabled');
                        video.classList.remove('pointer');
                    }
                };
                playBtn.addEventListener('click', handlePlay);
                video.addEventListener('click', handleVideoClick);
            }

            // Section Jump
            document.querySelectorAll('.section-link').forEach((link) => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    const targetID = link.getAttribute('href') || link.getAttribute('to');
                    if (targetID === '#header') {
                        gsap.to(window, { duration: 1.5, scrollTo: { y: 0 }, ease: 'power2.inOut' });
                    } else {
                        const targetSection = document.querySelector(targetID);
                        if (targetSection) {
                            gsap.to(window, { duration: 1, scrollTo: { y: targetSection, offsetY: 50 }, ease: 'power2.out' });
                        } else {
                            console.error(`Section with ID ${targetID} does not exist.`);
                        }
                    }
                });
            });

            // Sticky Team Animations
            if (window.innerWidth >= 992) {
                document.querySelectorAll('.gsap-sticky').forEach((element) => {
                    ScrollTrigger.create({
                        trigger: element,
                        start: 'top 80px',
                        end: '110% bottom',
                        pin: element,
                        pinSpacing: false,
                    });
                });
            }

            // Hero 5 Background Animation
            const bgElement = hero5BgRef.current;
            if (bgElement) {
                gsap.set(bgElement, { top: '-300px', scale: 0.5 });
                gsap.to(bgElement, { duration: 2, top: '0px', scale: 1, ease: 'power2.out', delay: 0.6 });
            }

            // Testimonial Thumbnail Parallax
            document.querySelectorAll('.testimonial-img').forEach((thumb) => {
                const dataSpeed = parseFloat(thumb.getAttribute('data-speed') || 0.8);
                gsap.to(thumb, {
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
        });

        // Cleanup
        return () => {
            ctx.revert();
            window.removeEventListener('scroll', () => { });
            window.removeEventListener('mousemove', () => { });
            document.querySelectorAll('a, .cursor-pointer').forEach((item) => {
                item.removeEventListener('mouseover', () => { });
                item.removeEventListener('mouseout', () => { });
            });
            document.querySelectorAll('.section-link').forEach((link) => {
                link.removeEventListener('click', () => { });
            });
            if (heroVideoRef.current && playBtnRef.current) {
                heroVideoRef.current.removeEventListener('click', () => { });
                playBtnRef.current.removeEventListener('click', () => { });
            }
        };
    }, []);

    return (
        <>
            <div className="cursor d-none d-lg-block" ref={cursorRef}></div>
            {preloaderVisible && (
                <div className="preloader">
                    <div className="spinner-wrap">
                        <div className="preloader-logo">
                            <img src="/assets/images/preloader.svg" alt="Preloader" className="img-fluid" loading="lazy" />
                        </div>
                        <div className="spinner"></div>
                    </div>
                </div>
            )}
            <Link to="#header" className="back-to-top-btn section-link" id="scroll-top">
                <i className="fa-solid fa-arrow-up"></i>
            </Link>
            <div >
                <div id="smooth-content">
                    <section className="quanto-hero-section">
                        <div className="container-fluid custom-container">
                            {/* <div className="row">
                                <div className="col-12 position-relative">
                                    <div className="quanto-hero__content move-anim" data-delay="0.45">
                                        <h1 className="title word-anim" data-delay="0.60">
                                            Crafting your fantasies with a twist of{' '}
                                            <span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="110"
                                                    height="110"
                                                    viewBox="0 0 110 110"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M60.5 0H49.5L53.0145 50.2065L19.9982 12.22L12.22 19.9982L50.2065 53.0145L1.44248e-06 49.5L0 60.5L50.2065 56.9856L12.22 90.0018L19.9982 97.78L53.0145 59.7935L49.5 110H60.5L56.9855 59.7935L90.0018 97.78L97.78 90.0018L59.7935 56.9855L110 60.5V49.5L59.7936 53.0145L97.78 19.9982L90.0018 12.22L56.9855 50.2065L60.5 0Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>{' '}
                                                creativity
                                            </span>
                                        </h1>
                                    </div>
                                    <div className="quanto-hero__info">
                                        <p className="word-anim" data-delay="0.75">
                                            As long as your dreams revolve around something like; being the proud owner spectacular website.
                                        </p>
                                        <div className="client-info fade-anim" data-delay="0.90">
                                            <div className="client-images">
                                                {['A', 'B', 'C'].map((letter, index) => (
                                                    <img
                                                        key={index}
                                                        src={`https://via.placeholder.com/50x50/ccc/fff?text=${letter}`}
                                                        alt={`Client avatar ${letter}`}
                                                        loading="lazy"
                                                    />
                                                ))}
                                            </div>
                                            <div className="client-data">
                                                <h6 className="counter-item d-flex align-items-center" ref={(el) => setCounterRef(el, 0)}>
                                                    <span className="odometer d-inline-block" data-odometer-final="2"></span>
                                                    <em>k+ Clients</em>
                                                </h6>
                                                <span>Award winning agency</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            <div className="row">
                                <div className="col-lg-12 " style={{ padding: "0px" }}>
                                    <div class="quanto-hero__thumb section-margin-top">
                                        <div class="video-wrapper">
                                            <video ref={heroVideoRef} loop="" muted autoplay="" playsinline="">
                                                <source
                                                    src={video4}
                                                    type="video/mp4"
                                                />
                                            </video>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="quanto-about-section section-padding-top overflow-hidden">
                        <div className="container custom-container">
                            <div className="row justify-content-end">
                                <div className="col-lg-10 col-xl-9 col-xxl-10">
                                    <div className="quanto-about__content">
                                        <h4 className="move-anim text_invert" data-delay="0.45">
                                            Our digital strategies and design expertise focus on promoting social economy businesses, cutting-edge brands, and eco-friendly products to motivate consumers to make informed decisions towards sustainable products and services
                                        </h4>
                                        <div className="about-info row-margin-top move-anim" data-delay="0.60">
                                            <p>
                                                Whether it's crafting a visually stunning brand identity, designing immersive digital experiences, or developing strategic marketing campaigns, we approach each project with meticulous attention to detail and an unwavering dedication to quality.
                                            </p>
                                            <Link to="/about" className="quanto-link-btn section-link" style={{ color: " #63334E", fontSize: "24px" }}>
                                                More about us
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
                    </section>

                    <section className="quanto-funfacts-section section-padding-top-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto-funfacts__wrapper">
                                        {[
                                            { value: 17, text: 'Years of agency experience', index: 1 },
                                            { value: 220, text: 'Successfully projects done', index: 2 },
                                            { value: 46, text: 'World-wide team members', index: 3 },
                                            { value: 98, text: 'Clients satisfied & retention', unit: '%', index: 4 },
                                        ].map((fact, index) => (
                                            <div key={index} className="quanto-funfact-box fade-anim" data-delay={0.30 + index * 0.15} data-direction="right">
                                                <h2 className="counter-item d-inline-flex align-items-center" ref={(el) => setCounterRef(el, fact.index)}>
                                                    <span className="odometer d-inline-block" data-odometer-final={fact.value}></span>
                                                    <em>{fact.unit || '+'}</em>
                                                </h2>
                                                <span className="funfact-info">{fact.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="quanto-project-section bg-color-primary section-padding-top-bottom overflow-hidden" ref={horizontalScrollRef}>

                        <style>
                            {`
     .sacred-geometry {
            position: absolute;
            width: 800px;
            height: 800px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.15;
        }

        .rotating-square {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid white;
            animation: rotateSquare 30s linear infinite;
        }

        .rotating-square:nth-child(2) {
            animation-delay: -10s;
            border-color: white;
        }

        .rotating-square:nth-child(3) {
            animation-delay: -20s;
            border-color: white;
        }

        @keyframes rotateSquare {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

    `}
                        </style>

                        <div className="container custom-container">

                            <div className="row g-0 gy-4 gy-md-0 justify-content-between">
                                <div class="sacred-geometry">
                                    <div class="rotating-square"></div>
                                    <div class="rotating-square"></div>
                                    <div class="rotating-square"></div>
                                </div>
                                <div className="col-12 col-md-5 order-1 order-md-0">
                                    <div className="row g-0">
                                        {[
                                            { title: 'Kinetic Sandscapes', category: 'Branding', img: img1 },
                                            { title: 'Brooklyn Brewery', category: 'Photography', img: img1 },
                                            { title: 'Regenerative Farming', category: 'Branding', img: img1 },
                                        ].map((project, index) => (
                                            <div key={index} className={`col-md-${index === 0 ? '12' : index === 1 ? '8 mx-auto' : '12'} project-row-gap`}>
                                                <div className="quanto-project-box overflow-hidden fade-anim" data-delay={0.30 + index * 0.15}>
                                                    <Link to="/portfolio-details" className="section-link">
                                                        <div className="quanto-project-thumb overflow-hidden">
                                                            <img src={project.img} alt={`${project.title} project`} className="w-100 img_reveal" loading="lazy" />
                                                        </div>
                                                    </Link>
                                                    <div className="quanto-project-content">
                                                        <h5 className="text-color-white line-clamp-1">
                                                            <Link to="/portfolio-details">{project.title}</Link>
                                                        </h5>
                                                        <span className="quanto-project-date text-color-white">
                                                            2024 <i className="bi bi-dash"></i> {project.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 order-0 order-md-1">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="quanto__header text-center text-md-end">
                                                <Link to="/portfolio-gallery" className="quanto-link-btn btn-dark section-link">
                                                    View more works
                                                    <span>
                                                        <i className="fa-solid fa-arrow-right arry1"></i>
                                                        <i className="fa-solid fa-arrow-right arry2"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                        {[
                                            { title: 'Hopscotch Payments', category: 'Development', img: 'https://via.placeholder.com/500x350/9013fe/fff?text=Hopscotch+Payments', className: 'col-md-10 ms-auto project-row-gap' },
                                            { title: 'Stories Worthwhile', category: 'UI/UX Design', img: 'https://via.placeholder.com/450x300/f5a623/fff?text=Stories+Worthwhile', className: 'col-md-9 me-auto project-row-gap' },
                                            { title: 'Fintech Accelerator', category: 'UI/UX Design', img: 'https://via.placeholder.com/500x350/50e3c2/fff?text=Fintech+Accelerator', className: 'col-md-10 ms-auto' },
                                        ].map((project, index) => (
                                            <div key={index} className={project.className}>
                                                <div className="quanto-project-box overflow-hidden fade-anim" data-delay={0.30 + (index + 3) * 0.15}>
                                                    <Link to="/portfolio-details" className="section-link">
                                                        <div className="quanto-project-thumb max-655 overflow-hidden">
                                                            <img src={project.img} alt={`${project.title} project`} className="w-100 img_reveal" loading="lazy" />
                                                        </div>
                                                    </Link>
                                                    <div className="quanto-project-content">
                                                        <h5 className="text-color-white line-clamp-1">
                                                            <Link to="/portfolio-details">{project.title}</Link>
                                                        </h5>
                                                        <span className="quanto-project-date text-color-white">
                                                            2024 <i className="bi bi-dash"></i> {project.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="quanto-service-section section-padding-top-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12 col-lg-9 col-xl-7 col-xxl-6">
                                    <div className="quanto__header fade-anim" data-delay="0.30" data-direction="left">
                                        <h3 className="title word-anim" data-delay="0.45">We help you to build digital business</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 row-padding-top">
                                {[
                                    { title: 'Brand Strategy', icon: 'https://via.placeholder.com/60x60/4a90e2/fff?text=BS' },
                                    { title: 'Web Development', icon: 'https://via.placeholder.com/60x60/50c878/fff?text=WD' },
                                    { title: 'UI/UX Design', icon: 'https://via.placeholder.com/60x60/7ed321/fff?text=UX' },
                                    { title: 'Digital Marketing', icon: 'https://via.placeholder.com/60x60/f5a623/fff?text=DM' },
                                ].map((service, index) => (
                                    <div key={index} className="col-md-6 col-lg-4 col-xxl-3">
                                        <div className="quanto-service-box move-anim" data-delay={0.30 + index * 0.15}>
                                            <div className="quanto-iconbox-icon">
                                                <img src={service.icon} alt={`${service.title} icon`} loading="lazy" />
                                            </div>
                                            <div className="quanto-iconbox-data">
                                                <div className="quanto-iconbox-data-wrapper">
                                                    <h5 style={{ color: "#63334E" }}>{service.title}</h5>
                                                    <p>Brand identity design is key to success with Quanto agency.</p>
                                                </div>
                                                <Link to="/service-details" className="quanto-link-btn section-link">
                                                    View details
                                                    <span>
                                                        <i className="fa-solid fa-arrow-right arry1"></i>
                                                        <i className="fa-solid fa-arrow-right arry2"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="quanto-testimonial-section section-padding-top overflow-hidden">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto__header">
                                        <h3 className="title word-anim" style={{ color: " #63334E !important" }} data-delay="0.30" data-direction="right">
                                            Client testimonials
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 justify-content-between">
                                <div className="col-12 col-lg-6 col-xl-5">
                                    <div className="swiper quanto-testimonial__thumb-slider h-100 fade-anim" data-delay="0.30" data-direction="right">
                                        <div className="swiper-wrapper">
                                            {['1', '2', '3', '4', '5'].map((num, index) => (
                                                <div key={index} className="swiper-slide">
                                                    <div
                                                        className="testimonial-img"
                                                        data-speed="0.8"
                                                        style={{
                                                            backgroundImage: `ur[](https://via.placeholder.com/300x300/ccc/fff?text=Testimonial+${num})`,
                                                        }}
                                                    ></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <div className="swiper quanto-testimonial__content-slider">
                                        <div className="swiper-wrapper">
                                            {[
                                                {
                                                    text: 'Quanto team quickly understood our business requirements and were proactive and flexible with our ongoing support and developments. You can definitely trust them for complex project requirements as they are top-notch in their field and we can only recommend it.',
                                                    author: 'Jenny Bennett',
                                                    designation: 'Senior Marketing Manager at Caya',
                                                },
                                                {
                                                    text: 'The Quanto team delivered exceptional results, transforming our digital presence with their innovative approach. Their attention to detail and commitment to quality are unmatched.',
                                                    author: 'Michael Chen',
                                                    designation: 'CTO at InnovateTech',
                                                },
                                            ].map((testimonial, index) => (
                                                <div key={index} className="swiper-slide">
                                                    <div className="testimonial-content fade-anim" data-delay={0.30 + index * 0.15}>
                                                        <p>{testimonial.text}</p>
                                                        <div className="author">
                                                            <h5 className="author-title">{testimonial.author}</h5>
                                                            <span className="author-designation">{testimonial.designation}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="quanto-testimonial__navigation">
                                        <div className="quanto-testimonial__prev prev-slide">
                                            <i className="fa-solid fa-arrow-left prev-btn"></i>
                                        </div>
                                        <div className="quanto-testimonial__next next-slide">
                                            <i className="fa-solid fa-arrow-right next-btn"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="clients-area section-padding-top overflow-hidden">
                        <div className="clients__wrapper">
                            <div className="container custom-container">
                                <div className="row align-items-end">
                                    <div className="col-md-6">
                                        <div className="quanto__header text-center text-md-start">
                                            <p className="title mx-auto mx-md-0 word-anim" data-delay="0.30" data-direction="left">
                                                We worked with largest global brands
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 ps-md-0">
                                        <div className="quanto__header logo">
                                            {['Logo1', 'Logo2'].map((logo, index) => (
                                                <div key={index} className="client-box fade-anim" data-delay={0.30 + index * 0.15} data-direction="right">
                                                    <img src={client} alt="Client logo" loading="lazy" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 clients__box-wrapper">
                                        {['Logo1', 'Logo2'].map((logo, index) => (
                                            <div key={index} className="client-box d-none">
                                                <img src={`https://via.placeholder.com/100x40/000/fff?text=${logo}`} alt="Client logo" loading="lazy" />
                                            </div>
                                        ))}
                                        {['Logo3', 'Logo4', 'Logo5', 'Logo6', 'Logo7', 'Logo8', 'Logo9', 'Logo10'].map((logo, index) => (
                                            <div key={index} className="client-box fade-anim" data-delay={0.30 + index * 0.15} data-direction="right">
                                                <img src={`https://via.placeholder.com/100x40/000/fff?text=${logo}`} alt="Client logo" loading="lazy" />
                                            </div>
                                        ))}
                                        <div className="client-box d-none d-sm-block d-md-none d-lg-block border-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="quanto-blog-section section-padding-top-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row g-3 align-items-end">
                                <div className="col-12 col-lg-9 col-xl-7 col-xxl-6">
                                    <div className="quanto__header text-center text-md-start">
                                        <h3 className="title word-anim" data-delay="0.30" data-direction="left">
                                            Latest blog to boost your productivity
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-3 col-xl-5 col-xxl-6">
                                    <div className="quanto__headerr d-flex justify-content-center justify-content-lg-end">
                                        <Link to="/blog-grid" className="quanto-link-btn section-link">
                                            View all articles
                                            <span>
                                                <i className="fa-solid fa-arrow-right arry1"></i>
                                                <i className="fa-solid fa-arrow-right arry2"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 row-padding-top">
                                {[
                                    {
                                        title: 'Reveal business opportunities with our five point brand audit',
                                        img: 'https://via.placeholder.com/400x250/4a90e2/fff?text=Blog+1',
                                        date: 'March 8, 2024',
                                    },
                                    {
                                        title: 'Quanto agency revolutionizes work with the power of ai-driven',
                                        img: 'https://via.placeholder.com/400x250/50c878/fff?text=Blog+2',
                                        date: 'March 8, 2024',
                                    },
                                    {
                                        title: 'How young leaders can take charge of their professional growth',
                                        img: 'https://via.placeholder.com/400x250/7ed321/fff?text=Blog+3',
                                        date: 'March 8, 2024',
                                    },
                                ].map((blog, index) => (
                                    <div key={index} className="col-md-6 col-lg-4">
                                        <div className="quanto-blog-box fade-anim" data-delay={0.30 + index * 0.15} data-direction="right">
                                            <div className="quanto-blog-thumb">
                                                <Link to="/blog-details" className="section-link">
                                                    <img src={blog.img} alt="Blog thumbnail" loading="lazy" />
                                                </Link>
                                            </div>
                                            <div className="quanto-blog-content">
                                                <h5 className="line-clamp-2">
                                                    <Link to="/blog-details">{blog.title}</Link>
                                                </h5>
                                                <span className="quanto-blog-date">{blog.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="quanto-pricing-section section-padding-top-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto__header text-center">
                                        <h3 className="title word-anim" data-delay="0.30">Our Pricing Plans</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                {[
                                    { title: 'Basic Plan', price: '$99/month', features: ['Basic Features', 'Support'] },
                                    { title: 'Standard Plan', price: '$199/month', features: ['Advanced Features', 'Priority Support'] },
                                    { title: 'Premium Plan', price: '$299/month', features: ['All Features', '24/7 Support'] },
                                ].map((plan, index) => (
                                    <div key={index} className="col-md-4">
                                        <div className="quanto-pricing-box fade-anim" data-delay={0.30 + index * 0.15}>
                                            <h4>{plan.title}</h4>
                                            <p>{plan.price}</p>
                                            <ul>
                                                {plan.features.map((feature, i) => (
                                                    <li key={i}>{feature}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="quanto-process-section section-padding-top-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto__header text-center">
                                        <h3 className="title word-anim" data-delay="0.30">Our Process</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                {[
                                    { title: 'Discovery', text: 'Understand your needs.' },
                                    { title: 'Design', text: 'Create concepts.' },
                                    { title: 'Development', text: 'Build the solution.' },
                                    { title: 'Launch', text: 'Go live and support.' },
                                ].map((step, index) => (
                                    <div key={index} className="col-md-3">
                                        <div className="process-box fade-anim" data-delay={0.30 + index * 0.15}>
                                            <h5>{step.title}</h5>
                                            <p>{step.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="quanto-team-section section-padding-top-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto__header text-center">
                                        <h3 className="title word-anim" data-delay="0.30">Our Team</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                {[
                                    { name: 'John Doe', role: 'Designer', img: 'https://via.placeholder.com/250x300/ccc/fff?text=Team+1' },
                                    { name: 'Jane Smith', role: 'Developer', img: 'https://via.placeholder.com/250x300/ccc/fff?text=Team+2' },
                                ].map((member, index) => (
                                    <div key={index} className="col-md-3">
                                        <div className="gsap-sticky fade-anim" data-delay={0.30 + index * 0.15}>
                                            <img src={member.img} alt="Team Member" loading="lazy" />
                                            <h5>{member.name}</h5>
                                            <p>{member.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Index;