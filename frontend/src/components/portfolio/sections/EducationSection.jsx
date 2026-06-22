import React from 'react';

const EducationSection = ({ data, tokens, animate }) => {
  const educations = data?.education || [];
  const style = tokens?.style || 'tech';

  const renderEducation = () => {
    switch(style) {
      case 'tech':
        return educations.map((edu, idx) => (
          <div key={idx} style={{ display: 'inline-block', background: tokens?.surface || '#ffffff', padding: '12px 20px', borderRadius: '8px', margin: '4px 8px 4px 0', border: `1px solid ${tokens?.border || '#e2e8f0'}` }}>
            <h4 style={{ fontSize: '15px', fontWeight: '600', color: tokens?.text || '#1e1b4b' }}>{edu.degree || 'Degree'}</h4>
            <p style={{ fontSize: '13px', color: tokens?.muted || '#4c1d95' }}>{edu.institution || 'Institution'}</p>
            <p style={{ fontSize: '12px', color: tokens?.muted, opacity: 0.6 }}>{edu.startDate || ''} - {edu.endDate || ''}</p>
          </div>
        ));

      case 'editorial':
        return educations.map((edu, idx) => (
          <div key={idx} style={{ padding: '12px 0', borderBottom: idx < educations.length - 1 ? `1px solid ${tokens?.border || '#e5e7eb'}` : 'none' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '400', color: tokens?.text || '#111827' }}>{edu.degree || 'Degree'}</h4>
            <p style={{ fontSize: '14px', color: tokens?.muted || '#6b7280' }}>{edu.institution || 'Institution'} · {edu.startDate || ''} - {edu.endDate || ''}</p>
          </div>
        ));

      case 'artistic':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {educations.map((edu, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.6)', padding: '14px 18px', borderRadius: '16px', border: `1px solid ${tokens?.border || '#fbcfe8'}` }}>
                <div style={{ fontSize: '24px' }}>🎓</div>
                <h4 style={{ fontSize: '15px', fontWeight: '600', color: tokens?.text || '#4c1d95', marginTop: '4px' }}>{edu.degree || 'Degree'}</h4>
                <p style={{ fontSize: '13px', color: tokens?.muted || '#7e22ce' }}>{edu.institution || 'Institution'}</p>
                <p style={{ fontSize: '12px', color: tokens?.muted, opacity: 0.6 }}>{edu.startDate || ''} - {edu.endDate || ''}</p>
              </div>
            ))}
          </div>
        );

      case 'corporate':
      default:
        return educations.map((edu, idx) => (
          <div key={idx} style={{ background: tokens?.surface || '#ffffff', padding: '16px 20px', borderRadius: '8px', marginBottom: '12px', border: `1px solid ${tokens?.border || '#bfdbfe'}` }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: tokens?.text || '#1e3a8a' }}>{edu.degree || 'Degree'}</h4>
            <p style={{ fontSize: '14px', color: tokens?.muted || '#1e40af' }}>{edu.institution || 'Institution'}</p>
            <p style={{ fontSize: '13px', color: tokens?.muted, marginTop: '4px' }}>{edu.startDate || ''} - {edu.endDate || ''}</p>
          </div>
        ));
    }
  };

  return (
    <section style={{ padding: '60px 0', borderBottom: `1px solid ${tokens?.border || '#e2e8f0'}` }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div >
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '3px', color: tokens?.accent || '#7c3aed', fontWeight: '600', marginBottom: '8px' }}>
            {style === 'artistic' ? '📚 Education' : 'Education'}
          </p>
          {style !== 'editorial' && <h2 style={{ fontSize: '28px', fontWeight: '700', color: tokens?.text || '#1e1b4b', marginBottom: '20px' }}>My learning journey</h2>}
          {renderEducation()}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;