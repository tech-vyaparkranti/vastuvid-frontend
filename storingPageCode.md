 {/* New Vastu Banner Section */}
                   {/* Vastu Banner Section */}
                    <section ref={bannerRef} className="vastu-banner section-padding-top-bottom position-relative" style={{paddingTop: '120px', paddingBottom: '80px'}}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            opacity: 0.05,
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, #b85a85 35px, #b85a85 70px), repeating-linear-gradient(-45deg, transparent, transparent 35px, #8e5a9e 35px, #8e5a9e 70px)`,
                            zIndex: 1
                        }}></div>

                        <div className="decorative-circle" style={{
                            top: '5%',
                            left: '3%',
                            width: '120px',
                            height: '120px',
                            background: 'linear-gradient(135deg, rgba(184, 90, 133, 0.15), rgba(142, 90, 158, 0.15))',
                            transform: 'rotate(45deg)',
                            animationDelay: '0s'
                        }}></div>
                        <div className="decorative-circle" style={{
                            top: '50%',
                            right: '5%',
                            width: '160px',
                            height: '160px',
                            background: 'linear-gradient(135deg, rgba(142, 90, 158, 0.12), rgba(184, 90, 133, 0.12))',
                            transform: 'rotate(15deg)',
                            animationDelay: '1s'
                        }}></div>
                        <div className="decorative-circle" style={{
                            bottom: '10%',
                            left: '8%',
                            width: '100px',
                            height: '100px',
                            background: 'linear-gradient(135deg, rgba(184, 90, 133, 0.18), rgba(255, 255, 255, 0.2))',
                            transform: 'rotate(30deg)',
                            animationDelay: '2s'
                        }}></div>

                        <div className="container custom-container position-relative" style={{zIndex: 10}}>
                            <div className="row justify-content-center text-center">
                                <div className="col-lg-10 col-xl-9">
                                    <div className="mb-4 fade-anim" data-delay="0.15" data-direction="bottom">
                                        <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline-block', filter: 'drop-shadow(0 4px 20px rgba(184, 90, 133, 0.3))'}}>
                                            <rect x="20" y="50" width="60" height="60" transform="rotate(-45 50 50)" stroke="url(#vastuGrad1)" strokeWidth="2.5" fill="none"/>
                                            
                                            <rect x="30" y="50" width="40" height="40" transform="rotate(-45 50 50)" fill="url(#vastuGrad2)" opacity="0.3"/>
                                            
                                            <rect x="32" y="38" width="36" height="5" fill="url(#vastuGrad1)" rx="1"/>
                                            <rect x="32" y="48" width="36" height="5" fill="url(#vastuGrad1)" rx="1"/>
                                            <rect x="32" y="57" width="36" height="5" fill="url(#vastuGrad1)" rx="1"/>
                                            
                                            <rect x="38" y="32" width="5" height="36" fill="url(#vastuGrad2)" rx="1"/>
                                            <rect x="48" y="32" width="5" height="36" fill="url(#vastuGrad2)" rx="1"/>
                                            <rect x="57" y="32" width="5" height="36" fill="url(#vastuGrad2)" rx="1"/>
                                            
                                            <rect x="44" y="44" width="12" height="12" fill="white" stroke="url(#vastuGrad1)" strokeWidth="2"/>
                                            
                                            <defs>
                                                <linearGradient id="vastuGrad1" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#b85a85"/>
                                                    <stop offset="1" stopColor="#8e5a9e"/>
                                                </linearGradient>
                                                <linearGradient id="vastuGrad2" x1="100" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#8e5a9e"/>
                                                    <stop offset="1" stopColor="#b85a85"/>
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>

                                    <h1 className="display-3 fw-bold mb-3 word-anim" data-delay="0.30" style={{
                                        background: 'linear-gradient(135deg, #b85a85 0%, #8e5a9e 50%, #b85a85 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        fontSize: 'clamp(2rem, 5vw, 3.5rem)'
                                    }}>
                                        Vastu Shastra Consultation Plans
                                    </h1>

                                    <p className="lead mb-4 move-anim" data-delay="0.45" style={{
                                        fontSize: '1.25rem',
                                        color: '#6b7280',
                                        fontWeight: '400',
                                        maxWidth: '700px',
                                        margin: '0 auto 2rem'
                                    }}>
                                        Harmonize your living and working spaces with time-tested Vastu principles
                                    </p>

                                    <div className="d-flex flex-wrap justify-content-center gap-3 fade-anim" data-delay="0.60">
                                        <div className="d-flex align-items-center gap-2 px-4 py-2 rounded-pill" style={{
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(184, 90, 133, 0.25)',
                                            boxShadow: '0 2px 10px rgba(184, 90, 133, 0.15)'
                                        }}>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 2L12.09 7.26L18 8.27L14 12.14L14.82 18.02L10 15.77L5.18 18.02L6 12.14L2 8.27L7.91 7.26L10 2Z" fill="#b85a85"/>
                                            </svg>
                                            <span style={{color: '#4b5563', fontWeight: '500', fontSize: '0.95rem'}}>Certified Experts</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 px-4 py-2 rounded-pill" style={{
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(142, 90, 158, 0.25)',
                                            boxShadow: '0 2px 10px rgba(142, 90, 158, 0.15)'
                                        }}>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="#8e5a9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M7 10L9 12L13 8" stroke="#8e5a9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span style={{color: '#4b5563', fontWeight: '500', fontSize: '0.95rem'}}>1000+ Happy Clients</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 px-4 py-2 rounded-pill" style={{
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(184, 90, 133, 0.25)',
                                            boxShadow: '0 2px 10px rgba(184, 90, 133, 0.15)'
                                        }}>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 1L13 7L19 8L14.5 12.5L15.5 19L10 16L4.5 19L5.5 12.5L1 8L7 7L10 1Z" fill="#b85a85" stroke="#b85a85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span style={{color: '#4b5563', fontWeight: '500', fontSize: '0.95rem'}}>Proven Results</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Vastu Banner Section */}
                    <section ref={bannerRef} className="vastu-banner section-padding-top-bottom position-relative" style={{paddingTop: '140px', paddingBottom: '100px'}}>
                        <div className="container custom-container position-relative" style={{zIndex: 10}}>
                            <div className="row align-items-center g-5">
                                {/* Left Content */}
                                <div className="col-lg-6">
                                    <div className="vastu-banner-content">
                                        {/* Badge */}
                                        <div className="mb-4 fade-anim" data-delay="0.15" data-direction="bottom">
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                padding: '10px 20px',
                                                background: 'linear-gradient(135deg, rgba(184, 90, 133, 0.1), rgba(142, 90, 158, 0.1))',
                                                border: '1px solid rgba(184, 90, 133, 0.3)',
                                                borderRadius: '50px',
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                color: '#8e5a9e'
                                            }}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#b85a85"/>
                                                </svg>
                                                Ancient Wisdom, Modern Solutions
                                            </span>
                                        </div>

                                        {/* Main Heading */}
                                        <h1 className="word-anim mb-4" data-delay="0.30" style={{
                                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                                            fontWeight: '700',
                                            lineHeight: '1.2',
                                            color: '#1f2937',
                                            marginBottom: '1.5rem'
                                        }}>
                                            Transform Your Space with 
                                            <span style={{
                                                display: 'block',
                                                background: 'linear-gradient(135deg, #b85a85 0%, #8e5a9e 100%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                                marginTop: '0.5rem'
                                            }}>
                                                Vastu Shastra
                                            </span>
                                        </h1>

                                        {/* Description */}
                                        <p className="move-anim mb-5" data-delay="0.45" style={{
                                            fontSize: '1.15rem',
                                            color: '#6b7280',
                                            lineHeight: '1.8',
                                            maxWidth: '500px'
                                        }}>
                                            Unlock harmony, prosperity, and positive energy in your home or workplace with our expert Vastu consultation services.
                                        </p>

                                        {/* Features */}
                                        <div className="mb-5 fade-anim" data-delay="0.60">
                                            <div className="d-flex flex-column gap-3">
                                                <div className="d-flex align-items-start gap-3">
                                                    <div style={{
                                                        minWidth: '40px',
                                                        height: '40px',
                                                        borderRadius: '50%',
                                                        background: 'linear-gradient(135deg, #b85a85, #8e5a9e)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 4px 15px rgba(184, 90, 133, 0.3)'
                                                    }}>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h6 style={{fontWeight: '600', color: '#1f2937', marginBottom: '4px'}}>Certified Vastu Consultants</h6>
                                                        <p style={{fontSize: '0.95rem', color: '#6b7280', margin: 0}}>Expert guidance from experienced professionals</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-start gap-3">
                                                    <div style={{
                                                        minWidth: '40px',
                                                        height: '40px',
                                                        borderRadius: '50%',
                                                        background: 'linear-gradient(135deg, #8e5a9e, #b85a85)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 4px 15px rgba(142, 90, 158, 0.3)'
                                                    }}>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h6 style={{fontWeight: '600', color: '#1f2937', marginBottom: '4px'}}>Personalized Solutions</h6>
                                                        <p style={{fontSize: '0.95rem', color: '#6b7280', margin: 0}}>Tailored recommendations for your unique space</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-start gap-3">
                                                    <div style={{
                                                        minWidth: '40px',
                                                        height: '40px',
                                                        borderRadius: '50%',
                                                        background: 'linear-gradient(135deg, #b85a85, #8e5a9e)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 4px 15px rgba(184, 90, 133, 0.3)'
                                                    }}>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h6 style={{fontWeight: '600', color: '#1f2937', marginBottom: '4px'}}>1000+ Success Stories</h6>
                                                        <p style={{fontSize: '0.95rem', color: '#6b7280', margin: 0}}>Join thousands of satisfied clients</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <div className="fade-anim" data-delay="0.75">
                                            <Link to="#quanto-pricing-area" className="section-link" style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '16px 32px',
                                                background: 'linear-gradient(135deg, #b85a85, #8e5a9e)',
                                                color: 'white',
                                                fontSize: '1.05rem',
                                                fontWeight: '600',
                                                borderRadius: '50px',
                                                textDecoration: 'none',
                                                boxShadow: '0 8px 25px rgba(184, 90, 133, 0.35)',
                                                transition: 'all 0.3s ease'
                                            }}>
                                                Explore Our Plans
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Visual */}
                                <div className="col-lg-6">
                                    <div className="vastu-banner-visual fade-anim" data-delay="0.30" data-direction="right" style={{position: 'relative'}}>
                                        {/* Main Visual Container */}
                                        <div style={{
                                            position: 'relative',
                                            background: 'linear-gradient(135deg, rgba(184, 90, 133, 0.08), rgba(142, 90, 158, 0.08))',
                                            borderRadius: '30px',
                                            padding: '60px',
                                            border: '2px solid rgba(184, 90, 133, 0.2)',
                                            backdropFilter: 'blur(10px)'
                                        }}>
                                            {/* Vastu Grid Illustration */}
                                            <svg width="100%" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                {/* Outer Square */}
                                                <rect x="50" y="50" width="300" height="300" stroke="#b85a85" strokeWidth="3" fill="white" rx="10"/>
                                                
                                                {/* Grid Lines */}
                                                <line x1="150" y1="50" x2="150" y2="350" stroke="#e0b3cc" strokeWidth="1.5" strokeDasharray="5,5"/>
                                                <line x1="250" y1="50" x2="250" y2="350" stroke="#e0b3cc" strokeWidth="1.5" strokeDasharray="5,5"/>
                                                <line x1="50" y1="150" x2="350" y2="150" stroke="#e0b3cc" strokeWidth="1.5" strokeDasharray="5,5"/>
                                                <line x1="50" y1="250" x2="350" y2="250" stroke="#e0b3cc" strokeWidth="1.5" strokeDasharray="5,5"/>
                                                
                                                {/* Directional Markers */}
                                                <text x="200" y="35" textAnchor="middle" fill="#8e5a9e" fontSize="14" fontWeight="600">NORTH</text>
                                                <text x="200" y="380" textAnchor="middle" fill="#8e5a9e" fontSize="14" fontWeight="600">SOUTH</text>
                                                <text x="30" y="205" textAnchor="middle" fill="#8e5a9e" fontSize="14" fontWeight="600">W</text>
                                                <text x="370" y="205" textAnchor="middle" fill="#8e5a9e" fontSize="14" fontWeight="600">E</text>
                                                
                                                {/* Center Brahmasthana */}
                                                <rect x="150" y="150" width="100" height="100" fill="url(#centerGradient)" stroke="#b85a85" strokeWidth="2" rx="5"/>
                                                <text x="200" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">BRAHMASTHAN</text>
                                                
                                                {/* Directional Zones with Icons */}
                                                {/* Northeast - Water */}
                                                <circle cx="100" cy="100" r="25" fill="rgba(142, 90, 158, 0.2)" stroke="#8e5a9e" strokeWidth="2"/>
                                                <path d="M100 85 Q105 90 100 100 Q95 90 100 85 M100 100 Q105 105 100 115 Q95 105 100 100" fill="#8e5a9e"/>
                                                
                                                {/* Southeast - Fire */}
                                                <circle cx="300" cy="100" r="25" fill="rgba(184, 90, 133, 0.2)" stroke="#b85a85" strokeWidth="2"/>
                                                <path d="M300 85 L305 95 L295 95 Z M300 95 L307 105 L293 105 Z M300 105 L310 115 L290 115 Z" fill="#b85a85"/>
                                                
                                                {/* Southwest - Earth */}
                                                <circle cx="300" cy="300" r="25" fill="rgba(142, 90, 158, 0.2)" stroke="#8e5a9e" strokeWidth="2"/>
                                                <rect x="285" y="285" width="30" height="30" fill="#8e5a9e" rx="3"/>
                                                
                                                {/* Northwest - Air */}
                                                <circle cx="100" cy="300" r="25" fill="rgba(184, 90, 133, 0.2)" stroke="#b85a85" strokeWidth="2"/>
                                                <path d="M85 300 Q100 290 115 300 M85 305 Q100 295 115 305 M85 310 Q100 300 115 310" stroke="#b85a85" strokeWidth="2" fill="none"/>
                                                
                                                <defs>
                                                    <linearGradient id="centerGradient" x1="150" y1="150" x2="250" y2="250" gradientUnits="userSpaceOnUse">
                                                        <stop stopColor="#b85a85"/>
                                                        <stop offset="1" stopColor="#8e5a9e"/>
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>

                                        {/* Floating Elements */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '-20px',
                                            right: '-20px',
                                            width: '100px',
                                            height: '100px',
                                            background: 'linear-gradient(135deg, #b85a85, #8e5a9e)',
                                            borderRadius: '20px',
                                            transform: 'rotate(15deg)',
                                            boxShadow: '0 10px 30px rgba(184, 90, 133, 0.3)',
                                            animation: 'float 6s ease-in-out infinite'
                                        }}></div>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '-30px',
                                            left: '-30px',
                                            width: '120px',
                                            height: '120px',
                                            background: 'linear-gradient(135deg, #8e5a9e, #b85a85)',
                                            borderRadius: '25px',
                                            transform: 'rotate(-15deg)',
                                            boxShadow: '0 10px 30px rgba(142, 90, 158, 0.3)',
                                            animation: 'float 8s ease-in-out infinite reverse'
                                        }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
