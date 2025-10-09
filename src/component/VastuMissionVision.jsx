import React, { useState, useEffect } from 'react';

export default function VastuMissionVision() {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const sectionStyle = {
    padding: '100px 0',
    background: 'linear-gradient(to bottom, #fff5f7, #fff9fa, #fffbf5)',
    position: 'relative',
    overflow: 'hidden'
  };

  const decorativeSymbol = {
    position: 'absolute',
    fontSize: '120px',
    opacity: '0.05',
    pointerEvents: 'none',
    zIndex: '0'
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '20px',
    padding: '50px 40px',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.5s ease',
    borderTop: '4px solid #ec4899',
    marginBottom: '30px'
  };

  const iconBadgeStyle = {
    width: '70px',
    height: '70px',
    background: 'linear-gradient(135deg, #ec4899, #db2777)',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    color: 'white',
    marginBottom: '20px',
    boxShadow: '0 10px 25px rgba(236, 72, 153, 0.3)',
    transition: 'all 0.3s ease'
  };

  const listItemStyle = {
    padding: '12px 0',
    color: '#666',
    position: 'relative',
    paddingLeft: '30px',
    fontSize: '1rem',
    lineHeight: '1.6',
    transition: 'all 0.3s ease'
  };

  const bulletStyle = {
    position: 'absolute',
    left: '0',
    color: '#ec4899',
    fontWeight: 'bold',
    fontSize: '1.2rem'
  };

  const valueCardStyle = {
    background: 'white',
    borderRadius: '15px',
    padding: '30px 20px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    border: '2px solid #fce7f3',
    height: '100%'
  };

  return (
    <section style={sectionStyle}>
      {/* Decorative Background Elements */}
      <div style={{...decorativeSymbol, top: '50px', left: '5%'}}>🕉️</div>
      <div style={{...decorativeSymbol, bottom: '80px', right: '8%'}}>☸️</div>
      <div style={{...decorativeSymbol, top: '40%', left: '85%'}}>✦</div>
      
      <div className="container custom-container" style={{position: 'relative', zIndex: '1'}}>
        {/* Section Title */}
        <div className="text-center mb-5">
          <h3 
            className="belief-title word-anim"
            style={{
              fontSize: '2.8rem',
              fontWeight: '700',
              color: '#1a1a1a',
              fontFamily: 'Georgia, serif',
              marginBottom: '20px'
            }}
          >
            Our Mission & Vision
          </h3>
          <div style={{
            width: '100px',
            height: '4px',
            background: 'linear-gradient(to right, #ec4899, #f59e0b)',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="row g-4 mb-5">
          {/* Mission Card */}
          <div className="col-lg-6">
            <div
              id="mission-card"
              className="animate-on-scroll"
              style={{
                ...cardStyle,
                opacity: isVisible['mission-card'] ? 1 : 0,
                transform: isVisible['mission-card'] ? 'translateX(0)' : 'translateX(-80px)',
                transition: 'all 0.8s ease 100ms'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(236, 72, 153, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div 
                style={iconBadgeStyle}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(10deg) scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}
              >
                🎯
              </div>
              
              <h4 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '20px',
                fontFamily: 'Georgia, serif'
              }}>
                Our Mission
              </h4>
              
              <p style={{
                color: '#666',
                lineHeight: '1.8',
                fontSize: '1.05rem',
                marginBottom: '25px'
              }}>
                To bring the ancient science of Vastu Shastra into modern living spaces, creating environments that promote health, wealth, and happiness for all our clients.
              </p>
              
              <ul style={{listStyle: 'none', padding: '0', margin: '0'}}>
                {[
                  'Preserve and promote traditional Vastu knowledge',
                  'Provide accessible and practical Vastu solutions',
                  'Create harmonious spaces for every budget',
                  'Educate people about energy balance in architecture',
                  'Integrate Vastu with modern design aesthetics'
                ].map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      ...listItemStyle,
                      opacity: isVisible['mission-card'] ? 1 : 0,
                      transform: isVisible['mission-card'] ? 'translateX(0)' : 'translateX(-30px)',
                      transition: `all 0.5s ease ${idx * 100 + 300}ms`
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.paddingLeft = '40px'}
                    onMouseLeave={(e) => e.currentTarget.style.paddingLeft = '30px'}
                  >
                    <span style={bulletStyle}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Decorative Corner */}
              <div style={{
                position: 'absolute',
                bottom: '15px',
                right: '15px',
                width: '60px',
                height: '60px',
                border: '3px solid',
                borderColor: 'transparent #fce7f3 #fce7f3 transparent',
                borderRadius: '0 0 15px 0',
                opacity: '0.5'
              }}></div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="col-lg-6">
            <div
              id="vision-card"
              className="animate-on-scroll"
              style={{
                ...cardStyle,
                borderTop: '4px solid #f59e0b',
                opacity: isVisible['vision-card'] ? 1 : 0,
                transform: isVisible['vision-card'] ? 'translateX(0)' : 'translateX(80px)',
                transition: 'all 0.8s ease 200ms'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(245, 158, 11, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div 
                style={{
                  ...iconBadgeStyle,
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(10deg) scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}
              >
                🌟
              </div>
              
              <h4 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '20px',
                fontFamily: 'Georgia, serif'
              }}>
                Our Vision
              </h4>
              
              <p style={{
                color: '#666',
                lineHeight: '1.8',
                fontSize: '1.05rem',
                marginBottom: '25px'
              }}>
                To become the most trusted name in Vastu consultation globally, transforming millions of lives by creating spaces that resonate with positive cosmic energy.
              </p>
              
              <ul style={{listStyle: 'none', padding: '0', margin: '0'}}>
                {[
                  'Lead the Vastu industry with innovation',
                  'Expand our services to international markets',
                  'Build a community of Vastu practitioners',
                  'Research and validate Vastu principles scientifically',
                  'Make every space a source of prosperity'
                ].map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      ...listItemStyle,
                      opacity: isVisible['vision-card'] ? 1 : 0,
                      transform: isVisible['vision-card'] ? 'translateX(0)' : 'translateX(30px)',
                      transition: `all 0.5s ease ${idx * 100 + 300}ms`
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.paddingLeft = '40px'}
                    onMouseLeave={(e) => e.currentTarget.style.paddingLeft = '30px'}
                  >
                    <span style={{...bulletStyle, color: '#f59e0b'}}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Decorative Corner */}
              <div style={{
                position: 'absolute',
                bottom: '15px',
                right: '15px',
                width: '60px',
                height: '60px',
                border: '3px solid',
                borderColor: 'transparent #fef3c7 #fef3c7 transparent',
                borderRadius: '0 0 15px 0',
                opacity: '0.5'
              }}></div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div
          id="values-section"
          className="animate-on-scroll text-center"
          style={{
            opacity: isVisible['values-section'] ? 1 : 0,
            transform: isVisible['values-section'] ? 'translateY(0)' : 'translateY(60px)',
            transition: 'all 0.8s ease 400ms'
          }}
        >
          <h4 style={{
            fontSize: '2.2rem',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '50px',
            fontFamily: 'Georgia, serif'
          }}>
            Our Core Values
          </h4>
          
          <div className="row g-4">
            {[
              { icon: '🧘', title: 'Authenticity', desc: 'Traditional wisdom meets modern needs' },
              { icon: '🤝', title: 'Trust', desc: 'Building lasting relationships with clients' },
              { icon: '💡', title: 'Innovation', desc: 'Evolving Vastu for contemporary lifestyles' },
              { icon: '🌱', title: 'Growth', desc: 'Continuous learning and improvement' }
            ].map((value, idx) => (
              <div key={idx} className="col-sm-6 col-lg-3">
                <div
                  style={{
                    ...valueCardStyle,
                    opacity: isVisible['values-section'] ? 1 : 0,
                    transform: isVisible['values-section'] ? 'scale(1)' : 'scale(0.8)',
                    transition: `all 0.5s ease ${idx * 100 + 500}ms`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.borderColor = '#ec4899';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(236, 72, 153, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#fce7f3';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <div style={{fontSize: '3rem', marginBottom: '15px'}}>{value.icon}</div>
                  <h5 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '10px'
                  }}>
                    {value.title}
                  </h5>
                  <p style={{color: '#666', fontSize: '0.95rem', margin: '0'}}>
                    {value.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}