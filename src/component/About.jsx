import React, { useEffect, useRef } from 'react';
import logo3 from "../assets/images/clients/logo-3.png";
import logo4 from "../assets/images/clients/logo-4.png";
import logo5 from "../assets/images/clients/logo-5.png";
import logo6 from "../assets/images/clients/logo-6.png";
import logo7 from "../assets/images/clients/logo-7.png";
import logo8 from "../assets/images/clients/logo-8.png"; // Fixed duplicate import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'odometer/themes/odometer-theme-default.css';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { Swiper } from 'swiper';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import Odometer from 'odometer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
// Register Swiper modules
Swiper.use([Navigation, Autoplay, EffectFade]);

const About = () => {
    const swiperInstances = useRef([]);
    const smootherRef = useRef(null);
    const gsapContext = useRef(null);

    useEffect(() => {
        // GSAP Context for cleanup
        gsapContext.current = gsap.context(() => {
            // Preloader
            $(".preloader").delay(800).fadeOut("slow");

            // Sticky Menu
            const handleScroll = () => {
                const scroll = window.scrollY;
                if (scroll > 50) {
                    $("#sticky-menu").addClass("sticky-menu");
                    $(".quanto-menu-area").addClass("sticky");
                } else {
                    $("#sticky-menu").removeClass("sticky-menu");
                    $(".quanto-menu-area").removeClass("sticky");
                }
            };
            window.addEventListener("scroll", handleScroll);

            // Set Background Image
            $("[data-bg-src]").each(function () {
                const src = $(this).attr("data-bg-src");
                $(this).css("background-image", `url(${src})`).addClass("background-image").removeAttr("data-bg-src");
            });

            // Custom Cursor
            const cursor = document.querySelector(".cursor");
            if (cursor) {
                const editCursor = (e) => {
                    cursor.style.left = `${e.clientX}px`;
                    cursor.style.top = `${e.clientY}px`;
                };
                window.addEventListener("mousemove", editCursor);
                document.querySelectorAll("a, .cursor-pointer").forEach((item) => {
                    item.addEventListener("mouseover", () => cursor.classList.add("cursor-active"));
                    item.addEventListener("mouseout", () => cursor.classList.remove("cursor-active"));
                });
            }

            // Odometer Counter
            document.querySelectorAll(".counter-item .odometer").forEach((el) => {
                const odometer = new Odometer({
                    el: el,
                    value: 0,
                    format: '(,ddd)',
                    duration: 2000,
                });
                const finalValue = el.getAttribute("data-odometer-final");
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            odometer.update(finalValue);
                            observer.disconnect();
                        }
                    },
                    { threshold: 0.1 }
                );
                observer.observe(el);
            });

            // Swiper Sliders
            const initializeSwiper = (selector, config) => {
                const element = document.querySelector(selector);
                if (element) {
                    const swiper = new Swiper(element, config);
                    swiperInstances.current.push(swiper);
                    return swiper;
                }
                return null;
            };

            // Testimonial Content Slider
            const thumbSlider = initializeSwiper(".quanto-testimonial__thumb-slider", {
                effect: "fade",
                fadeEffect: { crossFade: true },
                loop: true,
                allowTouchMove: false,
            });

            initializeSwiper(".quanto-testimonial__content-slider", {
                spaceBetween: 24,
                slidesPerView: 1,
                loop: true,
                speed: 800,
                navigation: {
                    nextEl: ".quanto-testimonial__next",
                    prevEl: ".quanto-testimonial__prev",
                },
                thumbs: thumbSlider ? { swiper: thumbSlider } : undefined,
                allowTouchMove: thumbSlider ? false : true,
            });

            // Project Slider
            initializeSwiper(".quanto-project__slider", {
                slidesPerView: 1,
                loop: true,
                spaceBetween: 15,
                navigation: {
                    nextEl: ".quanto-project__slider-navigation .next-btn",
                    prevEl: ".quanto-project__slider-navigation .prev-btn",
                },
                breakpoints: {
                    576: { spaceBetween: 20, slidesPerView: 1.3 },
                    768: { spaceBetween: 25, slidesPerView: 1.5 },
                    992: { spaceBetween: 30, slidesPerView: 2 },
                    1200: { spaceBetween: 40, slidesPerView: 2.3 },
                },
            });

            // Testimonial2 Slider
            initializeSwiper(".quanto-testimonial2__slider", {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 10,
                autoplay: { delay: 3000, disableOnInteraction: false },
                breakpoints: {
                    768: { slidesPerView: 2, spaceBetween: 25 },
                    1200: { spaceBetween: 30, slidesPerView: 2 },
                    1400: { spaceBetween: 40, slidesPerView: 2.5 },
                },
            });

            // Testimonial3 Slider
            initializeSwiper(".testimonial3-slider", {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                navigation: {
                    nextEl: ".testimonial3-navigation .next-btn",
                    prevEl: ".testimonial3-navigation .prev-btn",
                },
                autoplay: { delay: 5000, disableOnInteraction: false },
            });

            // Marquee
            $(".marquee").each(function () {
                const $marquee = $(this);
                const $itemContainer = $marquee.find(".marquee-item-container");
                const elements = $itemContainer.find(".marquee-item").length;
                const repeatCount = elements < 5 ? 5 : elements;
                for (let i = 0; i < repeatCount; i++) {
                    $itemContainer.clone().appendTo($marquee);
                }
            });

            // Smooth Scrolling
            if (window.innerWidth > 767 && document.querySelector("#has_smooth")) {
                smootherRef.current = ScrollSmoother.create({
                    smooth: 0.9,
                    effects: window.innerWidth < 1500 ? false : true,
                    smoothTouch: 0.1,
                    normalizeScroll: { allowNestedScroll: true },
                    ignoreMobileResize: true,
                });
            }

            // Hover Overlay Animations
            document.querySelectorAll(".quanto-pricing-box, .process-box").forEach((box) => {
                const overlay = document.createElement("div");
                overlay.className = "hover-overlay";
                box.insertBefore(overlay, box.firstChild);
                gsap.set(overlay, { autoAlpha: 0, x: 0, y: 0 });

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
                    if (degrees >= -45 && degrees <= 45) return "right";
                    if (degrees > 45 && degrees <= 135) return "bottom";
                    if (degrees > 135 || degrees <= -135) return "left";
                    return "top";
                };

                box.addEventListener("mouseenter", (e) => {
                    const direction = getDirection(box, e);
                    const animProps = {
                        autoAlpha: 1,
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                    };
                    const distance = 100;
                    if (direction === "right") animProps.startX = `${distance}%`;
                    if (direction === "left") animProps.startX = `-${distance}%`;
                    if (direction === "bottom") animProps.startY = `${distance}%`;
                    if (direction === "top") animProps.startY = `-${distance}%`;
                    gsap.fromTo(overlay, { autoAlpha: 0, x: animProps.startX || 0, y: animProps.startY || 0 }, animProps);
                });

                box.addEventListener("mouseleave", (e) => {
                    const direction = getDirection(box, e);
                    const animProps = {
                        autoAlpha: 0,
                        duration: 0.5,
                        ease: "power2.in",
                    };
                    const distance = 100;
                    if (direction === "right") animProps.x = `${distance}%`;
                    if (direction === "left") animProps.x = `-${distance}%`;
                    if (direction === "bottom") animProps.y = `${distance}%`;
                    if (direction === "top") animProps.y = `-${distance}%`;
                    gsap.to(overlay, animProps);
                });
            });

            // Video Control
            const video = document.getElementById("quanto-video-2");
            const playBtn = document.querySelector(".play-btn");
            if (video && playBtn) {
                video.pause();
                playBtn.addEventListener("click", () => {
                    video.play();
                    playBtn.classList.add("disabled");
                    video.classList.add("pointer");
                });
                video.addEventListener("click", () => {
                    if (playBtn.classList.contains("disabled")) {
                        video.pause();
                        playBtn.classList.remove("disabled");
                        video.classList.remove("pointer");
                    }
                });
            }

            // Horizontal Scroll
            if (window.innerWidth > 1199) {
                const horizontalSection = document.querySelector(".horizontal-scroll");
                if (horizontalSection) {
                    gsap.to(horizontalSection, {
                        x: () => horizontalSection.scrollWidth * -1,
                        xPercent: 100,
                        scrollTrigger: {
                            trigger: horizontalSection,
                            start: "center center",
                            end: "+=3000px",
                            pin: true,
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    });
                }
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
            document.querySelectorAll(".fade-anim").forEach((item) => {
                const fade_direction = item.getAttribute("data-direction") || "bottom";
                const onscroll_value = item.getAttribute("data-on-scroll") || 1;
                const duration_value = parseFloat(item.getAttribute("data-duration") || 1.15);
                const fade_offset = parseFloat(item.getAttribute("data-offset") || 50);
                const delay_value = parseFloat(item.getAttribute("data-delay") || 0.15);
                const ease_value = item.getAttribute("data-ease") || "power2.out";
                const animation_settings = {
                    opacity: 0,
                    ease: ease_value,
                    duration: duration_value,
                    delay: delay_value,
                };
                if (fade_direction === "top") animation_settings.y = -fade_offset;
                if (fade_direction === "left") animation_settings.x = -fade_offset;
                if (fade_direction === "bottom") animation_settings.y = fade_offset;
                if (fade_direction === "right") animation_settings.x = fade_offset;
                if (onscroll_value == 1) {
                    animation_settings.scrollTrigger = {
                        trigger: item,
                        start: "top 85%",
                    };
                }
                gsap.from(item, animation_settings);
            });

            // Word Animation
            document.querySelectorAll(".word-anim").forEach((word_anim_item) => {
                const stagger_value = parseFloat(word_anim_item.getAttribute("data-stagger") || 0.04);
                const translateX_value = word_anim_item.getAttribute("data-translateX") || false;
                const translateY_value = word_anim_item.getAttribute("data-translateY") || false;
                const onscroll_value = word_anim_item.getAttribute("data-on-scroll") || 1;
                const data_delay = parseFloat(word_anim_item.getAttribute("data-delay") || 0.1);
                const data_duration = parseFloat(word_anim_item.getAttribute("data-duration") || 0.75);
                const split_word = new SplitText(word_anim_item, { type: "chars, words" });
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
                        start: "top 90%",
                    };
                }
                gsap.from(split_word.words, animation_settings);
            });

            // Hero Video Animation
            if (window.innerWidth >= 768) {
                const heroThumb = document.querySelector(".quanto-hero__thumb");
                if (heroThumb) {
                    const videoWrapper = heroThumb.querySelector(".video-wrapper");
                    if (videoWrapper) {
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: heroThumb,
                                start: "top 70",
                                pin: true,
                                scrub: 1,
                                pinSpacing: true,
                                end: "bottom top",
                            },
                        }).to(videoWrapper, {
                            width: "100%",
                            duration: 1.5,
                            ease: "power2.inOut",
                        });
                    }
                }
            }

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

            // Service Section Pinning
            if (window.innerWidth >= 1200 && document.querySelector(".quanto-service2-section")) {
                ScrollTrigger.create({
                    trigger: ".quanto-service2-section",
                    start: "top -1%",
                    end: "bottom 110.5%",
                    pin: ".quanto-service2-section .quanto__header",
                    pinSpacing: true,
                });
            }

            // Blog Social Links
            gsap.to(".social-links-scroll", {
                scrollTrigger: {
                    trigger: ".blog-item-details .social-links",
                    start: "top-=120 top",
                    end: "80% top",
                    pin: true,
                    pinSpacing: false,
                    scrub: true,
                },
            });

            // Section Jump
            document.querySelectorAll(".section-link").forEach((link) => {
                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    const targetID = link.getAttribute("href");
                    if (targetID === "#header") {
                        gsap.to(window, { duration: 1.5, scrollTo: { y: 0 }, ease: "power2.inOut" });
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

            // Team Animations
            if (window.innerWidth >= 992) {
                document.querySelectorAll(".gsap-sticky").forEach((element) => {
                    ScrollTrigger.create({
                        trigger: element,
                        start: "top 80px",
                        end: "110% bottom",
                        pin: element,
                        pinSpacing: false,
                    });
                });
            }

            // Hero Background Animation
            if (document.querySelector('.hero5-bg')) {
                gsap.set('.hero5-bg', { top: '-300px', scale: 0.5 });
                gsap.to('.hero5-bg', {
                    duration: 2,
                    top: '0px',
                    scale: 1,
                    ease: 'power2.out',
                    delay: 0.6,
                });
            }
        });

        // Cleanup
        return () => {
            swiperInstances.current.forEach((swiper) => swiper.destroy(true, true));
            if (smootherRef.current) smootherRef.current.kill();
            gsapContext.current.revert();
            window.removeEventListener("scroll", () => { });
            window.removeEventListener("mousemove", () => { });
            document.querySelectorAll("a, .cursor-pointer").forEach((item) => {
                item.removeEventListener("mouseover", () => { });
                item.removeEventListener("mouseout", () => { });
            });
            document.querySelectorAll(".section-link").forEach((link) => {
                link.removeEventListener("click", () => { });
            });
            console.log("Cleaned up animations and event listeners");
        };
    }, []);

    return (
        <>
            <div className="cursor d-none d-lg-block"></div>
            <a href="#" id="scroll-top" className="back-to-top-btn">
                <i className="fa-solid fa-arrow-up"></i>
            </a>
            <div>
                <div id="smooth-content">
                    <section className="quanto-hero-about-section overflow-hidden">
                        <div className="container custom-container">
                            <div className="row g-4 align-items-end">
                                <div className="col-lg-9 col-xxl-10">
                                    <div className="quanto-hero-about__content move-anim" data-delay="0.45">
                                        <h1 className="title">
                                            California-based team driving creative branding solutions
                                        </h1>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xxl-2">
                                    <div className="quanto-hero-about__info fade-anim" data-delay="0.60">
                                        <h4 className="rating-point">4.8</h4>
                                        <div className="stars">
                                            <ul className="custom-ul">
                                                {[...Array(5)].map((_, index) => (
                                                    <li key={index}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M14.8328 9.16783L12 0L9.16718 9.16783H0L7.41641 14.8339L4.58359 24.0017L12 18.3357L19.4164 24.0017L16.9734 16.0956L12.6545 17.7925L16.5841 14.8355L16.5836 14.8339L24 9.16783H14.8328Z"
                                                                fill="#0F0F0F"
                                                            />
                                                        </svg>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <p className="word-anim" data-delay="0.60">
                                            2500+ reviews based on client feedback
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="quanto-video-area style-2 overflow-hidden">
                        <div className="container custom-container position-relative">
                            <a href="#quanto-funfacts-section" className="scroll-down section-link">
                                Scroll down
                                <img src="./assets/images/icons/scroll-down.svg" alt="Scroll down" loading="lazy" />
                            </a>
                            <div className="row">
                                <div className="col-12">
                                    <video
                                        muted
                                        autoPlay
                                        loop
                                        playsInline
                                        src="https://res.cloudinary.com/ducryslbe/video/upload/v1740329511/Quanto/video.sakebul.com.mp4"
                                        className="quanto-video"
                                        id="quanto-video-2"
                                        data-speed="0.8"
                                        onError={(e) => console.error("Video failed to load", e)}
                                    />
                                    <button className="play-btn">Play</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section id="quanto-funfacts-section" className="quanto-funfacts-section section-padding-top overflow-hidden">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto-funfacts__wrapper">
                                        {[
                                            { value: 17, text: "Years of agency experience", unit: "+" },
                                            { value: 220, text: "Successfully projects done", unit: "+" },
                                            { value: 46, text: "World-wide team members", unit: "+" },
                                            { value: 98, text: "Clients satisfied & retention", unit: "%" },
                                        ].map((fact, index) => (
                                            <div key={index} className="quanto-funfact-box fade-anim" data-delay="0.30" data-direction="right">
                                                <h2 className="counter-item d-inline-flex align-items-center">
                                                    <span className="odometer d-inline-block" data-odometer-final={fact.value}>0</span>
                                                    <em>{fact.unit}</em>
                                                </h2>
                                                <span className="funfact-info">{fact.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="quanto-about-area2 bg-color-white section-padding-top">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-xl-9 col-xxl-8 mx-auto">
                                    <div className="quanto__header text-center text-lg-start">
                                        <h3 className="title move-anim">
                                            We believe in the power of design to elevate businesses and product solutions
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 justify-content-between row-padding-top overflow-hidden">
                                <div className="col-md-6 col-xl-5 col-xxl-4 d-flex align-items-xl-center order-1 order-xl-0 overflow-hidden">
                                    <div className="img_reveal overflow-hidden">
                                        <img
                                            src="./assets/images/about/about-thumb-2-1.png"
                                            alt="about-thumb"
                                            className="w-100"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-5 col-xxl-4 order-0 order-xl-1">
                                    <div className="section-content">
                                        <p className="move-anim" data-duration="0.01">
                                            Our approach is all about understanding your needs and bringing your ideas to life without complexity. We thrive turning imaginative concepts into user-friendly digital solutions. Whether it's a sleek website, a user-friendly app, or a memorable brand identity, we focus on creating designs that not only.
                                        </p>
                                        <p className="move-anim" data-duration="0.01">
                                            Designing immersive digital experiences or developing strategic marketing campaigns, we approach each project with meticulous attention to detail.
                                        </p>
                                        <a className="quanto-link-btn" href="about.html">
                                            More about us
                                            <span>
                                                <i className="fa-solid fa-arrow-right arry1"></i>
                                                <i className="fa-solid fa-arrow-right arry2"></i>
                                            </span>
                                        </a>
                                        <figure className="overflow-hidden">
                                            <div className="img_reveal overflow-hidden">
                                                <img
                                                    src="./assets/images/about/about-thumb-2-2.png"
                                                    alt="about-thumb"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </figure>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-2 d-flex align-items-xl-center order-xl-2 overflow-hidden">
                                    <div className="img_reveal overflow-hidden">
                                        <img
                                            src="./assets/images/about/about-thumb-2-3.png"
                                            alt="about-thumb"
                                            className="w-100"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="marquee-container section-margin-top fade-anim">
                            <div className="marquee">
                                <a className="marquee-item-container" href="contact.html">
                                    <div className="marquee-item">
                                        <h1>a new generation of digital creators&nbsp;</h1>
                                    </div>
                                    <div className="marquee-item">
                                        <h1>a new generation of digital creators&nbsp;</h1>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </section>
                    <section className="quanto-awards-area section-padding-top-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row justify-content-end">
                                <div className="col-lg-10 col-xl-8 col-xxl-7">
                                    {[
                                        { title: "Winner - Best eCommerce Websites", info: "Awwwards ─ 2023" },
                                        { title: "Awarded - Top Creative Agency in United State", info: "Envato Elements ─ 2022" },
                                        { title: "Mentioned - Honorable Mentioned", info: "Design Community ─ 2022" },
                                        { title: "Winner - Behance Portfolio Review", info: "Behance ─ 2021" },
                                        { title: "Winner - Featured App Design of the Week", info: "UI/UX Global Award ─ 2019" },
                                    ].map((award, index) => (
                                        <div key={index} className="quanto-awards-box fade-anim">
                                            <h6 className="awards-title">{award.title}</h6>
                                            <span className="awards-info">{award.info}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="quanto-team-area section-padding-bottom">
                        <div className="container custom-container">
                            <div className="row gx-4 gy-2 align-items-end">
                                <div className="col-md-9 col-xl-7 col-xxl-6">
                                    <div className="quanto__header">
                                        <h3 className="title text-center text-md-start fade-anim" data-direction="left">
                                            Meet our innovative team members
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-md-3 col-xl-5 col-xxl-6">
                                    <div className="quanto__headerr d-flex justify-content-center justify-content-lg-end">
                                        <a className="quanto-link-btn" href="team.html">
                                            Join the team
                                            <span>
                                                <i className="fa-solid fa-arrow-right arry1"></i>
                                                <i className="fa-solid fa-arrow-right arry2"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 g-sm-3 g-md-4 row-padding-top">
                                {[
                                    { name: "Tony Lixivel", position: "Lead Full Stack Developer", img: "./assets/images/team/team-1.png" },
                                    { name: "Daniel Schrier", position: "Senior Product Designer", img: "./assets/images/team/team-2.png" },
                                    { name: "Audrey Tassel", position: "Administrative & HR Assistant", img: "./assets/images/team/team-3.png" },
                                    { name: "Tanguy Caruel", position: "Chief Technology Officer", img: "./assets/images/team/team-4.png" },
                                ].map((member, index) => (
                                    <div key={index} className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                        <div className="quanto-team-box fade-anim" data-delay={0.30 + index * 0.15} data-direction="right">
                                            <figure className="team-thumb">
                                                <img src={member.img} alt="team" className="w-100" loading="lazy" />
                                                <ul className="custom-ul">
                                                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                                </ul>
                                            </figure>
                                            <div className="team-content">
                                                <h6 className="team-member-name">
                                                    <a href="team-details.html">{member.name}</a>
                                                </h6>
                                                <span className="team-member-position">{member.position}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="quanto-testimonial3-section bg-color-2 section-padding-top-bottom">
                        <div className="container custom-container">
                            <div className="row g-4 justify-content-between overflow-hidden">
                                <div className="col-lg-6 col-xxl-5 pe-xxl-0">
                                    <div className="quanto__header h-100">
                                        <h3 className="title fade-anim" data-delay="0.30" data-direction="left">
                                            What clients say about our company
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-xxl-5">
                                    <div className="swiper testimonial3-slider fade-anim" data-delay="0.30" data-direction="right">
                                        <div className="swiper-wrapper">
                                            {[
                                                { name: "Jenny Bennett", designation: "Senior Marketing Manager at Caya", quote: "Quanto team quickly understood our business requirements and were proactive and flexible with our ongoing support and developments. You can definitely trust them for complex project requirements as they are top-notch in their field and we can only recommend it." },
                                                { name: "Jenny Bennett", designation: "Senior Marketing Manager at Caya", quote: "Quanto team quickly understood our business requirements and were proactive and flexible with our ongoing support and developments. You can definitely trust them for complex project requirements as they are top-notch in their field and we can only recommend it." },
                                            ].map((testimonial, index) => (
                                                <div key={index} className="swiper-slide">
                                                    <div className="testimonial3-content">
                                                        <p>{testimonial.quote}</p>
                                                        <div className="client-info">
                                                            <h5 className="client-name">{testimonial.name}</h5>
                                                            <span className="client-designation">{testimonial.designation}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="testimonial3-navigation">
                                        <div className="next-btn bg-color-white">
                                            <i className="fa-solid fa-angle-left"></i>
                                        </div>
                                        <div className="prev-btn bg-color-white">
                                            <i className="fa-solid fa-angle-right"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="quanto-clients-area bg-color-2 section-padding-bottom">
                        <div className="container custom-container">
                            <div className="row g-4">
                                <div className="col-12">
                                    <p>We worked with largest global brands</p>
                                </div>
                                <div className="col-12 clients__box-wrapper">
                                    {[
                                        { logo: logo3, delay: 0.30 },
                                        { logo: logo4, delay: 0.45 },
                                        { logo: logo5, delay: 0.60 },
                                        { logo: logo6, delay: 0.75 },
                                        { logo: logo7, delay: 0.90 },
                                        { logo: logo8, delay: 1.05 },
                                    ].map((client, index) => (
                                        <div key={index} className="client-box fade-anim" data-delay={client.delay} data-direction="right">
                                            <img src={client.logo} alt="client-logo" loading="lazy" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;