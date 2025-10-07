// import Swiper from 'swiper';
// import 'swiper/css';
// import Odometer from 'odometer';
// import 'odometer/themes/odometer.css';

// import loader from "../assets/images/preloader.svg";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import "../assets/plugins/odometer.css"
// GSAP Imports
import { gsap, Power2 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

// Uncomment and adjust for Odometer animation
import Odometer from 'odometer';

import "odometer/themes/odometer-theme-minimal.css";

const runOdometer = (element) => {
    if (element) {
        const odometerElements = element.querySelectorAll('.odometer');
        odometerElements.forEach(el => {
            const finalValue = parseInt(el.getAttribute('data-odometer-final')) || 0;
            if (finalValue) {
                // Initialize Odometer for animation
                new Odometer({
                    el: el,
                    value: 0,
                    format: '(,ddd).dd',
                });
                // Animate to final value
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

    // State for preloader visibility
    const [preloaderVisible, setPreloaderVisible] = useState(true);

    // Odometer Refs and Activation Tracking
    const counterItemRefs = useRef([]);
    const activatedCounters = useRef(new Set());

    // Helper to store refs for multiple odometer items dynamically
    const setCounterRef = useCallback((el, index) => {
        if (el) {
            // This allows us to track all dynamically rendered counter items
            counterItemRefs.current[index] = el;
        }
    }, []);

    // ===============================================
    // 1. Preloader (Simulated with a short delay)
    // ===============================================
    useEffect(() => {
        const timer = setTimeout(() => {
            setPreloaderVisible(false);
            // Refresh ScrollTrigger after preloader to recalculate animations
            ScrollTrigger.refresh();
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // ===============================================
    // 2. Sticky Menus & Background Image Setter
    // ===============================================
    useEffect(() => {
        const handleScroll = () => {
            const stickyMenu = document.getElementById('sticky-menu');
            const quantoMenuArea = document.querySelector('.quanto-menu-area');
            const scrollY = window.scrollY;

            // Sticky Menu 1
            if (stickyMenu) {
                if (scrollY > 50) {
                    stickyMenu.classList.add('sticky-menu');
                } else {
                    stickyMenu.classList.remove('sticky-menu');
                }
            }

            // Sticky Menu 2
            if (quantoMenuArea) {
                if (scrollY >= 20) {
                    quantoMenuArea.classList.add('sticky');
                } else {
                    quantoMenuArea.classList.remove('sticky');
                }
            }
        };

        // Set Background Image (data-bg-src to style="background-image:...")

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ===============================================
    // 3. Custom Cursor
    // ===============================================
    useEffect(() => {
        const cursorElement = cursorRef.current;
        if (!cursorElement) return;

        const editCursor = (e) => {
            const { clientX: x, clientY: y } = e;
            cursorElement.style.left = x + 'px';
            cursorElement.style.top = y + 'px';
        };

        window.addEventListener('mousemove', editCursor);

        // Target elements that trigger cursor change
        const pointerElements = document.querySelectorAll('a, .cursor-pointer');

        const handleMouseOver = () => cursorElement.classList.add('cursor-active');
        const handleMouseOut = () => cursorElement.classList.remove('cursor-active');

        pointerElements.forEach(item => {
            item.addEventListener('mouseover', handleMouseOver);
            item.addEventListener('mouseout', handleMouseOut);
        });

        // Cleanup function
        return () => {
            window.removeEventListener('mousemove', editCursor);
            pointerElements.forEach(item => {
                item.removeEventListener('mouseover', handleMouseOver);
                item.removeEventListener('mouseout', handleMouseOut);
            });
        };
    }, []);

    // ===============================================
    // 4. Odometer Counter (using ScrollTrigger for activation)
    // ===============================================
    useEffect(() => {
        // We use ScrollTrigger to detect when the counter enters the viewport
        const triggers = counterItemRefs.current.map((item, index) => {
            if (item && !activatedCounters.current.has(index)) {
                return ScrollTrigger.create({
                    trigger: item,
                    start: "top bottom",
                    onEnter: () => {
                        runOdometer(item);
                        activatedCounters.current.add(index);
                    },
                    once: true,
                });
            }
            return null;
        }).filter(t => t !== null);

        return () => triggers.forEach(t => t?.kill());
    }, [setCounterRef]); // Added setCounterRef dependency for correctness

    // ===============================================
    // 5. Swiper Sliders
    // ===============================================
    useEffect(() => {
        // ✅ Initialize Swiper after component mounts
        if (typeof Swiper !== 'undefined') {
            const testimonialSlider = new Swiper(".quanto-testimonial__content-slider", {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: {
                    nextEl: ".next-btn",
                    prevEl: ".prev-btn",
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
            });
            // Cleanup Swiper instance
            return () => testimonialSlider.destroy();
        }
    }, []);

    // ===============================================
    // 6. Marquee
    // ===============================================
    useEffect(() => {
        document.querySelectorAll('.marquee').forEach(marquee => {
            // Clear existing clones if rerunning in dev mode
            const existingClones = marquee.querySelectorAll('.marquee-item-container:nth-child(n+2)');
            existingClones.forEach(clone => clone.remove());

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
    }, []);

    // ===============================================
    // 7. GSAP Core Animations & Smooth Scroll
    // ===============================================
    useEffect(() => {
        // Set default GSAP configuration
        gsap.defaults({ ease: 'power2.out', duration: 0.5 });
        const device_width = window.innerWidth;
        let smoother = null;
        let triggers = [];
        let splitTextInstances = []; // To store SplitText instances for cleanup

        // ScrollSmoother
        if (device_width > 767) {
            const hasSmooth = document.querySelector('#has_smooth');
            if (hasSmooth && hasSmooth.classList.contains('has-smooth')) {
                // Ensure ScrollSmoother hasn't been created already
                if (ScrollSmoother.get() === null) {
                    smoother = ScrollSmoother.create({
                        smooth: 0.9,
                        effects: device_width < 1025 ? false : true,
                        smoothTouch: 0.1,
                        normalizeScroll: { allowNestedScroll: true },
                        ignoreMobileResize: true,
                    });
                }
            }
        }

        // Horizontal Scroll
        const horizontalSection = horizontalScrollRef.current;
        if (device_width > 1199 && horizontalSection) {
            const horizontalTrigger = gsap.to(horizontalSection, {
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
            triggers.push(horizontalTrigger.scrollTrigger);
        }

        // GSAP Move Animation (Text Split)
        const text_animation = gsap.utils.toArray('.move-anim');
        text_animation.forEach((splitTextLine) => {
            // NOTE: window.SplitText is likely NOT defined as it's a Club GreenSock plugin.
            // Assuming it's loaded globally via a script tag.
            if (typeof window.SplitText === 'undefined') return;

            var delay_value = parseFloat(splitTextLine.getAttribute('data-delay')) || 0.1;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: splitTextLine,
                    start: 'top 85%',
                    duration: 1.3,
                    scrub: false,
                    toggleActions: 'play none none none',
                },
            });

            const itemSplitted = new window.SplitText(splitTextLine, { type: 'lines' });
            splitTextInstances.push(itemSplitted); // Store for cleanup
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
            triggers.push(tl.scrollTrigger);
        });

        // GSAP Fade Animation (Code omitted as it was not fully provided)

        // Color Change Two (Text Invert)
        const textInvert = document.querySelector(".text_invert");
        if (textInvert && typeof window.SplitText !== 'undefined') {
            const splitt = new window.SplitText(textInvert, { type: "lines" });
            splitTextInstances.push(splitt); // Store for cleanup

            gsap.set(splitt.lines, { color: "#ddd", overflow: "hidden" });

            splitt.lines.forEach((target) => {
                const trigger = gsap.to(target, {
                    color: "#000000",
                    duration: 1,
                    ease: "power2.out",
                    backgroundPositionX: 0,
                    scrollTrigger: {
                        trigger: target,
                        scrub: true,
                        start: "top 55%",
                        end: "bottom center",
                    },
                });
                triggers.push(trigger.scrollTrigger);
            });
        }

        // Animation Word (Word Animation)
        const animation_word_anim_items = gsap.utils.toArray(".word-anim");
        animation_word_anim_items.forEach((word_anim_item) => {
            if (typeof window.SplitText === 'undefined') return;

            const stagger_value = parseFloat(word_anim_item.getAttribute("data-stagger")) || 0.04;
            const translateX_value = parseFloat(word_anim_item.getAttribute("data-translateX")) || 0;
            const translateY_value = parseFloat(word_anim_item.getAttribute("data-translateY")) || 0;
            const onscroll_value = parseInt(word_anim_item.getAttribute("data-on-scroll")) || 1;
            const data_delay = parseFloat(word_anim_item.getAttribute("data-delay")) || 0.1;
            const data_duration = parseFloat(word_anim_item.getAttribute("data-duration")) || 0.75;

            const split_word = new window.SplitText(word_anim_item, { type: "chars, words" });
            splitTextInstances.push(split_word); // Store for cleanup

            const animationProps = {
                duration: data_duration,
                delay: data_delay,
                autoAlpha: 0,
                stagger: stagger_value,
                x: translateX_value || (!translateY_value && onscroll_value === 0 ? 20 : 0),
                y: translateY_value || 0,

            };

            if (onscroll_value === 1) {
                animationProps.scrollTrigger = {
                    trigger: word_anim_item,
                    start: !translateX_value && !translateY_value ? "top 85%" : "top 90%",
                };
            }
            if (onscroll_value === 1 && !translateX_value && !translateY_value) {
                animationProps.x = 20;
                animationProps.duration = 1;
            }

            const anim = gsap.from(split_word.words, animationProps);
            if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
        });

        // Image Reveal Animation

        // Hero Video Animation (Pinning)
        const heroThumb = document.querySelector(".quanto-hero__thumb");
        if (heroThumb) {
            let mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                const videoWrapper = heroThumb.querySelector(".video-wrapper");

                if (videoWrapper) {
                    const tp_hero = gsap.timeline({
                        scrollTrigger: {
                            trigger: heroThumb,
                            start: "top 70",
                            pin: true,
                            scrub: 1,
                            pinSpacing: true,
                            end: "bottom top",
                        },
                    });

                    tp_hero.to(videoWrapper, { width: "100%", duration: 1.5, ease: "power2.inOut" });
                    triggers.push(tp_hero.scrollTrigger);
                }
            });
        }

        // Quanto Service 2 Sticky Header (Pinning)
        let sp = gsap.matchMedia();
        sp.add("(min-width: 1200px)", () => {
            if (document.querySelector(".quanto-service2-section")) {
                const service2Trigger = ScrollTrigger.create({
                    trigger: ".quanto-service2-section",
                    start: "top -1%",
                    end: "bottom 110.5%",
                    pin: ".quanto-service2-section .quanto__header",
                    pinSpacing: true,
                });
                triggers.push(service2Trigger);
            }
        });

        // Sticky Blog Social Links
        const blogSocialTrigger = gsap.to(".social-links-scroll", {
            scrollTrigger: {
                trigger: ".blog-item-details .social-links",
                start: "top-=120 top",
                end: "80% top",
                pin: true,
                pinSpacing: false,
                scrub: true,
            },
        });
        triggers.push(blogSocialTrigger.scrollTrigger);

        // Cleanup function: kill GSAP instances and revert SplitText
        return () => {
            if (smoother) smoother.kill();
            triggers.forEach(t => t?.kill());
            splitTextInstances.forEach(split => split.revert());
        };
    }, []);

    // ===============================================
    // 8. Mouse-in/out Hover Effects (Quanto Pricing Box, Process Box)
    // ===============================================

    useEffect(() => {
        // Wrap in gsap.context to handle cleanup automatically
        const ctx = gsap.context(() => {
            const tp_img_reveal = gsap.utils.toArray(".img_reveal");

            tp_img_reveal.forEach((img_reveal) => {
                const image = img_reveal.querySelector("img");
                if (!image) return;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: img_reveal,
                        start: "top 90%",     // When to trigger
                        toggleActions: "play none none none",
                    },
                });

                tl.set(img_reveal, { autoAlpha: 1 });
                tl.from(img_reveal, {
                    duration: 1,
                    xPercent: -100,
                    ease: " Power2.out",
                });
                tl.from(
                    image,
                    {
                        duration: 1.5,
                        xPercent: 100,
                        scale: 1.5,
                        ease: Power2.out,
                    },
                    0
                );
            });
        });

        // Cleanup on unmount
        return () => ctx.revert()
    }, []);

    useEffect(() => {
        const targetBoxes = document.querySelectorAll('.quanto-pricing-box, .process-box');
        let cleanups = [];

        targetBoxes.forEach((box) => {
            // Create overlay element if it doesn't exist
            let overlay = box.querySelector('.hover-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'hover-overlay';
                box.insertBefore(overlay, box.firstChild);
                gsap.set(overlay, { autoAlpha: 0, y: 0, x: 0 });
            }

            // Helper function to determine mouse entry/exit direction
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

                gsap.fromTo(overlay, {
                    autoAlpha: 0,
                    x: animProps.startX || 0,
                    y: animProps.startY || 0,
                }, {
                    duration: 0.5,
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    ease: 'power2.out',
                });
            };

            const handleMouseLeave = (e) => {
                const direction = getDirection(box, e);
                const animProps = getAnimationProps(direction, false);

                gsap.to(overlay, {
                    duration: 0.5,
                    ...animProps,
                    ease: 'power2.in',
                });
            };

            box.addEventListener('mouseenter', handleMouseEnter);
            box.addEventListener('mouseleave', handleMouseLeave);

            cleanups.push(() => {
                box.removeEventListener('mouseenter', handleMouseEnter);
                box.removeEventListener('mouseleave', handleMouseLeave);
            });
        });

        return () => cleanups.forEach(cleanup => cleanup());
    }, []);

    // ===============================================
    // 9. Video Control
    // ===============================================
    useEffect(() => {
        const video = heroVideoRef.current;
        const playBtn = playBtnRef.current;

        if (video && playBtn) {
            video.pause();

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

            return () => {
                playBtn.removeEventListener('click', handlePlay);
                video.removeEventListener('click', handleVideoClick);
            };
        }
    }, []);

    // ===============================================
    // 10. Section Jump (ScrollTo)
    // ===============================================
    useEffect(() => {
        const links = document.querySelectorAll('.section-link');

        const handleClick = function (event) {
            event.preventDefault();
            const targetID = this.getAttribute('to');

            if (targetID === '#header') {
                // ScrollToPlugin is required here
                gsap.to(window, { duration: 1.5, scrollTo: { y: 0 }, ease: 'power2.inOut' });
            } else {
                const targetSection = document.querySelector(targetID);
                if (targetSection) {
                    // ScrollToPlugin is required here
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: targetSection, offsetY: 50 },
                        ease: 'power2.out',
                    });
                } else {
                    console.error(`Section with ID ${targetID} does not exist.`);
                }
            }
        };

        links.forEach(link => link.addEventListener('click', handleClick));
        return () => links.forEach(link => link.removeEventListener('click', handleClick));
    }, []);

    // ===============================================
    // 11. Sticky Team Animations (GSAP)
    // ===============================================
    useEffect(() => {
        const stickyElements = document.querySelectorAll('.gsap-sticky');
        let triggers = [];

        if (window.innerWidth >= 992) {
            stickyElements.forEach((element) => {
                const trigger = ScrollTrigger.create({
                    trigger: element,
                    start: 'top 80px',
                    end: '110% bottom',
                    pin: element,
                    pinSpacing: false,
                });
                triggers.push(trigger);
            });
        }
        return () => triggers.forEach(t => t?.kill());
    }, []);

    // ===============================================
    // 12. Hero 5 Background Animation
    // ===============================================
    useEffect(() => {
        const bgElement = hero5BgRef.current;
        if (bgElement) {
            gsap.set(bgElement, { top: '-300px', scale: 0.5 });
            gsap.to(bgElement, {
                duration: 2,
                top: '0px',
                scale: 1,
                ease: 'power2.out',
                delay: 0.6
            });
        }
    }, []);

    return (
        <>
            <div className="cursor d-none d-lg-block" ref={cursorRef}></div>

            {preloaderVisible && (
                <div className="preloader">
                    <div className="spinner-wrap">
                        <div className="preloader-logo">
                            <img src="https://via.placeholder.com/150x50/000/fff?text=Logo" alt="" className="img-fluid" />
                        </div>
                        <div className="spinner"></div>
                    </div>
                </div>
            )}

            <a href="#scroll-top" className="back-to-top-btn section-link" to="#header" id="scroll-top">
                <i className="fa-solid fa-arrow-up"></i>
            </a>

            <div className="has-smooth" id="has_smooth"></div>
            <div id="smooth-wrapper">

                <div id="smooth-content">
                    <section className="quanto-hero-section overflow-hidden">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12 position-relative">
                                    <div className="quanto-hero__content move-anim" data-delay="0.45">
                                        <h1 className="title">
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
                                        <p className="word-anim" data-delay="0.60">
                                            As long as your dreams revolve around something like; being
                                            the proud owner spectacular website.
                                        </p>
                                        <div className="client-info fade-anim" data-delay="0.60">
                                            <div className="client-images">
                                                <img
                                                    src="https://via.placeholder.com/50x50/ccc/fff?text=A"
                                                    alt="Client avatar"
                                                />
                                                <img
                                                    src="https://via.placeholder.com/50x50/ccc/fff?text=B"
                                                    alt="Client avatar"
                                                />
                                                <img
                                                    src="https://via.placeholder.com/50x50/ccc/fff?text=C"
                                                    alt="Client avatar"
                                                />
                                            </div>
                                            <div className="client-data">
                                                <h6 className="counter-item d-flex align-items-center" ref={(el) => setCounterRef(el, 0)}>

                                                    <span
                                                        className="odometer d-inline-block"
                                                        data-odometer-final="2"
                                                    >
                                                        .
                                                    </span>
                                                    <em>k+ Clients</em>
                                                </h6>
                                                <span>Award winning agency</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="quanto-hero__thumb section-margin-top">
                                        <div className="video-wrapper">
                                            <video ref={heroVideoRef} loop muted autoPlay playsInline>
                                                <source
                                                    src="https://res.cloudinary.com/ducryslbe/video/upload/v1740329511/Quanto/video.sakebul.com.mp4"
                                                    type="video/mp4"
                                                />
                                            </video>
                                            <button ref={playBtnRef} className="play-btn">Play</button> {/* Static play button */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* About Section - Complete */}
                    <section className="quanto-about-section section-padding-top overflow-hidden">
                        <div className="container custom-container">
                            <div className="row justify-content-end">
                                <div className="col-lg-10 col-xl-9 col-xxl-10">
                                    <div className="quanto-about__content">
                                        <h4 className="move-anim text_invert">
                                            Our digital strategies and design expertise focus on
                                            promoting social economy businesses, cutting-edge brands, and
                                            eco-friendly products to motivate consumers to make informed
                                            decisions towards sustainable products and services
                                        </h4>
                                        <div className="about-info row-margin-top move-anim" data-delay="0.5">
                                            <p>
                                                Whether it's crafting a visually stunning brand identity,
                                                designing immersive digital experiences, or developing
                                                strategic marketing campaigns, we approach each project
                                                with meticulous attention to detail and an unwavering
                                                dedication to quality.
                                            </p>
                                            <a className="quanto-link-btn" href="/about">
                                                More about us
                                                <span>
                                                    <i className="fa-solid fa-arrow-right arry1"></i>
                                                    <i className="fa-solid fa-arrow-right arry2"></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Funfacts Section - Complete */}
                    <section className="quanto-funfacts-section section-padding-top-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto-funfacts__wrapper">
                                        <div
                                            className="quanto-funfact-box fade-anim"
                                            data-delay="0.30"
                                            data-direction="right"
                                        >
                                            <h2 className="counter-item d-inline-flex align-items-center" ref={(el) => setCounterRef(el, 1)}>
                                                <span
                                                    className="odometer d-inline-block"
                                                    data-odometer-final="17"
                                                >
                                                    .
                                                </span>
                                                <em>+</em>
                                            </h2>
                                            <span className="funfact-info">Years of agency experience</span>
                                        </div>
                                        <div
                                            className="quanto-funfact-box fade-anim"
                                            data-delay="0.30"
                                            data-direction="right"
                                        >
                                            <h2 className="counter-item d-inline-flex align-items-center" ref={(el) => setCounterRef(el, 2)}>
                                                <span
                                                    className="odometer d-inline-block"
                                                    data-odometer-final="220"
                                                >
                                                    .
                                                </span>
                                                <em>+</em>
                                            </h2>
                                            <span className="funfact-info">Successfully projects done</span>
                                        </div>
                                        <div
                                            className="quanto-funfact-box fade-anim"
                                            data-delay="0.30"
                                            data-direction="right"
                                        >
                                            <h2 className="counter-item d-inline-flex align-items-center" ref={(el) => setCounterRef(el, 3)}>
                                                <span
                                                    className="odometer d-inline-block"
                                                    data-odometer-final="46"
                                                >
                                                    .
                                                </span>
                                                <em>+</em>
                                            </h2>
                                            <span className="funfact-info">World-wide team members</span>
                                        </div>
                                        <div
                                            className="quanto-funfact-box fade-anim"
                                            data-delay="0.30"
                                            data-direction="right"
                                        >
                                            <h2 className="counter-item d-inline-flex align-items-center" ref={(el) => setCounterRef(el, 4)}>
                                                <span
                                                    className="odometer d-inline-block"
                                                    data-odometer-final="98"
                                                >
                                                    .
                                                </span>
                                                <em>%</em>
                                            </h2>
                                            <span className="funfact-info">Clients satisfied & retention</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Project Section - Complete with static images */}
                    <section ref={horizontalScrollRef} className="quanto-project-section bg-color-primary section-padding-top-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row g-0 gy-4 gy-md-0 justify-content-between">
                                <div className="col-12 col-md-5 order-1 order-md-0">
                                    <div className="row g-0">
                                        <div className="col-md-12 project-row-gap">
                                            <div className="quanto-project-box overflow-hidden">
                                                <a href="/portfolio-details">
                                                    <div className="quanto-project-thumb overflow-hidden">
                                                        <img
                                                            src="https://via.placeholder.com/600x400/4a90e2/fff?text=Kinetic+Sandscapes"
                                                            alt="Kinetic Sandscapes project"
                                                            className="w-100 img_reveal"
                                                        />
                                                    </div>
                                                </a>
                                                <div className="quanto-project-content">
                                                    <h5 className="text-color-white line-clamp-1">
                                                        <a href="/portfolio-details">Kinetic Sandscapes</a>
                                                    </h5>
                                                    <span className="quanto-project-date text-color-white">
                                                        2024 <i className="bi bi-dash"></i> Branding
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8 mx-auto project-row-gap">
                                            <div className="quanto-project-box overflow-hidden">
                                                <a href="/portfolio-details">
                                                    <div className="quanto-project-thumb overflow-hidden">
                                                        <img
                                                            src="https://via.placeholder.com/400x300/50c878/fff?text=Brooklyn+Brewery"
                                                            alt="Brooklyn Brewery project"
                                                            className="w-100 img_reveal"
                                                        />
                                                    </div>
                                                </a>
                                                <div className="quanto-project-content">
                                                    <h5 className="text-color-white line-clamp-1">
                                                        <a href="/portfolio-details">Brooklyn Brewery</a>
                                                    </h5>
                                                    <span className="quanto-project-date text-color-white">
                                                        2024 <i className="bi bi-dash"></i> Photography
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="quanto-project-box overflow-hidden">
                                                <a href="/portfolio-details">
                                                    <div className="quanto-project-thumb overflow-hidden">
                                                        <img
                                                            src="https://via.placeholder.com/600x400/7ed321/fff?text=Regenerative+Farming"
                                                            alt="Regenerative Farming project"
                                                            className="w-100 img_reveal"
                                                        />
                                                    </div>
                                                </a>
                                                <div className="quanto-project-content">
                                                    <h5 className="text-color-white line-clamp-1">
                                                        <a href="/portfolio-details">Regenerative Farming</a>
                                                    </h5>
                                                    <span className="quanto-project-date text-color-white">
                                                        2024 <i className="bi bi-dash"></i> Branding
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 order-0 order-md-1">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="quanto__header text-center text-md-end">
                                                <a className="quanto-link-btn btn-dark" href="/portfolio-gallery">
                                                    View more works
                                                    <span>
                                                        <i className="fa-solid fa-arrow-right arry1"></i>
                                                        <i className="fa-solid fa-arrow-right arry2"></i>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-10 ms-auto project-row-gap">
                                            <div className="quanto-project-box overflow-hidden">
                                                <a href="/portfolio-details">
                                                    <div className="quanto-project-thumb max-655 overflow-hidden">
                                                        <img
                                                            src="https://via.placeholder.com/500x350/9013fe/fff?text=Hopscotch+Payments"
                                                            alt="Hopscotch Payments project"
                                                            className="w-100 img_reveal"
                                                        />
                                                    </div>
                                                </a>
                                                <div className="quanto-project-content">
                                                    <h5 className="text-color-white line-clamp-1">
                                                        <a href="/portfolio-details">Hopscotch Payments</a>
                                                    </h5>
                                                    <span className="quanto-project-date text-color-white">
                                                        2024 <i className="bi bi-dash"></i> Development
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-9 me-auto project-row-gap">
                                            <div className="quanto-project-box overflow-hidden">
                                                <a href="/portfolio-details">
                                                    <div className="quanto-project-thumb overflow-hidden">
                                                        <img
                                                            src="https://via.placeholder.com/450x300/f5a623/fff?text=Stories+Worthwhile"
                                                            alt="Stories Worthwhile project"
                                                            className="w-100 img_reveal"
                                                        />
                                                    </div>
                                                </a>
                                                <div className="quanto-project-content">
                                                    <h5 className="text-color-white line-clamp-1">
                                                        <a href="/portfolio-details">Stories Worthwhile</a>
                                                    </h5>
                                                    <span className="quanto-project-date text-color-white">
                                                        2024 <i className="bi bi-dash"></i> UI/UX Design
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-10 ms-auto">
                                            <div className="quanto-project-box overflow-hidden">
                                                <a href="/portfolio-details">
                                                    <div className="quanto-project-thumb overflow-hidden">
                                                        <img
                                                            src="https://via.placeholder.com/500x350/50e3c2/fff?text=Fintech+Accelerator"
                                                            alt="Fintech Accelerator project"
                                                            className="w-100 img_reveal"
                                                        />
                                                    </div>
                                                </a>
                                                <div className="quanto-project-content">
                                                    <h5 className="text-color-white line-clamp-1">
                                                        <a href="/portfolio-details">Fintech Accelerator</a>
                                                    </h5>
                                                    <span className="quanto-project-date text-color-white">
                                                        2024 <i className="bi bi-dash"></i> UI/UX Design
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Service Section - Complete with static icons */}
                    <section className="quanto-service-section section-padding-top-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12 col-lg-9 col-xl-7 col-xxl-6">
                                    <div
                                        className="quanto__header fade-anim"
                                        data-delay="0.30"
                                        data-direction="left"
                                    >
                                        <h3 className="title">We help you to build digital business</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 row-padding-top">
                                <div className="col-md-6 col-lg-4 col-xxl-3">
                                    <div className="quanto-service-box move-anim">
                                        <div className="quanto-iconbox-icon">
                                            <img
                                                src="https://via.placeholder.com/60x60/4a90e2/fff?text=BS"
                                                alt="Brand Strategy icon"
                                            />
                                        </div>
                                        <div className="quanto-iconbox-data">
                                            <div className="quanto-iconbox-data-wrapper">
                                                <h5>Brand Strategy</h5>
                                                <p>Brand identity design is key to success with Quanto agency.</p>
                                            </div>
                                            <a className="quanto-link-btn" href="/service-details">
                                                View details
                                                <span>
                                                    <i className="fa-solid fa-arrow-right arry1"></i>
                                                    <i className="fa-solid fa-arrow-right arry2"></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 col-xxl-3">
                                    <div className="quanto-service-box move-anim">
                                        <div className="quanto-iconbox-icon">
                                            <img
                                                src="https://via.placeholder.com/60x60/50c878/fff?text=WD"
                                                alt="Web Development icon"
                                            />
                                        </div>
                                        <div className="quanto-iconbox-data">
                                            <div className="quanto-iconbox-data-wrapper">
                                                <h5>Web Development</h5>
                                                <p>Brand identity design is key to success with Quanto agency.</p>
                                            </div>
                                            <a className="quanto-link-btn" href="/service-details">
                                                View details
                                                <span>
                                                    <i className="fa-solid fa-arrow-right arry1"></i>
                                                    <i className="fa-solid fa-arrow-right arry2"></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 col-xxl-3">
                                    <div className="quanto-service-box move-anim">
                                        <div className="quanto-iconbox-icon">
                                            <img
                                                src="https://via.placeholder.com/60x60/7ed321/fff?text=UX"
                                                alt="UI/UX Design icon"
                                            />
                                        </div>
                                        <div className="quanto-iconbox-data">
                                            <div className="quanto-iconbox-data-wrapper">
                                                <h5>UI/UX Design</h5>
                                                <p>Brand identity design is key to success with Quanto agency.</p>
                                            </div>
                                            <a className="quanto-link-btn" href="/service-details">
                                                View details
                                                <span>
                                                    <i className="fa-solid fa-arrow-right arry1"></i>
                                                    <i className="fa-solid fa-arrow-right arry2"></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 col-xxl-3">
                                    <div className="quanto-service-box move-anim">
                                        <div className="quanto-iconbox-icon">
                                            <img
                                                src="https://via.placeholder.com/60x60/f5a623/fff?text=DM"
                                                alt="Digital Marketing icon"
                                            />
                                        </div>
                                        <div className="quanto-iconbox-data">
                                            <div className="quanto-iconbox-data-wrapper">
                                                <h5>Digital Marketing</h5>
                                                <p>Brand identity design is key to success with Quanto agency.</p>
                                            </div>
                                            <a className="quanto-link-btn" href="/service-details">
                                                View details
                                                <span>
                                                    <i className="fa-solid fa-arrow-right arry1"></i>
                                                    <i className="fa-solid fa-arrow-right arry2"></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Testimonial Section - Complete with static images */}
                    <section className="quanto-testimonial-section section-padding-top overflow-hidden">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto__header">
                                        <h3
                                            className="title fade-anim"
                                            data-delay="0.30"
                                            data-direction="right"
                                        >
                                            Client testimonials
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 justify-content-between">
                                <div className="col-12 col-lg-6 col-xl-5">
                                    <div
                                        className="swiper quanto-testimonial__thumb-slider h-100 fade-anim"
                                        data-delay="0.30"
                                        data-direction="right"
                                    >
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div
                                                    className="testimonial-img"
                                                    data-speed="0.8"
                                                    style={{
                                                        backgroundImage:
                                                            'ur[](https://via.placeholder.com/300x300/ccc/fff?text=Testimonial+1)',
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="testimonial-img"
                                                    data-speed="0.8"
                                                    style={{
                                                        backgroundImage:
                                                            'ur[](https://via.placeholder.com/300x300/ccc/fff?text=Testimonial+2)',
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="testimonial-img"
                                                    data-speed="0.8"
                                                    style={{
                                                        backgroundImage:
                                                            'ur[](https://via.placeholder.com/300x300/ccc/fff?text=Testimonial+3)',
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="testimonial-img"
                                                    data-speed="0.8"
                                                    style={{
                                                        backgroundImage:
                                                            'ur[](https://via.placeholder.com/300x300/ccc/fff?text=Testimonial+4)',
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div
                                                    className="testimonial-img"
                                                    data-speed="0.8"
                                                    style={{
                                                        backgroundImage:
                                                            'ur[](https://via.placeholder.com/300x300/ccc/fff?text=Testimonial+5)',
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <div className="swiper quanto-testimonial__content-slider">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div className="testimonial-content">
                                                    <p>
                                                        “Quanto team quickly understood our business
                                                        requirements and were proactive and flexible with our
                                                        ongoing support and developments. You can definitely
                                                        trust them for complex project requirements as they are
                                                        top-notch in their field and we can only recommend it.”
                                                    </p>
                                                    <div className="author">
                                                        <h5 className="author-title">Jenny Bennett</h5>
                                                        <span className="author-designation">
                                                            Senior Marketing Manager at Caya
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="testimonial-content">
                                                    <p>
                                                        “The Quanto team delivered exceptional results,
                                                        transforming our digital presence with their innovative
                                                        approach. Their attention to detail and commitment to
                                                        quality are unmatched.”
                                                    </p>
                                                    <div className="author">
                                                        <h5 className="author-title">Michael Chen</h5>
                                                        <span className="author-designation">
                                                            CTO at InnovateTech
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
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

                    {/* Clients Section - Complete with static logos */}
                    <div className="clients-area section-padding-top overflow-hidden">
                        <div className="clients__wrapper">
                            <div className="container custom-container">
                                <div className="row align-items-end">
                                    <div className="col-md-6">
                                        <div className="quanto__header text-center text-md-start">
                                            <p
                                                className="title mx-auto mx-md-0 fade-anim"
                                                data-delay="0.30"
                                                data-direction="left"
                                            >
                                                We worked with largest global brands
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 ps-md-0">
                                        <div className="quanto__header logo">
                                            <div
                                                className="client-box fade-anim"
                                                data-delay="0.30"
                                                data-direction="right"
                                            >
                                                <img src="https://via.placeholder.com/100x40/000/fff?text=Logo1" alt="Client logo" />
                                            </div>
                                            <div
                                                className="client-box fade-anim"
                                                data-delay="0.30"
                                                data-direction="right"
                                            >
                                                <img src="https://via.placeholder.com/100x40/000/fff?text=Logo2" alt="Client logo" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 clients__box-wrapper">
                                        <div className="client-box d-none">
                                            <img src="https://via.placeholder.com/100x40/000/fff?text=Logo1" alt="Client logo" />
                                        </div>
                                        <div className="client-box d-none">
                                            <img src="https://via.placeholder.com/100x40/000/fff?text=Logo2" alt="Client logo" />
                                        </div>
                                        <div
                                            className="client-box fade-anim"
                                            data-delay="0.30"
                                            data-direction="right"
                                        >
                                            <img src="https://via.placeholder.com/100x40/000/fff?text=Logo3" alt="Client logo" />
                                        </div>
                                        <div
                                            className="client-box fade-anim"
                                            data-delay="0.30"
                                            data-direction="right"
                                        >
                                            <img src="https://via.placeholder.com/100x40/000/fff?text=Logo4" alt="Client logo" />
                                        </div>
                                        <div
                                            className="client-box fade-anim"
                                            data-delay="0.30"
                                            data-direction="right"
                                        >
                                            <img src="https://via.placeholder.com/100x40/000/fff?text=Logo5" alt="Client logo" />
                                        </div>
                                        <div
                                            className="client-box fade-anim"
                                            data-delay="0.30"
                                            data-direction="right"
                                        >
                                            <img src="https://via.placeholder.com/100x40/000/fff?text=Logo6" alt="Client logo" />
                                        </div>
                                        <div
                                            className="client-box fade-anim"
                                            data-delay="0.30"
                                            data-direction="right"
                                        >
                                            <img src="https://via.placeholder.com/100x40/000/fff?text=Logo7" alt="Client logo" />
                                        </div>
                                        <div
                                            className="client-box fade-anim"
                                            data-delay="0.30"
                                            data-direction="right"
                                        >
                                            <img src="https://via.placeholder.com/100x40/000/fff?text=Logo8" alt="Client logo" />
                                        </div>
                                        <div className="client-box d-none d-sm-block d-md-none d-lg-block border-0"></div>
                                        <div
                                            className="client-box fade-anim"
                                            data-delay="0.30"
                                            data-direction="right"
                                        >
                                            <img src="https://via.placeholder.com/100x40/000/fff?text=Logo9" alt="Client logo" />
                                        </div>
                                        <div
                                            className="client-box fade-anim"
                                            data-delay="0.30"
                                            data-direction="right"
                                        >
                                            <img src="https://via.placeholder.com/100x40/000/fff?text=Logo10" alt="Client logo" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blog Section - Complete with static thumbnails */}
                    <section className="quanto-blog-section section-padding-top-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row g-3 align-items-end">
                                <div className="col-12 col-lg-9 col-xl-7 col-xxl-6">
                                    <div className="quanto__header text-center text-md-start">
                                        <h3
                                            className="title fade-anim"
                                            data-delay="0.30"
                                            data-direction="left"
                                        >
                                            Latest blog to boost your productivity
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-3 col-xl-5 col-xxl-6">
                                    <div className="quanto__headerr d-flex justify-content-center justify-content-lg-end">
                                        <a className="quanto-link-btn" href="/blog-grid">
                                            View all articles
                                            <span>
                                                <i className="fa-solid fa-arrow-right arry1"></i>
                                                <i className="fa-solid fa-arrow-right arry2"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 row-padding-top">
                                <div className="col-md-6 col-lg-4">
                                    <div
                                        className="quanto-blog-box fade-anim"
                                        data-delay="0.30"
                                        data-direction="right"
                                    >
                                        <div className="quanto-blog-thumb">
                                            <a href="/blog-details">
                                                <img src="https://via.placeholder.com/400x250/4a90e2/fff?text=Blog+1" alt="Blog thumbnail" />
                                            </a>
                                        </div>
                                        <div className="quanto-blog-content">
                                            <h5 className="line-clamp-2">
                                                <a href="/blog-details">
                                                    Reveal business opportunities with our five point brand audit
                                                </a>
                                            </h5>
                                            <span className="quanto-blog-date">March 8, 2024</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div
                                        className="quanto-blog-box fade-anim"
                                        data-delay="0.45"
                                        data-direction="right"
                                    >
                                        <div className="quanto-blog-thumb">
                                            <a href="/blog-details">
                                                <img src="https://via.placeholder.com/400x250/50c878/fff?text=Blog+2" alt="Blog thumbnail" />
                                            </a>
                                        </div>
                                        <div className="quanto-blog-content">
                                            <h5 className="line-clamp-2">
                                                <a href="/blog-details">
                                                    Quanto agency revolutionizes work with the power of ai-driven
                                                </a>
                                            </h5>
                                            <span className="quanto-blog-date">March 8, 2024</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="quanto-blog-box fade-anim" data-delay="0.60">
                                        <div className="quanto-blog-thumb">
                                            <a href="/blog-details">
                                                <img src="https://via.placeholder.com/400x250/7ed321/fff?text=Blog+3" alt="Blog thumbnail" />
                                            </a>
                                        </div>
                                        <div className="quanto-blog-content">
                                            <h5 className="line-clamp-2">
                                                <a href="/blog-details">
                                                    How young leaders can take charge of their professional growth
                                                </a>
                                            </h5>
                                            <span className="quanto-blog-date">March 8, 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Additional Complete Sections for Full Preview - Pricing (Example) */}
                    <section className="quanto-pricing-section section-padding-top-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto__header text-center">
                                        <h3 className="title">Our Pricing Plans</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-md-4">
                                    <div className="quanto-pricing-box">
                                        <h4>Basic Plan</h4>
                                        <p>$99/month</p>
                                        <ul>
                                            <li>Basic Features</li>
                                            <li>Support</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="quanto-pricing-box">
                                        <h4>Standard Plan</h4>
                                        <p>$199/month</p>
                                        <ul>
                                            <li>Advanced Features</li>
                                            <li>Priority Support</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="quanto-pricing-box">
                                        <h4>Premium Plan</h4>
                                        <p>$299/month</p>
                                        <ul>
                                            <li>All Features</li>
                                            <li>24/7 Support</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Process Section (Example) */}
                    <section className="quanto-process-section section-padding-top-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto__header text-center">
                                        <h3 className="title">Our Process</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-md-3">
                                    <div className="process-box">
                                        <h5>Discovery</h5>
                                        <p>Understand your needs.</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="process-box">
                                        <h5>Design</h5>
                                        <p>Create concepts.</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="process-box">
                                        <h5>Development</h5>
                                        <p>Build the solution.</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="process-box">
                                        <h5>Launch</h5>
                                        <p>Go live and support.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Team Section (Example) */}
                    <section className="quanto-team-section section-padding-top-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto__header text-center">
                                        <h3 className="title">Our Team</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-md-3">
                                    <div className="gsap-sticky">
                                        <img src="https://via.placeholder.com/250x300/ccc/fff?text=Team+1" alt="Team Member" />
                                        <h5>John Doe</h5>
                                        <p>Designer</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="gsap-sticky">
                                        <img src="https://via.placeholder.com/250x300/ccc/fff?text=Team+2" alt="Team Member" />
                                        <h5>Jane Smith</h5>
                                        <p>Developer</p>
                                    </div>
                                </div>
                                {/* Add more team members as needed */}
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </>
    );
};

export default Index;