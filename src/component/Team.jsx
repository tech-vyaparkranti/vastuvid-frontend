import React, { useEffect, useRef } from 'react';
import AppImage from './AppImage';
import { Link } from 'react-router-dom'; // Import Link for SPA navigation
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

const Team = () => {
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

            // Odometer Counter (optional, if you want to add counters to the team page)
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

            // Testimonial Slider
            initializeSwiper(".testimonial3-slider", {
                slidesPerView: 1,
                loop: true,
                spaceBetween: 20,
                navigation: {
                    nextEl: ".testimonial3-navigation .next-btn",
                    prevEl: ".testimonial3-navigation .prev-btn",
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
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

            // Hover Overlay Animations for Team Boxes
            document.querySelectorAll(".quanto-team-box").forEach((box) => {
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

            // Move Animation for Team Content
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

            // Fade Animation for Team Boxes and Testimonial
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

            // Word Animation for Titles
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

            // Image Parallax Animation for Hero Thumbnail
            document.querySelectorAll(".quanto-hero__thumb").forEach((thumb) => {
                const image = thumb.querySelector("img");
                const dataSpeed = parseFloat(thumb.querySelector("img").getAttribute("data-speed") || 0.8);
                gsap.to(image, {
                    yPercent: 20 * (1 - dataSpeed),
                    ease: "none",
                    scrollTrigger: {
                        trigger: thumb,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
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
                    <section className="quanto-hero-team-section section-padding-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row g-4">
                                <div className="col-lg-12 col-xxl-11">
                                    <div className="quanto-hero-team__content move-anim" data-delay="0.45">
                                        <h1 className="title word-anim" data-delay="0.60">Building success through collaboration</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="quanto-video-area style-2 overflow-hidden">
                        <div className="container custom-container position-relative">
                            <Link to="#quanto-team-area" className="scroll-down section-link">
                                Scroll down
                                <AppImage src="/assets/images/icons/scroll-down.svg" alt="Scroll down" loading="lazy" />
                            </Link>
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto-hero__thumb text-center fade-anim" data-delay="0.30" data-direction="bottom">
                                        <AppImage
                                            src="/assets/images/hero/common-hero-thumb-4.png"
                                            alt="hero-thumb"
                                            data-speed="0.8"
                                            className="w-100"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section id="quanto-team-area" className="quanto-team-area section-padding-top-bottom">
                        <div className="container custom-container">
                            <div className="row gx-4 gy-2 align-items-end">
                                <div className="col-md-9 col-xl-7 col-xxl-6">
                                    <div className="quanto__header">
                                        <h3 className="title text-center text-md-start fade-anim word-anim" data-delay="0.30" data-direction="left">
                                            Meet our innovative team members
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-md-3 col-xl-5 col-xxl-6">
                                    <div className="quanto__headerr d-flex justify-content-center justify-content-lg-end">
                                        <Link to="/join-team" className="quanto-link-btn">
                                            Join the team
                                            <span>
                                                <i className="fa-solid fa-arrow-right arry1"></i>
                                                <i className="fa-solid fa-arrow-right arry2"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="row gx-4 gy-5 gx-sm-3 gx-md-4 row-padding-top">
                                {[
                                    { name: "Tony Lixivel", position: "Lead Full Stack Developer", img: "/assets/images/team/team-1.png", link: "/team-details" },
                                    { name: "Daniel Schrier", position: "Senior Product Designer", img: "/assets/images/team/team-2.png", link: "/team-details" },
                                    { name: "Audrey Tassel", position: "Administrative & HR Assistant", img: "/assets/images/team/team-3.png", link: "/team-details" },
                                    { name: "Sakebul Islam", position: "Front End Developer", img: "/assets/images/team/team-4.png", link: "https://tinyurl.com/a35mtbbu" },
                                    { name: "Brian Herbert", position: "Senior Software Developer", img: "/assets/images/team/team-5.png", link: "/team-details" },
                                    { name: "Anna Peterson", position: "Lead Marketing Manager", img: "/assets/images/team/team-6.png", link: "/team-details" },
                                    { name: "Patrick Johnson", position: "Creative Graphics Designer", img: "/assets/images/team/team-7.png", link: "/team-details" },
                                    { name: "Cynthia Taylor", position: "Human Resources Officer", img: "/assets/images/team/team-8.png", link: "/team-details" },
                                ].map((member, index) => (
                                    <div key={index} className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                        <div className="quanto-team-box fade-anim" data-delay={0.30 + index * 0.15} data-direction="right">
                                            <figure className="team-thumb">
                                                <AppImage src={member.img} alt="team" className="w-100" loading="lazy" />
                                                <ul className="custom-ul">
                                                    <li>
                                                        <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i className="fa-brands fa-instagram"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                                                    </li>
                                                </ul>
                                            </figure>
                                            <div className="team-content">
                                                <h6 className="team-member-name word-anim" data-delay={0.30 + index * 0.15}>
                                                    <Link to={member.link}>{member.name}</Link>
                                                </h6>
                                                <span className="team-member-position move-anim" data-delay={0.45 + index * 0.15}>
                                                    {member.position}
                                                </span>
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
                                        <h3 className="title fade-anim word-anim" data-delay="0.30" data-direction="left">
                                            What clients say about our company
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-xxl-5">
                                    <div className="swiper testimonial3-slider fade-anim" data-delay="0.30" data-direction="right">
                                        <div className="swiper-wrapper">
                                            {[
                                                {
                                                    quote: "Quanto team quickly understood our business requirements and were proactive and flexible with our ongoing support and developments. You can definitely trust them for complex project requirements as they are top-notch in their field and we can only recommend it.",
                                                    name: "Jenny Bennett",
                                                    designation: "Senior Marketing Manager at Caya",
                                                },
                                                // Add more testimonials here if needed
                                            ].map((testimonial, index) => (
                                                <div key={index} className="swiper-slide">
                                                    <div className="testimonial3-content">
                                                        <p className="move-anim" data-delay={0.45 + index * 0.15}>{testimonial.quote}</p>
                                                        <div className="client-info">
                                                            <h5 className="client-name word-anim" data-delay={0.60 + index * 0.15}>{testimonial.name}</h5>
                                                            <span className="client-designation move-anim" data-delay={0.75 + index * 0.15}>{testimonial.designation}</span>
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
                </div>

            </div>
        </>
    );
};

export default Team;