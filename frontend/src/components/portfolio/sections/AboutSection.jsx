import React from 'react';

// ─── Shared SectionTitle Component ─────────────────────────────
export const SectionTitle = ({ title, subtitle, tokens }) => (
  <div className="section-header">
    <p style={{
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '3px',
      color: tokens?.accent || '#7c3aed',
      fontWeight: '600',
      marginBottom: '4px'
    }}>
      {title}
    </p>
    <h2 style={{
      fontSize: '28px',
      fontWeight: '700',
      color: tokens?.text || '#1e1b4b',
      marginBottom: '12px'
    }}>
      {subtitle}
    </h2>
  </div>
);

// ─── Main AboutSection Component ──────────────────────────────
const AboutSection = ({ data, tokens, animate }) => {
  const bio = data?.personal?.summary || data?.about?.description || 'Passionate developer building amazing things.';
  const style = tokens?.style || 'tech';

  // ── Style configurations per theme ──
  const getStyles = () => {
    switch(style) {
      case 'tech':
        return {
          container: { 
            padding: '60px 0', 
            borderBottom: `1px solid ${tokens?.border || '#e2e8f0'}` 
          },
          badge: { 
            display: 'inline-block', 
            background: tokens?.accentLight, 
            color: tokens?.accent, 
            padding: '2px 12px', 
            borderRadius: '4px', 
            fontSize: '12px', 
            fontFamily: "'JetBrains Mono', monospace" 
          },
          heading: { 
            fontSize: '28px', 
            fontWeight: '700', 
            color: tokens?.text || '#1e1b4b', 
            marginBottom: '12px' 
          },
          text: { 
            fontSize: '16px', 
            color: tokens?.muted || '#4c1d95', 
            maxWidth: '600px', 
            lineHeight: '1.7' 
          }
        };
        
      case 'editorial':
        return {
          container: { 
            padding: '80px 0', 
            borderBottom: `1px solid ${tokens?.border || '#e5e7eb'}`, 
            textAlign: 'center' 
          },
          title: { 
            fontSize: '12px', 
            textTransform: 'uppercase', 
            letterSpacing: '6px', 
            color: tokens?.muted || '#6b7280', 
            fontWeight: '500', 
            marginBottom: '12px' 
          },
          heading: { 
            fontSize: '32px', 
            fontWeight: '300', 
            color: tokens?.text || '#111827', 
            marginBottom: '16px', 
            letterSpacing: '-0.02em' 
          },
          text: { 
            fontSize: '18px', 
            color: tokens?.muted || '#6b7280', 
            maxWidth: '600px', 
            margin: '0 auto', 
            lineHeight: '1.8', 
            fontWeight: '300' 
          }
        };
        
      case 'artistic':
        return {
          container: { 
            padding: '60px 0', 
            borderBottom: `2px dashed ${tokens?.border || '#fbcfe8'}` 
          },
          title: { 
            fontSize: '14px', 
            fontWeight: '600', 
            color: tokens?.accent || '#d946ef', 
            marginBottom: '4px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px' 
          },
          heading: { 
            fontSize: '26px', 
            fontWeight: '700', 
            color: tokens?.text || '#4c1d95', 
            marginBottom: '8px' 
          },
          text: { 
            fontSize: '17px', 
            color: tokens?.muted || '#7e22ce', 
            maxWidth: '500px', 
            lineHeight: '1.8', 
            fontStyle: 'italic', 
            padding: '16px 24px', 
            background: 'rgba(255,255,255,0.5)', 
            borderRadius: '16px' 
          }
        };
        
      case 'corporate':
      default:
        return {
          container: { 
            padding: '60px 0', 
            borderBottom: `1px solid ${tokens?.border || '#bfdbfe'}` 
          },
          title: { 
            fontSize: '12px', 
            textTransform: 'uppercase', 
            letterSpacing: '4px', 
            color: tokens?.muted || '#1e40af', 
            fontWeight: '600', 
            marginBottom: '8px' 
          },
          heading: { 
            fontSize: '28px', 
            fontWeight: '600', 
            color: tokens?.text || '#1e3a8a', 
            marginBottom: '12px' 
          },
          text: { 
            fontSize: '16px', 
            color: tokens?.muted || '#1e40af', 
            maxWidth: '700px', 
            lineHeight: '1.8' 
          }
        };
    }
  };

  const styles = getStyles();

  // ── Render the section ──
  return (
    <section style={styles.container}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div >
          
          {/* TECH THEME */}
          {style === 'tech' && (
            <>
              <div style={styles.badge}>// about me</div>
              <h2 style={styles.heading}>Who I am</h2>
              <p style={styles.text}>{bio}</p>
            </>
          )}
          
          {/* EDITORIAL THEME */}
          {style === 'editorial' && (
            <>
              <p style={styles.title}>About</p>
              <h2 style={styles.heading}>{bio}</h2>
              <p style={{ 
                ...styles.text, 
                fontSize: '15px', 
                color: tokens?.muted, 
                maxWidth: '400px', 
                margin: '0 auto' 
              }}>
                Building the future, one line of code at a time.
              </p>
            </>
          )}
          
          {/* ARTISTIC THEME */}
          {style === 'artistic' && (
            <>
              <p style={styles.title}>🎨 About</p>
              <h2 style={styles.heading}>My story</h2>
              <p style={styles.text}>"{bio}"</p>
            </>
          )}
          
          {/* CORPORATE THEME */}
          {style === 'corporate' && (
            <>
              <p style={styles.title}>About Me</p>
              <h2 style={styles.heading}>Who I am</h2>
              <p style={styles.text}>{bio}</p>
            </>
          )}
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;