import React from 'react';
import { SectionTitle } from './AboutSection';

const ProjectsSection = ({ data, tokens, animate }) => {
  const projects = data?.projects || [];
  const style = tokens?.style || 'tech';

  const renderProjects = () => {
    switch(style) {
      case 'tech':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {projects.map((project, idx) => (
              <div key={idx} style={{ 
                background: tokens?.surface || '#ffffff', 
                padding: '20px', 
                borderRadius: '8px', 
                border: `1px solid ${tokens?.border || '#e2e8f0'}`,
                transition: 'all 0.3s ease'
              }}>
                <h4 style={{ fontSize: '18px', fontWeight: '600', color: tokens?.text || '#1e1b4b' }}>{project.name || 'Project'}</h4>
                <p style={{ fontSize: '14px', color: tokens?.muted || '#4c1d95', marginTop: '6px' }}>{project.description || 'A cool project.'}</p>
              </div>
            ))}
          </div>
        );

      case 'editorial':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {projects.map((project, idx) => (
              <div key={idx} style={{ padding: '16px', borderBottom: `1px solid ${tokens?.border || '#e5e7eb'}` }}>
                <h4 style={{ fontSize: '17px', fontWeight: '400', color: tokens?.text || '#111827' }}>{project.name || 'Project'}</h4>
                <p style={{ fontSize: '14px', color: tokens?.muted || '#6b7280', marginTop: '4px' }}>{project.description || ''}</p>
              </div>
            ))}
          </div>
        );

      case 'artistic':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {projects.map((project, idx) => (
              <div key={idx} style={{ 
                background: 'rgba(255,255,255,0.6)', 
                padding: '18px 20px', 
                borderRadius: '24px', 
                border: `1px solid ${tokens?.border || '#fbcfe8'}`,
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '24px' }}>🚀</div>
                <h4 style={{ fontSize: '17px', fontWeight: '600', color: tokens?.text || '#4c1d95', marginTop: '4px' }}>{project.name || 'Project'}</h4>
                <p style={{ fontSize: '14px', color: tokens?.muted || '#7e22ce' }}>{project.description || ''}</p>
              </div>
            ))}
          </div>
        );

      case 'corporate':
      default:
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {projects.map((project, idx) => (
              <div key={idx} style={{ 
                background: tokens?.surface || '#ffffff', 
                padding: '18px 20px', 
                borderRadius: '12px', 
                border: `1px solid ${tokens?.border || '#bfdbfe'}`,
                transition: 'all 0.3s ease'
              }}>
                <h4 style={{ fontSize: '17px', fontWeight: '600', color: tokens?.text || '#1e3a8a' }}>{project.name || 'Project'}</h4>
                <p style={{ fontSize: '14px', color: tokens?.muted || '#1e40af', marginTop: '4px' }}>{project.description || ''}</p>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <section style={{ padding: '60px 0', borderBottom: `1px solid ${tokens?.border || '#e2e8f0'}` }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div >
          <SectionTitle 
            title={style === 'artistic' ? '🚀 Projects' : 'Projects'} 
            subtitle={style !== 'editorial' ? 'Work I\'m proud of' : ''} 
            tokens={tokens} 
          />
          {renderProjects()}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;