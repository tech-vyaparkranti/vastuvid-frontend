import React, { useEffect, useRef } from 'react';
import logo3 from '../assets/images/clients/logo-3.png';
import logo4 from '../assets/images/clients/logo-4.png';
import logo5 from '../assets/images/clients/logo-5.png';
import logo6 from '../assets/images/clients/logo-6.png';
import logo7 from '../assets/images/clients/logo-7.png';
import logo8 from '../assets/images/clients/logo-8.png';
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

const About = () => {
    const swiperInstances = useRef([]);
    const smootherRef = useRef(null);
    const gsapContext = useRef(null);

    useEffect(() => {
        Aos.init({
            duration: 2000,
            once: false,
            mirror: true,
        });

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

            // Odometer Counter
            document.querySelectorAll('.counter-item .odometer').forEach((el) => {
                const odometer = new Odometer({
                    el: el,
                    value: 0,
                    format: '(,ddd)',
                    duration: 2000,
                });
                const finalValue = el.getAttribute('data-odometer-final');
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
            initializeSwiper('.testimonial3-slider', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                navigation: {
                    nextEl: '.testimonial3-navigation .next-btn',
                    prevEl: '.testimonial3-navigation .prev-btn',
                },
                autoplay: { delay: 5000, disableOnInteraction: false },
            });

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

            // Move Animation
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

            // Image Parallax Animation
            document.querySelectorAll('.quanto-hero__thumb').forEach((thumb) => {
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

            // Section Jump
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

        return () => {
            swiperInstances.current.forEach((swiper) => swiper.destroy(true, true));
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
            <a href="#header" id="scroll-top" className="back-to-top-btn section-link">
                <i className="fa-solid fa-arrow-up"></i>
            </a>
            <div id="smooth-content">
                <section className="quanto-hero-about-section section-padding-bottom overflow-hidden">
                    <div className="container custom-container">
                        <div className="row g-4 align-items-end">
                            <div className="col-lg-9 col-xxl-10">
                                <div className="quanto-hero-about__content move-anim" data-delay="0.45">
                                    <h1 className="title word-anim" data-delay="0.60">
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
                                <div className="quanto-hero__thumb text-center fade-anim" data-delay="0.30" data-direction="bottom">
                                    <img
                                        src="/assets/images/hero/common-hero-thumb-6.png"
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
                <section id="quanto-funfacts-section" className="quanto-funfacts-section section-padding-top-bottom bg-color-white">
                    <div className="container custom-container">
                        <div className="row g-4 justify-content-between">
                            <div className="col-lg-6 col-xl-5 col-xxl-4 gsap-sticky">
                                <div className="quanto__header">
                                    <h3 className="title fade-anim word-anim" data-delay="0.30" data-direction="left">
                                        Our Achievements
                                    </h3>
                                </div>
                            </div>
                            <div className="col-lg-6 col-xl-7 col-xxl-7 gsap-scroll">
                                <div className="quanto-funfacts__wrapper">
                                    {[
                                        { value: 17, text: 'Years of agency experience', unit: '+' },
                                        { value: 220, text: 'Successfully projects done', unit: '+' },
                                        { value: 46, text: 'World-wide team members', unit: '+' },
                                        { value: 98, text: 'Clients satisfied & retention', unit: '%' },
                                    ].map((fact, index) => (
                                        <div key={index} className="quanto-funfact-box fade-anim" data-delay={0.30 + index * 0.15}>
                                            <h2 className="counter-item d-inline-flex align-items-center">
                                                <span className="odometer d-inline-block" data-odometer-final={fact.value}>0</span>
                                                <em>{fact.unit}</em>
                                            </h2>
                                            <span className="funfact-info move-anim" data-delay={0.45 + index * 0.15}>{fact.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="quanto-about-area2 section-padding-top-bottom bg-color-white">
                    <div className="container custom-container">
                        <div className="row g-4 justify-content-between">
                            <div className="col-lg-6 col-xl-5 col-xxl-4 gsap-sticky">
                                <div className="quanto__header">
                                    <h3 className="title fade-anim word-anim" data-delay="0.30" data-direction="left">
                                        Our Mission
                                    </h3>
                                </div>
                            </div>
                            <div className="col-lg-6 col-xl-7 col-xxl-7 gsap-scroll">
                                <div className="section-content">
                                    <p className="move-anim" data-delay="0.45">
                                        Our approach is all about understanding your needs and bringing your ideas to life without complexity. We thrive turning imaginative concepts into user-friendly digital solutions. Whether it's a sleek website, a user-friendly app, or a memorable brand identity, we focus on creating designs that not only.
                                    </p>
                                    <p className="move-anim" data-delay="0.60">
                                        Designing immersive digital experiences or developing strategic marketing campaigns, we approach each project with meticulous attention to detail.
                                    </p>
                                    <a className="quanto-link-btn section-link" href="#quanto-awards-section">
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
                </section>
                <section id="quanto-awards-section" className="quanto-awards-area section-padding-top-bottom bg-color-white">
                    <div className="container custom-container">
                        <div className="row g-4 justify-content-between">
                            <div className="col-lg-6 col-xl-5 col-xxl-4 gsap-sticky">
                                <div className="quanto__header">
                                    <h3 className="title fade-anim word-anim" data-delay="0.30" data-direction="left">
                                        Our Awards
                                    </h3>
                                </div>
                            </div>
                            <div className="col-lg-6 col-xl-7 col-xxl-7 gsap-scroll">
                                <div className="quanto-awards__wrapper">
                                    {[
                                        { title: 'Winner - Best eCommerce Websites', info: 'Awwwards ─ 2023' },
                                        { title: 'Awarded - Top Creative Agency in United State', info: 'Envato Elements ─ 2022' },
                                        { title: 'Mentioned - Honorable Mentioned', info: 'Design Community ─ 2022' },
                                        { title: 'Winner - Behance Portfolio Review', info: 'Behance ─ 2021' },
                                        { title: 'Winner - Featured App Design of the Week', info: 'UI/UX Global Award ─ 2019' },
                                    ].map((award, index) => (
                                        <div key={index} className="quanto-awards-box fade-anim" data-delay={0.30 + index * 0.15}>
                                            <h6 className="awards-title word-anim" data-delay={0.30 + index * 0.15}>{award.title}</h6>
                                            <span className="awards-info move-anim" data-delay={0.45 + index * 0.15}>{award.info}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="quanto-team-area section-padding-top-bottom bg-color-white">
                    <div className="container custom-container">
                        <div className="row g-4 justify-content-between">
                            <div className="col-lg-6 col-xl-5 col-xxl-4 gsap-sticky">
                                <div className="quanto__header">
                                    <h3 className="title fade-anim word-anim" data-delay="0.30" data-direction="left">
                                        Meet our innovative team members
                                    </h3>
                                </div>
                            </div>
                            <div className="col-lg-6 col-xl-7 col-xxl-7 gsap-scroll">
                                <div className="quanto-team__wrapper">
                                    {[
                                        { name: 'Tony Lixivel', position: 'Lead Full Stack Developer', img: './assets/images/team/team-1.png' },
                                        { name: 'Daniel Schrier', position: 'Senior Product Designer', img: './assets/images/team/team-2.png' },
                                        { name: 'Audrey Tassel', position: 'Administrative & HR Assistant', img: './assets/images/team/team-3.png' },
                                        { name: 'Tanguy Caruel', position: 'Chief Technology Officer', img: './assets/images/team/team-4.png' },
                                    ].map((member, index) => (
                                        <div key={index} className="quanto-team-box fade-anim" data-delay={0.30 + index * 0.15}>
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
                                                <h6 className="team-member-name word-anim" data-delay={0.30 + index * 0.15}>
                                                    <a href="team-details.html">{member.name}</a>
                                                </h6>
                                                <span className="team-member-position move-anim" data-delay={0.45 + index * 0.15}>{member.position}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="quanto-testimonial3-section section-padding-top-bottom bg-color-2">
                    <div className="container custom-container">
                        <div className="row g-4 justify-content-between">
                            <div className="col-lg-6 col-xl-5 col-xxl-4 gsap-sticky">
                                <div className="quanto__header">
                                    <h3 className="title fade-anim word-anim" data-delay="0.30" data-direction="left">
                                        What clients say about our company
                                    </h3>
                                </div>
                            </div>
                            <div className="col-lg-6 col-xl-7 col-xxl-7 gsap-scroll">
                                <div className="swiper testimonial3-slider fade-anim" data-delay="0.30" data-direction="right">
                                    <div className="swiper-wrapper">
                                        {[
                                            {
                                                name: 'Jenny Bennett',
                                                designation: 'Senior Marketing Manager at Caya',
                                                quote: 'Quanto team quickly understood our business requirements and were proactive and flexible with our ongoing support and developments. You can definitely trust them for complex project requirements as they are top-notch in their field and we can only recommend it.',
                                            },
                                            {
                                                name: 'Jenny Bennett',
                                                designation: 'Senior Marketing Manager at Caya',
                                                quote: 'Quanto team quickly understood our business requirements and were proactive and flexible with our ongoing support and developments. You can definitely trust them for complex project requirements as they are top-notch in their field and we can only recommend it.',
                                            },
                                        ].map((testimonial, index) => (
                                            <div key={index} className="swiper-slide">
                                                <div className="testimonial3-content">
                                                    <p className="move-anim" data-delay={0.45 + index * 0.15}>{testimonial.quote}</p>
                                                    <div className="client-info">
                                                        <h5 className="client-name word-anim" data-delay={0.30 + index * 0.15}>{testimonial.name}</h5>
                                                        <span className="client-designation move-anim" data-delay={0.45 + index * 0.15}>{testimonial.designation}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="testimonial3-navigation">
                                    <div className="next-btn bg-color-white">
                                        <i className="fa-solid fa-angle-right"></i>
                                    </div>
                                    <div className="prev-btn bg-color-white">
                                        <i className="fa-solid fa-angle-left"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="quanto-clients-area section-padding-top-bottom bg-color-2">
                    <div className="container custom-container">
                        <div className="row g-4 justify-content-between">
                            <div className="col-lg-6 col-xl-5 col-xxl-4 gsap-sticky">
                                <div className="quanto__header">
                                    <h3 className="title fade-anim word-anim" data-delay="0.30" data-direction="left">
                                        Our Clients
                                    </h3>
                                </div>
                            </div>
                            <div className="col-lg-6 col-xl-7 col-xxl-7 gsap-scroll">
                                <div className="clients__box-wrapper">
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
                </section>

            </div>
        </>
    );
};

export default About;