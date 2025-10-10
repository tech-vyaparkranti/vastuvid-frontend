import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom'; // Import Link for SPA navigation
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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
import video4 from "../assets/images/video.mp4"
import client from "../assets/images/client.webp"
import construction from "../assets/images/construction.png"
import working1 from "../assets/images/working1.png"
import working2 from "../assets/images/working2.png"
import working3 from "../assets/images/working3.png"
import working4 from "../assets/images/working4.png"
import working5 from "../assets/images/working5.png"
import working6 from "../assets/images/working6.png"
import bgImage from "../assets/images/testimonial.png"
import service1 from "../assets/images/service1.png"
import service2 from "../assets/images/service2.png"
import service3 from "../assets/images/service3.png"
import service4 from "../assets/images/service3.png"

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
        let services = null;
        try {
            services = new Swiper('.swipers', {
                loop: true,
                speed: 1000, // Increased for smoother transitions
                spaceBetween: 30,
                slidesPerView: 1,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                autoplay: {
                    delay: 5000, // 5s delay for better pacing
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                breakpoints: {
                    640: { slidesPerView: 2, loopAdditionalSlides: 4 },
                    1024: { slidesPerView: 3, loopAdditionalSlides: 4 },
                    1400: { slidesPerView: 4, loopAdditionalSlides: 4 },
                },
            });
            console.log('Swiper initialized:', services);
        } catch (error) {
            console.error('Swiper initialization failed:', error);
        }

        // Cleanup Swiper instance on component unmount
        return () => {
            if (services && typeof services.destroy === 'function') {
                try {
                    services.destroy(true, true);
                    console.log('Swiper destroyed');
                } catch (error) {
                    console.error('Swiper destroy failed:', error);
                }
            }
        };
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
            // const horizontalSection = horizontalScrollRef.current;
            // if (window.innerWidth > 1199 && horizontalSection) {

            //     gsap.to(horizontalSection, {
            //         x: () => horizontalSection.scrollWidth * -1,
            //         xPercent: 100,
            //         scrollTrigger: {
            //             trigger: horizontalSection,
            //             start: 'center center',
            //             end: '+=10px',
            //             pin: horizontalSection,
            //             scrub: true,
            //             invalidateOnRefresh: true,
            //         },
            //     });
            // }


            // Horizontal Scroll
            // const horizontalSection = horizontalScrollRef.current;
            // if (window.innerWidth > 1199 && horizontalSection) {
            //     // Wait for images to load before creating scroll trigger
            //     const images = horizontalSection.querySelectorAll('img');
            //     const imagePromises = Array.from(images).map(img => {
            //         if (img.complete) return Promise.resolve();
            //         return new Promise(resolve => {
            //             img.onload = resolve;
            //             img.onerror = resolve;
            //         });
            //     });

            //     Promise.all(imagePromises).then(() => {
            //         gsap.to(horizontalSection, {
            //             x: () => horizontalSection.scrollWidth * -1,
            //             xPercent: 100,
            //             scrollTrigger: {
            //                 trigger: horizontalSection,
            //                 start: 'center center',
            //                 end: '+=10px',
            //                 pin: horizontalSection,
            //                 scrub: true,
            //                 invalidateOnRefresh: true,
            //             },
            //         });
            //         // Refresh after setting up
            //         ScrollTrigger.refresh();
            //     });
            // }

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
            document.querySelectorAll(".move-anim").forEach((splitTextLine) => {
                const delay_value = splitTextLine.getAttribute("data-delay") || 0.1;
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: splitTextLine,
                        start: "top 85%",
                        duration: 1.3,
                        toggleActions: "play none none none",
                    },
                });
                const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
                gsap.set(splitTextLine, { perspective: 400 });
                itemSplitted.split({ type: "lines" });
                tl.from(itemSplitted.lines, {
                    duration: 1,
                    delay: parseFloat(delay_value),
                    opacity: 0,
                    rotationX: -80,
                    force3D: true,
                    transformOrigin: "top center -50",
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
            document.querySelectorAll(".img_reveal").forEach((img_reveal) => {
                const image = img_reveal.querySelector("img");
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: img_reveal,
                        start: "top 70%",
                    },
                });
                tl.set(img_reveal, { autoAlpha: 1 })
                    .from(img_reveal, { xPercent: -100, ease: "power2.out", duration: 1 })
                    .from(image, { xPercent: 100, scale: 1.5, ease: "power2.out", duration: 1.5 }, "-=1.5");
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
                const videoSpeed = 2; // Example: 0.5 for half speed (slower)
                // Example: 1.5 for one and a half speed (faster)

                video.playbackRate = videoSpeed;
                const handlePlay = () => {
                    video.play();
                    playBtn.classList.add('disabled');
                    video.classList.add('pointer');
                };
                const handleVideoClick = () => {
                    if (playBtn.classList.contains('disabled')) {
                        // video.pause();
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
    useEffect(() => {
        const horizontalSection = horizontalScrollRef.current;

        if (window.innerWidth > 1199 && horizontalSection) {
            const images = horizontalSection.querySelectorAll('img');
            const imagePromises = Array.from(images).map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            });

            Promise.all(imagePromises).then(() => {
                // Kill any existing ScrollTriggers on this element
                ScrollTrigger.getAll().forEach(st => {
                    if (st.trigger === horizontalSection) {
                        st.kill();
                    }
                });

                // FIXED: Calculate the actual distance to move
                const scrollDistance = horizontalSection.scrollWidth - horizontalSection.offsetWidth;

                // Reset position first
                gsap.set(horizontalSection, { x: 0 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: horizontalSection,
                        start: 'top top',
                        end: () => `+=${scrollDistance}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                        markers: true,
                    }
                });

                tl.fromTo(horizontalSection,
                    { x: 0 },  // Start from 0
                    {
                        x: -scrollDistance,  // Move exactly the scroll distance
                        ease: 'none',
                    }
                );

                // Force refresh after setup
                requestAnimationFrame(() => {
                    ScrollTrigger.refresh();
                });
            });
        }

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === horizontalScrollRef.current) {
                    st.kill();
                }
            });
        };
    }, []);
    return (
        <>
            <div className="cursor d-none d-lg-block" ref={cursorRef}></div>
            {preloaderVisible && (
                <div className="preloader">
                    <div className="spinner-wrap">
                        <div className="preloader-logo">
                            <img src="/assets/images/VastuLogo.png" alt="Preloader" className="img-fluid" loading="lazy" />
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
                    <section className="quanto-hero-section overflow-hidden">
                        <div className="container-fluid custom-container">

                            <div className="row">
                                <div className="col-lg-12" style={{ padding: "0px" }}>
                                    <div class="quanto-hero__thumb section-margin-top">
                                        <div class="video-wrapper">
                                            <div ref={heroVideoRef} style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative' }}>
                                                <div
                                                    ref={heroVideoRef}
                                                    style={{
                                                        width: '100%',
                                                        height: '100vh',
                                                        overflow: 'hidden',
                                                        position: 'relative',
                                                        backgroundColor: '#000' // fallback while video loads
                                                    }}
                                                >
                                                    <iframe
                                                        width="100%"
                                                        height="100%"
                                                        src="https://www.youtube.com/embed/ZK-rNEhJIDs?autoplay=1&mute=1&loop=1&playlist=ZK-rNEhJIDs&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1"
                                                        title="YouTube video player"
                                                        frameBorder="0"
                                                        allow="autoplay; encrypted-media; picture-in-picture"
                                                        allowFullScreen
                                                        style={{
                                                            pointerEvents: 'none',
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            width: '100vw',
                                                            height: '56.25vw', // 16:9 aspect ratio
                                                            minHeight: '100vh',
                                                            minWidth: '177.77vh', // 16:9 aspect ratio
                                                            objectFit: 'cover'
                                                        }}
                                                    ></iframe>

                                                    {/* Optional: overlay to ensure logo is hidden on all devices */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        right: 0,
                                                        width: '100px',
                                                        height: '60px',
                                                        background: 'transparent',
                                                        pointerEvents: 'none',
                                                        zIndex: 1
                                                    }}></div>
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="quanto-about-section section-padding-top overflow-hidden " style={{ paddingTop: "30px" }}>

                        <div className="container custom-container" >
                            <div className="row " style={{ marginBottom: "50px" }}>
                                <div className="col-12 col-lg-9 col-xl-7 col-xxl-6">
                                    <div className="quanto__header fade-anim" data-delay="0.30" data-direction="left">
                                        <h3 className="title word-anim" data-delay="0.45">About Us</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-end">
                                <div
                                    className='col-lg-5'
                                    data-aos='fade-left'
                                    data-aos-delay='300'
                                    data-aos-duration='1000'
                                >
                                    <img
                                        className='img-fluid'
                                        style={{ width: "100%", height: "auto" }}
                                        src={construction}
                                        alt="Construction"
                                    />
                                </div>

                                <div className="col-lg-7 ">
                                    <div className="quanto-about__content">
                                        <h4 className="move-anim text_invert" data-delay="0.45">
                                            Our digital strategies and design expertise focus on promoting social economy businesses, cutting-edge brands, and eco-friendly products to motivate consumers to make informed decisions towards sustainable products and services
                                        </h4>
                                        <div className="about-info row-margin-top move-anim" data-delay="0.60">
                                            <p>
                                                Whether it's crafting a visually stunning brand identity, designing immersive digital experiences, or developing strategic marketing campaigns, we approach each project with meticulous attention to detail and an unwavering dedication to quality.
                                            </p>
                                            <Link to="/about" className="quanto-link-btn section-link">
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
            .quanto-project-section{
            min-height: 500px !important;
            max-height: 100% !important;

            }


    `}
                    </style>

                    <section className="quanto-project-section bg-color-primary section-padding-top-bottom overflow-hidden position-relative" ref={horizontalScrollRef}>


                        {/* Sacred Geometry Animation */}
                        <div className="sacred-geometry">
                            <div className="rotating-square"></div>
                            <div className="rotating-square"></div>
                            <div className="rotating-square"></div>
                        </div>

                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12 col-lg-9 col-xl-7 col-xxl-6">
                                    <div className="quanto__header fade-anim" data-delay="0.30" data-direction="left">
                                        <h3 className="title word-anim text-white" data-delay="0.45">Our Projects</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-0 gy-4 gy-md-0 justify-content-between">
                                <div className="col-12 col-md-5 order-1 order-md-0">
                                    <div className="row g-0">
                                        {[
                                            { title: 'Kinetic Sandscapes', category: 'Branding', img: working1 },
                                            { title: 'Brooklyn Brewery', category: 'Photography', img: working2 },
                                            { title: 'Regenerative Farming', category: 'Branding', img: working3 },
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
                                            { title: 'Hopscotch Payments', category: 'Development', img: working4, className: 'col-md-10 ms-auto project-row-gap' },
                                            { title: 'Stories Worthwhile', category: 'UI/UX Design', img: working5, className: 'col-md-9 me-auto project-row-gap' },
                                            { title: 'Fintech Accelerator', category: 'UI/UX Design', img: working6, className: 'col-md-10 ms-auto' },
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

                    <section className="quanto-service-section section-padding-top-bottom overflow-hidden position-relative">

                        <style>
                            {`
          .vastu-background {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            overflow: hidden;
            z-index: 0;
            pointer-events: none;
          }

          .vastu-mandala {
            position: absolute;
            width: 600px;
            height: 600px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.08;
          }

          .vastu-square {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 3px solid red;
            animation: rotateClockwise 40s linear infinite;
            transform-origin: center center;
          }

          .vastu-square-outer {
            position: absolute;
            width: 120%;
            height: 120%;
            top: -10%;
            left: -10%;
            border: 2px solid red;
            animation: rotateCounterClockwise 50s linear infinite;
            transform-origin: center center;
          }

          .vastu-diamond {
            position: absolute;
            width: 80%;
            height: 80%;
            top: 10%;
            left: 10%;
            border: 2px solid red;
            transform: rotate(45deg);
            animation: pulse 8s ease-in-out infinite;
            transform-origin: center center;
          }

          .vastu-circle {
            position: absolute;
            width: 60%;
            height: 60%;
            top: 20%;
            left: 20%;
            border: 2px solid red;
            border-radius: 50%;
            animation: breathe 6s ease-in-out infinite;
          }

          .vastu-point {
            position: absolute;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, red, transparent);
            border-radius: 50%;
            animation: energyPulse 3s ease-in-out infinite;
          }

          .vastu-point:nth-child(1) {
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            animation-delay: 0s;
          }

          .vastu-point:nth-child(2) {
            top: 15%;
            right: 15%;
            animation-delay: 0.5s;
          }

          .vastu-point:nth-child(3) {
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            animation-delay: 1s;
          }

          .vastu-point:nth-child(4) {
            bottom: 15%;
            right: 15%;
            animation-delay: 1.5s;
          }

          .vastu-point:nth-child(5) {
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            animation-delay: 2s;
          }

          .vastu-point:nth-child(6) {
            bottom: 15%;
            left: 15%;
            animation-delay: 2.5s;
          }

          .vastu-point:nth-child(7) {
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            animation-delay: 3s;
          }

          .vastu-point:nth-child(8) {
            top: 15%;
            left: 15%;
            animation-delay: 3.5s;
          }

          @keyframes rotateClockwise {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }

          @keyframes rotateCounterClockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }

          @keyframes pulse {
            0%, 100% {
              transform: rotate(45deg) scale(1);
              opacity: 0.25;
            }
            50% {
              transform: rotate(45deg) scale(1.1);
              opacity: 0.4;
            }
          }

          @keyframes breathe {
            0%, 100% {
              transform: scale(1);
              opacity: 0.2;
            }
            50% {
              transform: scale(1.15);
              opacity: 0.35;
            }
          }

          @keyframes energyPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.4;
            }
            50% {
              transform: scale(2);
              opacity: 0;
            }
          }

          .vastu-grid {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0.05;
          }

          .grid-line-h {
            position: absolute;
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(99, 51, 78, 0.3), transparent);
            left: 0;
          }

          .grid-line-v {
            position: absolute;
            height: 100%;
            width: 1px;
            background: linear-gradient(180deg, transparent, rgba(99, 51, 78, 0.3), transparent);
            top: 0;
          }

          .grid-line-h:nth-child(1) { top: 25%; }
          .grid-line-h:nth-child(2) { top: 50%; }
          .grid-line-h:nth-child(3) { top: 75%; }
          .grid-line-v:nth-child(4) { left: 25%; }
          .grid-line-v:nth-child(5) { left: 50%; }
          .grid-line-v:nth-child(6) { left: 75%; }

          @media (max-width: 768px) {
            .vastu-mandala {
              width: 400px;
              height: 400px;
              opacity: 0.06;
            }
            
            .vastu-point {
              width: 6px;
              height: 6px;
            }
          }

          @media (max-width: 480px) {
            .vastu-mandala {
              width: 300px;
              height: 300px;
              opacity: 0.05;
            }
          }

          .container.custom-container {
            position: relative;
            z-index: 1;
          }

          /* Swiper styles */
          .swiper {
            width: 100%;
            padding: 20px 0;
          }

          .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .swiper-button-next,
          .swiper-button-prev {
            color: #63334E;
            background: rgba(255, 255, 255, 0.8);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            transition: background 0.3s;
          }

          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background: rgba(255, 255, 255, 1);
          }

          .swiper-pagination-bullet {
            background: #63334E;
            opacity: 0.5;
          }

          .swiper-pagination-bullet-active {
            opacity: 1;
          }
        `}
                        </style>

                        {/* Vastu-inspired background animation */}
                        <div className="vastu-background">
                            <div className="vastu-grid">
                                <div className="grid-line-h"></div>
                                <div className="grid-line-h"></div>
                                <div className="grid-line-h"></div>
                                <div className="grid-line-v"></div>
                                <div className="grid-line-v"></div>
                                <div className="grid-line-v"></div>
                            </div>
                            <div className="vastu-mandala">
                                <div className="vastu-square-outer"></div>
                                <div className="vastu-square"></div>
                                <div className="vastu-diamond"></div>
                                <div className="vastu-circle"></div>
                                <div className="vastu-point"></div>
                                <div className="vastu-point"></div>
                                <div className="vastu-point"></div>
                                <div className="vastu-point"></div>
                                <div className="vastu-point"></div>
                                <div className="vastu-point"></div>
                                <div className="vastu-point"></div>
                                <div className="vastu-point"></div>
                            </div>
                        </div>

                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12 col-lg-9 col-xl-7 col-xxl-6">
                                    <div className="quanto__header fade-anim" data-delay="0.30" data-direction="left">
                                        <h3 className="title word-anim" data-delay="0.45">Our Services</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="swipers row-padding-top">
                                <div className="swiper-wrapper " >
                                    {
                                        [
                                            { title: 'Architectural Planning', icon: service1 },
                                            { title: 'Plotted Development', icon: service2 },
                                            { title: 'Interior Designing', icon: service3 },
                                            { title: 'Digital Marketing', icon: service4 },
                                        ].map((service, index) => (
                                            <div className="swiper-slide service-wrapper" key={index} style={{
                                                borderColor: " #FF69B4"
                                            }}>
                                                <div className="quanto-service-box move-anim">
                                                    <div className="quanto-iconbox-icon">
                                                        <img src={service.icon} alt={`${service.title} icon`} style={{ height: "200px" }} loading="lazy" />
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
                                        ))
                                    }
                                </div>
                                <div className="swiper-pagination"></div>
                            </div>
                        </div>
                    </section>


                    <section className="quanto-testimonial-section section-padding-top overflow-hidden" style={{ paddingTop: "0px" }}>
                        <div className="container custom-container" >
                            <div className="row" style={{ marginBottom: "50px" }}>
                                <div className="col-12">
                                    <div className="quanto_header " >
                                        <h3 className="title fade-anim" data_delay="0.30" data-direction="right" style={{ color: " #63334E !important" }} data-delay="0.30">
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
                                                            backgroundImage: `url(${bgImage})`
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
                                            <p className="title mx-auto mx-md-0 word-anim " style={{ color: "#63334E ", fontWeight: "bolder", fontSize: "30px" }} data-delay="0.30" data-direction="left">
                                                We worked with largest global brands
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 ps-md-0">
                                        <div className="quanto__header logo">
                                            {['Logo1', 'Logo2'].map((logo, index) => (
                                                <div key={index} className="client-box fade-anim client-box-hover" data-delay={0.30 + index * 0.15} data-direction="right">
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
                                                <img src={client} alt="Client logo" loading="lazy" />
                                            </div>
                                        ))}
                                        {['Logo3', 'Logo4', 'Logo5', 'Logo6', 'Logo7', 'Logo8', 'Logo9', 'Logo10'].map((logo, index) => (
                                            <div key={index} className="client-box fade-anim client-box-hover" data-delay={0.30 + index * 0.15} data-direction="right">
                                                <img src={client} alt="Client logo" loading="lazy" />
                                            </div>
                                        ))}
                                        <div className="client-box d-none d-sm-block d-md-none d-lg-block border-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vastu-inspired Animated Background */}
                        <div className="vastu-bg-animation">
                            <div className="mandala-pattern"></div>
                            <div className="geometric-shapes">
                                <div className="shape shape-1"></div>
                                <div className="shape shape-2"></div>
                                <div className="shape shape-3"></div>
                                <div className="shape shape-4"></div>
                            </div>
                            <div className="compass-lines"></div>
                        </div>

                        <style jsx>{`
        .clients-area {
            position: relative;
            background: linear-gradient(135deg, #faf8f9 0%, #ffffff 100%);
        }

        .clients__wrapper {
            position: relative;
            z-index: 2;
        }

        .vastu-bg-animation {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            overflow: hidden;
            pointer-events: none;
            opacity: 0.12;
        }

        /* Mandala Pattern - Sacred Geometry */
        .mandala-pattern {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 600px;
            height: 600px;
            transform: translate(-50%, -50%);
            background-image: 
                radial-gradient(circle, transparent 40%, #63334E 40%, #63334E 41%, transparent 41%),
                radial-gradient(circle, transparent 60%, #63334E 60%, #63334E 61%, transparent 61%),
                radial-gradient(circle, transparent 80%, #63334E 80%, #63334E 81%, transparent 81%);
            animation: mandalaRotate 60s linear infinite;
        }

        /* Geometric Shapes - Vastu Directional Elements */
        .geometric-shapes {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        .shape {
            position: absolute;
            border: 2px solid #63334E;
            opacity: 0.4;
        }

        /* North-East (Ishanya) - Triangle */
        .shape-1 {
            top: 10%;
            right: 15%;
            width: 0;
            height: 0;
            border-left: 40px solid transparent;
            border-right: 40px solid transparent;
            border-bottom: 70px solid #63334E;
            border-top: none;
            animation: floatUpDown 8s ease-in-out infinite;
        }

        /* South-East (Agneya) - Square */
        .shape-2 {
            bottom: 15%;
            right: 20%;
            width: 60px;
            height: 60px;
            border: 2px solid #63334E;
            animation: rotateSquare 12s linear infinite;
        }

        /* South-West (Nairutya) - Circle */
        .shape-3 {
            bottom: 20%;
            left: 15%;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 2px solid #63334E;
            animation: pulse 6s ease-in-out infinite;
        }

        /* North-West (Vayavya) - Diamond */
        .shape-4 {
            top: 15%;
            left: 20%;
            width: 50px;
            height: 50px;
            border: 2px solid #63334E;
            transform: rotate(45deg);
            animation: floatLeftRight 10s ease-in-out infinite;
        }

        /* Compass Lines - Directional Energy */
        .compass-lines {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 80%;
            height: 80%;
            transform: translate(-50%, -50%);
        }

        .compass-lines::before,
        .compass-lines::after {
            content: '';
            position: absolute;
            background: linear-gradient(90deg, transparent 0%, #63334E 50%, transparent 100%);
            opacity: 0.3;
        }

        /* Horizontal axis (East-West) */
        .compass-lines::before {
            width: 100%;
            height: 1px;
            top: 50%;
            left: 0;
            animation: pulseHorizontal 8s ease-in-out infinite;
        }

        /* Vertical axis (North-South) */
        .compass-lines::after {
            width: 1px;
            height: 100%;
            top: 0;
            left: 50%;
            animation: pulseVertical 8s ease-in-out infinite 2s;
        }

        @keyframes mandalaRotate {
            0% {
                transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }

        @keyframes floatUpDown {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-20px);
            }
        }

        @keyframes floatLeftRight {
            0%, 100% {
                transform: rotate(45deg) translateX(0);
            }
            50% {
                transform: rotate(45deg) translateX(15px);
            }
        }

        @keyframes rotateSquare {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                opacity: 0.4;
            }
            50% {
                transform: scale(1.15);
                opacity: 0.6;
            }
        }

        @keyframes pulseHorizontal {
            0%, 100% {
                opacity: 0.2;
                width: 80%;
            }
            50% {
                opacity: 0.5;
                width: 100%;
            }
        }

        @keyframes pulseVertical {
            0%, 100% {
                opacity: 0.2;
                height: 80%;
            }
            50% {
                opacity: 0.5;
                height: 100%;
            }
        }

        .client-box-hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
            background: white;
        }

        .client-box-hover:hover {
            transform: translateY(-10px) scale(1.05);
            box-shadow: 0 10px 25px rgba(99, 51, 78, 0.15);
        }

        .client-box-hover img {
            transition: opacity 0.3s ease, filter 0.3s ease;
        }

        .client-box-hover:hover img {
            opacity: 0.9;
            filter: brightness(1.1);
        }

        @media (max-width: 768px) {
            .mandala-pattern {
                width: 300px;
                height: 300px;
            }
            
            .shape {
                transform: scale(0.7);
            }
            
            .vastu-bg-animation {
                opacity: 0.08;
            }
        }
    `}</style>
                    </div>



                    <section className="quanto-pricing-section section-padding-top-bottom overflow-hidden" style={{ paddingBottom: "0px" }}>
                        <div className="container custom-container">
                            <div className="row " style={{ paddingBottom: "50px" }}>
                                <div className="col-12">
                                    <div className="quanto__header ">
                                        <h3 className="title word-anim " data-delay="0.30" >Our Packages</h3>
                                    </div>
                                </div>
                            </div>
                            <style>
                                {`
                                .color-1 {
                                background: #F9F7F7;
                                }
                                    .color-1:hover {
                                    transform: translateY(-10px);
                                border-color: #FF69B4;
                                box-shadow: 0 15px 40px rgba(255, 105, 180, 0.3);
                }
                                .color-1{
                                    position: relative;
                                overflow: hidden;
                                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                                border: 2px solid transparent;
                }

                                .color-1::before {
                                    content: '';
                                position: absolute;
                                top: 0;
                                left: -100%;
                                width: 100%;
                                height: 100%;
                                background: linear-gradient(120deg, transparent, rgba(255, 105, 180, 0.15), transparent);
                                transition: left 0.6s ease;
                }
                                .color-1:hover h4 {
                                    color: white;
                }
                                       .color-1:hover p{
                                    color: white;
                }
                  
                  
                               ` }
                            </style>
                            <div className="row g-4">
                                {[
                                    {
                                        image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=400&h=300&fit=crop',
                                        title: 'Basic Plan',
                                        description: 'Perfect for individuals and small teams getting started with essential features.',
                                    },
                                    {
                                        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
                                        title: 'Standard Plan',
                                        description: 'Ideal for growing businesses that need more power and dedicated support.',
                                    },
                                    {
                                        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
                                        title: 'Premium Plan',
                                        description: 'Complete solution for enterprises requiring full access and round-the-clock assistance.',
                                    },
                                ].map((plan, index) => (
                                    <div key={index} className="col-md-4 ">
                                        <div className="quanto-pricing-box fade-anim color-1" style={{
                                            border: "2px solid #FF69B4"
                                        }} data-delay={0.30 + index * 0.15}>
                                            <img src={plan.image} alt={plan.title} style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '20px', borderRadius: '8px' }} />
                                            <h4 style={{ fontSize: "30px" }}>{plan.title}</h4>
                                            <p style={{ fontSize: '14px', marginBottom: '15px' }}>{plan.description}</p>
                                            <button style={{ background: "#FF69B4", borderRadius: "10px", padding: "10px 20px", color: "white", border: "1px solid white" }}>View More</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

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
                                        <Link to="/blog-grid" className="quanto-link-btn section-link view-more-btn">
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
                                        img: service1,
                                        date: 'March 8, 2024',
                                    },
                                    {
                                        title: 'Quanto agency revolutionizes work with the power of ai-driven',
                                        img: service2,
                                        date: 'March 8, 2024',
                                    },
                                    {
                                        title: 'How young leaders can take charge of their professional growth',
                                        img: service3,
                                        date: 'March 8, 2024',
                                    },
                                ].map((blog, index) => (
                                    <div key={index} className="col-md-6 col-lg-4">
                                        <div
                                            className="quanto-blog-box fade-anim service-wrapper"
                                            style={{ background: '#F9F7F7' }}
                                            data-delay={0.30 + index * 0.15}
                                            data-direction="right"
                                        >
                                            <div className="quanto-blog-thumb">
                                                <Link to="/blog-details" className="section-link">
                                                    <img
                                                        src={blog.img}
                                                        style={{ height: '200px' }}
                                                        alt="Blog thumbnail"
                                                        loading="lazy"
                                                        className="quanto-iconbox-icon"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="quanto-blog-content">
                                                <h5 className="line-clamp-2 p-3">
                                                    <Link to="/blog-details">{blog.title}</Link>
                                                </h5>
                                                <span className="quanto-blog-date mb-3">{blog.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <style>{`
    .service-wrapper {
      position: relative;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease;
      border: 2px solid #FF69B4;
      border-radius: 8px;
    }

    .service-wrapper::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, transparent, rgba(255, 105, 180, 0.15), transparent);
      transition: left 0.6s ease;
    }

    .service-wrapper:hover::before {
      left: 100%;
    }

    .service-wrapper:hover {
      transform: translateY(-10px);
      border-color: #FF69B4;
      box-shadow: 0 15px 40px rgba(255, 105, 180, 0.3);
      animation: pulse 2s infinite;
    }

    .service-wrapper:active {
      transform: scale(1.05);
      transition: transform 0.2s ease;
    }

    .quanto-iconbox-icon {
      transition: all 0.4s ease;
    }

    .service-wrapper:hover .quanto-iconbox-icon {
      transform: scale(1.1) rotate(5deg);
      filter: drop-shadow(0 5px 15px rgba(255, 105, 180, 0.4));
    }

    .service-wrapper:hover .quanto-iconbox-icon img {
      animation: iconBounce 0.6s ease;
    }

    @keyframes iconBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .service-wrapper h5 {
      transition: color 0.3s ease;
    }

    .service-wrapper:hover h5 {
      color: #FF69B4;
    }

    .service-wrapper .quanto-blog-date {
      transition: color 0.3s ease;
    }

    .service-wrapper:hover .quanto-blog-date {
      color: #666;
    }

    .view-more-btn {
      background:#63334E !important;
      border: 2px solid #FF69B4;
      color: white;
      padding: 15px 35px;
      cursor: pointer;
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
      border-radius: 50px;
      text-decoration: none;
    }

    .view-more-btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      transition: width 0.6s ease, height 0.6s ease;
    }

    .view-more-btn:hover::before {
      width: 300px;
      height: 300px;
    }

    .view-more-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 30px rgba(255, 105, 180, 0.4);
      border-color: white;
    }

    .view-more-btn span {
      position: relative;
      z-index: 1;
      display: inline-block;
      transition: transform 0.3s ease;
    }

    .view-more-btn:hover span {
      transform: translateY(-3px);
    }

    .view-more-btn .arry1 {
      transition: all 0.3s ease;
    }

    .view-more-btn .arry2 {
      position: absolute;
      left: 0;
      opacity: 0;
      transition: all 0.3s ease;
    }

    .view-more-btn:hover .arry1 {
      opacity: 0;
      transform: translateX(10px);
    }

    .view-more-btn:hover .arry2 {
      opacity: 1;
      transform: translateX(5px);
    }

    @keyframes pulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(255, 105, 180, 0.7);
      }
      50% {
        box-shadow: 0 0 0 10px rgba(255, 105, 180, 0);
      }
    }
  `}</style>
                    </section>

                    {/* <section className="quanto-process-section section-padding-top-bottom overflow-hidden">
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
                    </section> */}

                    {/* <section className="quanto-team-section section-padding-top-bottom overflow-hidden">
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
                    </section> */}
                </div >
            </div >
        </>
    );
};

export default Index;