import React from 'react';

const ExperienceSection = ({ data, tokens, animate }) => {
  const experiences = data?.experience || [];
  const style = tokens?.style || 'tech';

  const renderExperience = () => {
    switch(style) {
      case 'tech':
        return (
          <div style={{ position: 'relative', paddingLeft: '24px' }}>
            <div style={{ position: 'absolute', left: '4px', top: '8px', bottom: '8px', width: '2px', background: tokens?.accent || '#7c3aed', opacity: 0.3 }} />
            {experiences.map((exp, idx) => (
              <div key={idx} style={{ marginBottom: '24px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-20px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', background: tokens?.accent || '#7c3aed' }} />
                <h4 style={{ fontSize: '17px', fontWeight: '600', color: tokens?.text || '#1e1b4b' }}>{exp.role || 'Role'} @ {exp.company || 'Company'}</h4>
                <p style={{ fontSize: '13px', color: tokens?.muted || '#4c1d95', marginTop: '2px' }}>{exp.startDate || ''} - {exp.endDate || 'Present'} · {exp.location || ''}</p>
                <p style={{ fontSize: '14px', color: tokens?.muted, marginTop: '6px', opacity: 0.8 }}>{exp.description || 'Worked on amazing projects.'}</p>
              </div>
            ))}
          </div>
        );

      case 'editorial':
        return experiences.map((exp, idx) => (
          <div key={idx} style={{ padding: '16px 0', borderBottom: idx < experiences.length - 1 ? `1px solid ${tokens?.border || '#e5e7eb'}` : 'none' }}>
            <h4 style={{ fontSize: '17px', fontWeight: '500', color: tokens?.text || '#111827' }}>{exp.role || 'Role'}</h4>
            <p style={{ fontSize: '14px', color: tokens?.muted || '#6b7280', marginTop: '2px' }}>{exp.company || 'Company'} · {exp.location || ''}</p>
            <p style={{ fontSize: '14px', color: tokens?.muted, marginTop: '4px', opacity: 0.7 }}>{exp.startDate || ''} - {exp.endDate || 'Present'}</p>
            <p style={{ fontSize: '15px', color: tokens?.muted, marginTop: '6px' }}>{exp.description || ''}</p>
          </div>
        ));

      case 'artistic':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {experiences.map((exp, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.6)', padding: '16px 20px', borderRadius: '20px', border: `1px solid ${tokens?.border || '#fbcfe8'}` }}>
                <div style={{ fontSize: '28px', marginBottom: '4px' }}>💼</div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: tokens?.text || '#4c1d95' }}>{exp.role || 'Role'}</h4>
                <p style={{ fontSize: '13px', color: tokens?.muted || '#7e22ce' }}>{exp.company || 'Company'}</p>
                <p style={{ fontSize: '12px', color: tokens?.muted, opacity: 0.6 }}>{exp.startDate || ''} - {exp.endDate || 'Present'}</p>
              </div>
            ))}
          </div>
        );

      case 'corporate':
      default:
        return experiences.map((exp, idx) => (
          <div key={idx} style={{ background: tokens?.surface || '#ffffff', padding: '16px 20px', borderRadius: '12px', marginBottom: '12px', border: `1px solid ${tokens?.border || '#bfdbfe'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: tokens?.text || '#1e3a8a' }}>{exp.role || 'Role'}</h4>
                <p style={{ fontSize: '14px', color: tokens?.muted || '#1e40af' }}>{exp.company || 'Company'} · {exp.location || ''}</p>
              </div>
              <span style={{ fontSize: '13px', color: tokens?.accent || '#2563eb', background: tokens?.accentLight || 'rgba(37,99,235,0.06)', padding: '2px 12px', borderRadius: '20px' }}>
                {exp.startDate || ''} - {exp.endDate || 'Present'}
              </span>
            </div>
            <p style={{ fontSize: '14px', color: tokens?.muted, marginTop: '8px' }}>{exp.description || ''}</p>
          </div>
        ));
    }
  };

  return (
    <section style={{ padding: '60px 0', borderBottom: `1px solid ${tokens?.border || '#e2e8f0'}` }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div >
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '3px', color: tokens?.accent || '#7c3aed', fontWeight: '600', marginBottom: '8px' }}>
            {style === 'artistic' ? '💼 Experience' : 'Experience'}
          </p>
          {style !== 'editorial' && <h2 style={{ fontSize: '28px', fontWeight: '700', color: tokens?.text || '#1e1b4b', marginBottom: '20px' }}>Where I've worked</h2>}
          {renderExperience()}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;