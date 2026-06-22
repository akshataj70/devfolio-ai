import React from 'react';

const HeroSection = ({ data, tokens, animate }) => {
  const firstName = data?.personal?.firstName || 'Your Name';
  const title = data?.personal?.title || 'Developer & Creator';
  const bio = data?.personal?.summary || data?.personal?.bio || 'Building digital experiences.';
  const style = tokens?.style || 'tech';
  const anim = tokens?.animation || 'fade-glow';

  // ── Shared container ──
  const containerStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 24px',
    position: 'relative',
    zIndex: 1,
    width: '100%',
  };

  // ── Animation keyframes for each type ──
  const animationKeyframes = {
    'fade-rotate': `
      @keyframes heroAnim {
        0% { opacity: 0; transform: translateY(30px) rotate(-2deg); }
        100% { opacity: 1; transform: translateY(0) rotate(0); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
    `,
    'slide-left': `
      @keyframes heroAnim {
        0% { opacity: 0; transform: translateX(-60px); }
        100% { opacity: 1; transform: translateX(0); }
      }
      @keyframes float {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(-4px); }
      }
    `,
    'scale-bounce': `
      @keyframes heroAnim {
        0% { opacity: 0; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.05); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-6px) scale(1.02); }
      }
    `,
    'fade-glow': `
      @keyframes heroAnim {
        0% { opacity: 0; filter: drop-shadow(0 0 0px rgba(99,102,241,0)); }
        100% { opacity: 1; filter: drop-shadow(0 8px 20px rgba(99,102,241,0.15)); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
      }
    `,
  };

  const keyframes = animationKeyframes[anim] || animationKeyframes['fade-glow'];

  // ── Animation style for the heading ──
  const headingAnimStyle = {
    animation: 'heroAnim 0.9s ease forwards',
    opacity: 0, // start hidden
  };

  // ── RENDER BY STYLE ──
  switch (style) {
    // ──────────── TECH (Developer) ────────────
    case 'tech':
      return (
        <section style={{
          background: tokens?.heroBg || '#0a0a0a',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
          padding: '40px 0',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <style>{keyframes}</style>
          <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: 'float 4s ease-in-out infinite',
          }} />
          <div style={containerStyle}>
            <div className="fade-in-load">
              <div style={{
                display: 'inline-block',
                background: tokens?.accentLight || 'rgba(124,58,237,0.1)',
                color: tokens?.accent || '#7c3aed',
                padding: '2px 14px',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: '600',
                border: `1px solid ${tokens?.accent}40`,
                marginBottom: '10px',
                fontFamily: "'JetBrains Mono', monospace",
                animation: 'float 3s ease-in-out infinite',
              }}>
                &lt;portfolio /&gt;
              </div>
              <h1 style={{
                fontSize: '36px',
                fontWeight: '800',
                color: tokens?.text || '#1e1b4b',
                lineHeight: '1.15',
                ...headingAnimStyle,
              }}>
                Hi, I'm <span style={{
                  background: tokens?.accentGradient || 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>{firstName}</span>
              </h1>
              <p style={{
                fontSize: '16px',
                color: tokens?.muted || '#4c1d95',
                marginTop: '4px',
                fontWeight: '500',
                opacity: 0,
                animation: 'heroAnim 0.9s ease 0.2s forwards',
              }}>
                {title}
              </p>
              <p style={{
                marginTop: '10px',
                color: tokens?.muted || '#4c1d95',
                maxWidth: '450px',
                fontSize: '15px',
                opacity: 0.8,
                lineHeight: '1.5',
                opacity: 0,
                animation: 'heroAnim 0.9s ease 0.4s forwards',
              }}>
                {bio}
              </p>
            </div>
          </div>
        </section>
      );

    // ──────────── EDITORIAL (Minimal) ────────────
    case 'editorial':
      return (
        <section style={{
          background: tokens?.heroBg || '#fafafa',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          padding: '40px 0',
          position: 'relative',
        }}>
          <style>{keyframes}</style>
          <div style={containerStyle}>
            <div className="fade-in-load">
              <p style={{
                fontSize: '12px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: tokens?.muted || '#6b7280',
                marginBottom: '12px',
                fontWeight: '600',
                opacity: 0,
                animation: 'heroAnim 0.9s ease forwards',
              }}>Introducing</p>
              <h1 style={{
                fontSize: '48px',
                fontWeight: '800',
                color: tokens?.text || '#111827',
                letterSpacing: '-0.02em',
                lineHeight: '1.05',
                ...headingAnimStyle,
              }}>
                {firstName}
              </h1>
              <div style={{
                width: '60px',
                height: '3px',
                background: tokens?.accentGradient || 'linear-gradient(135deg, #2563eb, #3b82f6)',
                margin: '12px auto',
                borderRadius: '2px',
                opacity: 0,
                animation: 'heroAnim 0.9s ease 0.15s forwards',
              }} />
              <p style={{
                fontSize: '18px',
                fontWeight: '300',
                color: tokens?.muted || '#6b7280',
                maxWidth: '450px',
                margin: '0 auto',
                opacity: 0,
                animation: 'heroAnim 0.9s ease 0.3s forwards',
              }}>
                {title}
              </p>
              <p style={{
                marginTop: '12px',
                color: tokens?.muted || '#6b7280',
                maxWidth: '450px',
                margin: '12px auto 0',
                fontSize: '15px',
                opacity: 0,
                animation: 'heroAnim 0.9s ease 0.45s forwards',
              }}>
                {bio}
              </p>
            </div>
          </div>
        </section>
      );

    // ──────────── ARTISTIC (Creative) ────────────
    case 'artistic':
      return (
        <section style={{
          background: tokens?.heroBg || 'linear-gradient(135deg, #fae8ff, #fce7f3)',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
          padding: '40px 0',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <style>{keyframes}</style>
          <div style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(217,70,239,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: 'float 6s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: 'float 8s ease-in-out infinite reverse',
          }} />
          <div style={{ 
            ...containerStyle,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            alignItems: 'center',
          }}>
            <div className="fade-in-load">
              <div style={{
                display: 'inline-block',
                background: tokens?.accentLight || 'rgba(217,70,239,0.1)',
                color: tokens?.accent || '#d946ef',
                padding: '2px 14px',
                borderRadius: '30px',
                fontSize: '12px',
                fontWeight: '600',
                border: `1px solid ${tokens?.accent}40`,
                marginBottom: '10px',
                opacity: 0,
                animation: 'heroAnim 0.9s ease forwards, float 3s ease-in-out 0.9s infinite',
              }}>
                ✦ Creative
              </div>
              <h1 style={{
                fontSize: '36px',
                fontWeight: '800',
                color: tokens?.text || '#4c1d95',
                lineHeight: '1.15',
                ...headingAnimStyle,
              }}>
                {firstName}
              </h1>
              <p style={{
                fontSize: '16px',
                color: tokens?.muted || '#7e22ce',
                marginTop: '4px',
                fontWeight: '500',
                opacity: 0,
                animation: 'heroAnim 0.9s ease 0.2s forwards',
              }}>
                {title}
              </p>
              <p style={{
                marginTop: '10px',
                color: tokens?.muted || '#7e22ce',
                maxWidth: '350px',
                fontSize: '14px',
                opacity: 0.8,
                lineHeight: '1.5',
                opacity: 0,
                animation: 'heroAnim 0.9s ease 0.4s forwards',
              }}>
                {bio}
              </p>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '80px',
              animation: 'float 4s ease-in-out infinite',
              filter: 'drop-shadow(0 10px 20px rgba(217,70,239,0.08))',
            }}>
              🎨
            </div>
          </div>
        </section>
      );

    // ──────────── CORPORATE (Professional) ────────────
    case 'corporate':
    default:
      return (
        <section style={{
          background: tokens?.heroBg || 'linear-gradient(135deg, #e0f2fe, #dbeafe)',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
          padding: '40px 0',
          position: 'relative',
        }}>
          <style>{keyframes}</style>
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '8%',
            width: '30px',
            height: '30px',
            background: tokens?.accentLight || 'rgba(37,99,235,0.05)',
            transform: 'rotate(45deg)',
            border: `1px solid ${tokens?.accent}20`,
            pointerEvents: 'none',
          }} />
          <div style={containerStyle}>
            <div className="fade-in-load">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '12px',
                opacity: 0,
                animation: 'heroAnim 0.9s ease forwards',
              }}>
                <div style={{
                  width: '30px',
                  height: '3px',
                  background: tokens?.accentGradient || 'linear-gradient(135deg, #1e3a8a, #4f46e5)',
                  borderRadius: '2px',
                }} />
                <span style={{
                  color: tokens?.muted || '#1e40af',
                  fontSize: '12px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>Portfolio</span>
              </div>
              <h1 style={{
                fontSize: '38px',
                fontWeight: '700',
                color: tokens?.text || '#1e3a8a',
                lineHeight: '1.1',
                maxWidth: '500px',
                ...headingAnimStyle,
              }}>
                {firstName}
              </h1>
              <p style={{
                fontSize: '16px',
                color: tokens?.muted || '#1e40af',
                marginTop: '4px',
                fontWeight: '400',
                opacity: 0,
                animation: 'heroAnim 0.9s ease 0.2s forwards',
              }}>
                {title}
              </p>
              <div style={{
                marginTop: '14px',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                opacity: 0,
                animation: 'heroAnim 0.9s ease 0.4s forwards',
              }}>
                <span style={{
                  background: tokens?.accentLight || 'rgba(37,99,235,0.06)',
                  color: tokens?.accent || '#2563eb',
                  padding: '4px 16px',
                  borderRadius: '30px',
                  fontSize: '13px',
                  fontWeight: '500',
                  border: `1px solid ${tokens?.accent}20`,
                }}>
                  ✦ {bio.split(' ').slice(0, 4).join(' ')}...
                </span>
              </div>
            </div>
          </div>
        </section>
      );
  }
};

export default HeroSection;