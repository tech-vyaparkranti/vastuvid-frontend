import React, { useEffect, useRef } from 'react';
import logo3 from "../assets/images/clients/logo-3.png";
import logo4 from "../assets/images/clients/logo-4.png";
import logo5 from "../assets/images/clients/logo-5.png";
import logo6 from "../assets/images/clients/logo-6.png";
import logo7 from "../assets/images/clients/logo-7.png";
import logo8 from "../assets/images/clients/logo-8.png";
import 'swiper/css';
import { SplitText } from 'gsap/SplitText';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'odometer/themes/odometer-theme-default.css';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Swiper } from 'swiper';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import Odometer from 'odometer';
import Aos from 'aos';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
// Register Swiper modules
Swiper.use([Navigation, Autoplay, EffectFade]);

const Projects = () => {
    const swiperInstances = useRef([]);
    const smootherRef = useRef(null);
    const gsapContext = useRef(null);

    useEffect(() => {
        Aos.init({
            duration: 2000,
            once: false, // Allow animations to replay on scroll
            mirror: true, // Animate elements when scrolling past them again
        });

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

            // Odometer Counter (optional, if you want to add counters to the portfolio page)
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

            // Portfolio Slider
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

            // Hover Overlay Animations for Project Boxes
            document.querySelectorAll(".quanto-project-box").forEach((box) => {
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

            // Move Animation for Portfolio Content
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

            // Fade Animation for Project Boxes
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

            // Word Animation for Project Titles
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

            // Image Reveal Animation for Project Thumbnails
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

            // Section Jump for Scroll Links
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
            <a href="#" id="scroll-top" className="back-to-top-btn section-link">
                <i className="fa-solid fa-arrow-up"></i>
            </a>
            <div >
                <div id="smooth-content">
                    <section className="quanto-hero-faq-section section-padding-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row g-4">
                                <div className="col-lg-12 col-xxl-11">
                                    <div className="quanto-hero-common__content move-anim" data-delay="0.45">
                                        <h1 className="title word-anim" data-delay="0.60">
                                            Creating unforgettable digital impressions
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="quanto-project-section bg-color-white section-padding-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row g-0 gy-4 gy-md-0 justify-content-between">
                                <div className="col-12 col-md-5 order-1 order-md-0">
                                    <div className="row g-0">
                                        {[
                                            { title: "Kinetic Sandscapes", img: "./assets/images/project/project-1.png", year: "2024", category: "Branding" },
                                            { title: "Brooklyn Brewery", img: "./assets/images/project/project-3.png", year: "2024", category: "Photography" },
                                            { title: "Regenerative Farming", img: "./assets/images/project/project-5.png", year: "2024", category: "Branding" },
                                        ].map((project, index) => (
                                            <div key={index} className="col-md-12 project-row-gap">
                                                <div className="quanto-project-box overflow-hidden fade-anim" data-delay={0.30 + index * 0.15} data-direction="left">
                                                    <a href="portfolio-details.html">
                                                        <div className="quanto-project-thumb overflow-hidden img_reveal">
                                                            <img src={project.img} alt="project-thumb" className="w-100" loading="lazy" />
                                                        </div>
                                                    </a>
                                                    <div className="quanto-project-content">
                                                        <h5 className="text-color-primary line-clamp-1 word-anim" data-delay={0.30 + index * 0.15}>
                                                            <a href="portfolio-details.html">{project.title}</a>
                                                        </h5>
                                                        <span className="quanto-project-date text-color-primary move-anim" data-delay={0.45 + index * 0.15}>
                                                            {project.year}
                                                            <i className="bi bi-dash"></i>
                                                            {project.category}
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
                                            <div className="quanto__header text-center text-md-end"></div>
                                        </div>
                                        {[
                                            { title: "Hopscotch Payments", img: "./assets/images/project/project-2.png", year: "2024", category: "Development" },
                                            { title: "Stories Worthwhile", img: "./assets/images/project/project-4.png", year: "2024", category: "UI/UX Design" },
                                            { title: "Fintech Accelerator", img: "./assets/images/project/project-6.png", year: "2024", category: "UI/UX Design" },
                                        ].map((project, index) => (
                                            <div key={index} className={`col-md-${index === 0 ? '10 ms-auto' : index === 1 ? '9 me-auto' : '10 ms-auto'} project-row-gap`}>
                                                <div className="quanto-project-box overflow-hidden fade-anim" data-delay={0.30 + index * 0.15} data-direction="right">
                                                    <a href="portfolio-details.html">
                                                        <div className="quanto-project-thumb overflow-hidden img_reveal">
                                                            <img src={project.img} alt="project-thumb" className="w-100" loading="lazy" />
                                                        </div>
                                                    </a>
                                                    <div className="quanto-project-content">
                                                        <h5 className="text-color-primary line-clamp-1 word-anim" data-delay={0.30 + index * 0.15}>
                                                            <a href="portfolio-details.html">{project.title}</a>
                                                        </h5>
                                                        <span className="quanto-project-date text-color-primary move-anim" data-delay={0.45 + index * 0.15}>
                                                            {project.year}
                                                            <i className="bi bi-dash"></i>
                                                            {project.category}
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
                    <div className="quanto-clients-area bg-color-2 section-padding-bottom">
                        <div className="container custom-container">
                            <div className="row g-4">
                                <div className="col-12">
                                    <p className="move-anim" data-delay="0.30">We worked with largest global brands</p>
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

export default Projects;