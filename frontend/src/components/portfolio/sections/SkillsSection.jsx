import React from 'react';

const SkillsSection = ({ data, tokens, animate }) => {
  const skills = data?.skills || [];
  const style = tokens?.style || 'tech';

  const renderSkills = () => {
    switch(style) {
      case 'tech':
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((skill, idx) => (
              <span key={idx} style={{ 
                display: 'inline-block', 
                background: tokens?.surface || '#ffffff', 
                padding: '6px 16px', 
                borderRadius: '4px', 
                fontSize: '13px', 
                fontWeight: '500', 
                color: tokens?.text || '#1e1b4b',
                border: `1px solid ${tokens?.border || '#e2e8f0'}`,
                fontFamily: "'JetBrains Mono', monospace"
              }}>
                {typeof skill === 'string' ? skill : skill?.name || skill?.skill || ''}
              </span>
            ))}
          </div>
        );

      case 'editorial':
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
            {skills.map((skill, idx) => (
              <span key={idx} style={{ 
                display: 'inline-block', 
                background: 'transparent', 
                padding: '4px 12px', 
                fontSize: '15px', 
                fontWeight: '300', 
                color: tokens?.muted || '#6b7280',
                letterSpacing: '0.5px'
              }}>
                {typeof skill === 'string' ? skill : skill?.name || skill?.skill || ''}
              </span>
            ))}
          </div>
        );

      case 'artistic':
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((skill, idx) => (
              <span key={idx} style={{ 
                display: 'inline-block', 
                background: tokens?.accentLight || 'rgba(217,70,239,0.1)', 
                padding: '8px 20px', 
                borderRadius: '40px', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: tokens?.accent || '#d946ef',
                border: `1px solid ${tokens?.border || '#fbcfe8'}`,
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}>
                {typeof skill === 'string' ? skill : skill?.name || skill?.skill || ''}
              </span>
            ))}
          </div>
        );

      case 'corporate':
      default:
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((skill, idx) => (
              <span key={idx} style={{ 
                display: 'inline-block', 
                background: tokens?.surface || '#ffffff', 
                padding: '6px 16px', 
                borderRadius: '20px', 
                fontSize: '13px', 
                fontWeight: '500', 
                color: tokens?.text || '#1e3a8a',
                border: `1px solid ${tokens?.border || '#bfdbfe'}`
              }}>
                {typeof skill === 'string' ? skill : skill?.name || skill?.skill || ''}
              </span>
            ))}
          </div>
        );
    }
  };

  return (
    <section style={{ padding: '60px 0', borderBottom: `1px solid ${tokens?.border || '#e2e8f0'}` }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div >
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '3px', color: tokens?.accent || '#7c3aed', fontWeight: '600', marginBottom: '8px' }}>
            {style === 'artistic' ? '⚡ Skills' : 'Skills'}
          </p>
          {style !== 'editorial' && <h2 style={{ fontSize: '28px', fontWeight: '700', color: tokens?.text || '#1e1b4b', marginBottom: '16px' }}>My toolkit</h2>}
          {renderSkills()}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;