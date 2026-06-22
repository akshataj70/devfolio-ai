/**
 * portfolioHelpers.js
 * Generates a fully self-contained HTML portfolio file.
 * No backend required — all CSS is inline, data is embedded.
 */

// ─── Theme style maps ──────────────────────────────────────────────────────
const THEME_STYLES = {
  developer: {
    bg: '#0a0a0a',
    surface: '#111111',
    card: '#1a1a1a',
    border: '#2a2a2a',
    text: '#f1f5f9',
    muted: '#64748b',
    accent: '#6366f1',
    accentLight: 'rgba(99,102,241,0.15)',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
    font: "'JetBrains Mono', 'Fira Code', monospace",
    bodyFont: "'Inter', system-ui, sans-serif",
  },
  minimal: {
    bg: '#ffffff',
    surface: '#f8fafc',
    card: '#f1f5f9',
    border: '#e2e8f0',
    text: '#0f172a',
    muted: '#64748b',
    accent: '#334155',
    accentLight: 'rgba(51,65,85,0.08)',
    gradient: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    font: "'Playfair Display', Georgia, serif",
    bodyFont: "'Inter', system-ui, sans-serif",
  },
  creative: {
    bg: '#1e0a3c',
    surface: 'rgba(255,255,255,0.05)',
    card: 'rgba(255,255,255,0.08)',
    border: 'rgba(255,255,255,0.15)',
    text: '#ffffff',
    muted: '#c4b5fd',
    accent: '#a78bfa',
    accentLight: 'rgba(167,139,250,0.2)',
    gradient: 'linear-gradient(135deg, #1e0a3c 0%, #3b0764 50%, #1e0a3c 100%)',
    font: "'Syne', 'Outfit', sans-serif",
    bodyFont: "'Inter', system-ui, sans-serif",
  },
  professional: {
    bg: '#0f172a',
    surface: '#1e293b',
    card: '#1e293b',
    border: '#334155',
    text: '#f8fafc',
    muted: '#94a3b8',
    accent: '#06b6d4',
    accentLight: 'rgba(6,182,212,0.15)',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    font: "'Inter', system-ui, sans-serif",
    bodyFont: "'Inter', system-ui, sans-serif",
  },
};

// ─── Helpers ───────────────────────────────────────────────────────────────
const esc = (str) => String(str || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const safe = (val, fallback = '') => val || fallback;

const formatDate = (d) => {
  if (!d) return '';
  if (d.toLowerCase() === 'present') return 'Present';
  const [year, month] = d.split('-');
  if (!month) return year;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
};

// ─── Section HTML builders ─────────────────────────────────────────────────
const buildHero = (p, s) => `
<section class="hero-section">
  <div class="hero-inner">
    ${p.photo ? `<img src="${esc(p.photo)}" alt="${esc(p.firstName)}" class="hero-photo" />` : ''}
    <div class="hero-content">
      <h1 class="hero-name">${esc(p.firstName)} ${esc(p.lastName)}</h1>
      <p class="hero-title" style="color:${s.accent}">${esc(p.title)}</p>
      <div class="hero-meta">
        ${p.location ? `<span>📍 ${esc(p.location)}</span>` : ''}
        ${p.email ? `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a>` : ''}
        ${p.phone ? `<span>${esc(p.phone)}</span>` : ''}
      </div>
      <div class="hero-links">
        ${p.github ? `<a href="https://${esc(p.github)}" target="_blank" rel="noopener">GitHub ↗</a>` : ''}
        ${p.linkedin ? `<a href="https://${esc(p.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>` : ''}
        ${p.website ? `<a href="https://${esc(p.website)}" target="_blank" rel="noopener">Website ↗</a>` : ''}
      </div>
    </div>
  </div>
</section>`;

const buildAbout = (summary, s) =>
  summary ? `<section class="section"><h2 class="section-title" style="color:${s.accent}">About</h2><p class="about-text">${esc(summary)}</p></section>` : '';

const buildSkills = (skills, s) =>
  skills?.length ? `
<section class="section">
  <h2 class="section-title" style="color:${s.accent}">Skills</h2>
  <div class="skills-grid">
    ${skills.map(sk => `<span class="skill-badge" style="background:${s.accentLight};color:${s.accent}">${esc(sk)}</span>`).join('')}
  </div>
</section>` : '';

const buildExperience = (exp, s) =>
  exp?.length ? `
<section class="section">
  <h2 class="section-title" style="color:${s.accent}">Experience</h2>
  <div class="timeline">
    ${exp.map(e => `
    <div class="card">
      <div class="card-header">
        <div>
          <h3 class="card-title">${esc(e.role)}</h3>
          <p class="card-sub">${esc(e.company)}${e.location ? ` · ${esc(e.location)}` : ''}</p>
        </div>
        <span class="card-date">${formatDate(e.startDate)} – ${formatDate(e.endDate)}</span>
      </div>
      ${e.description ? `<p class="card-body">${esc(e.description)}</p>` : ''}
    </div>`).join('')}
  </div>
</section>` : '';

const buildProjects = (projects, s) =>
  projects?.length ? `
<section class="section">
  <h2 class="section-title" style="color:${s.accent}">Projects</h2>
  <div class="project-grid">
    ${projects.map(p => `
    <div class="card project-card">
      <h3 class="card-title">${esc(p.name)}</h3>
      <p class="card-body">${esc(p.description)}</p>
      ${p.techStack?.length ? `<div class="tech-tags">${p.techStack.map(t => `<span class="tech-badge" style="background:${s.accentLight};color:${s.accent}">${esc(t)}</span>`).join('')}</div>` : ''}
      <div class="project-links">
        ${p.github ? `<a href="https://${esc(p.github)}" target="_blank" rel="noopener" style="color:${s.accent}">GitHub ↗</a>` : ''}
        ${p.liveDemo ? `<a href="https://${esc(p.liveDemo)}" target="_blank" rel="noopener" style="color:${s.accent}">Live Demo ↗</a>` : ''}
      </div>
    </div>`).join('')}
  </div>
</section>` : '';

const buildEducation = (edu, s) =>
  edu?.length ? `
<section class="section">
  <h2 class="section-title" style="color:${s.accent}">Education</h2>
  <div class="timeline">
    ${edu.map(e => `
    <div class="card">
      <div class="card-header">
        <div>
          <h3 class="card-title">${esc(e.degree)}</h3>
          <p class="card-sub">${esc(e.institution)}</p>
        </div>
        <div style="text-align:right">
          <span class="card-date">${formatDate(e.startDate)} – ${formatDate(e.endDate)}</span>
          ${e.gpa ? `<p class="card-date">GPA: ${esc(e.gpa)}</p>` : ''}
        </div>
      </div>
    </div>`).join('')}
  </div>
</section>` : '';

const buildCertifications = (certs, s) =>
  certs?.length ? `
<section class="section">
  <h2 class="section-title" style="color:${s.accent}">Certifications</h2>
  <div class="cert-grid">
    ${certs.map(c => `
    <div class="card cert-card">
      <h3 class="card-title">${esc(c.name)}</h3>
      <p class="card-sub">${esc(c.issuer)}${c.date ? ` · ${formatDate(c.date)}` : ''}</p>
    </div>`).join('')}
  </div>
</section>` : '';

const buildLanguages = (langs, s) =>
  langs?.length ? `
<section class="section">
  <h2 class="section-title" style="color:${s.accent}">Languages</h2>
  <div class="skills-grid">
    ${langs.map(l => {
      const name = typeof l === 'string' ? l : (l.language || '');
      const prof = typeof l === 'string' ? '' : (l.proficiency || '');
      return `<span class="skill-badge" style="background:${s.accentLight};color:${s.accent}">${esc(name)}${prof ? ` · ${esc(prof)}` : ''}</span>`;
    }).join('')}
  </div>
</section>` : '';

const buildFooter = (p, s) => `
<footer class="footer">
  <div class="footer-links">
    ${p.linkedin ? `<a href="https://${esc(p.linkedin)}" target="_blank" rel="noopener" style="color:${s.accent}">LinkedIn</a>` : ''}
    ${p.github ? `<a href="https://${esc(p.github)}" target="_blank" rel="noopener" style="color:${s.accent}">GitHub</a>` : ''}
    ${p.website ? `<a href="https://${esc(p.website)}" target="_blank" rel="noopener" style="color:${s.accent}">Website</a>` : ''}
  </div>
  <p class="footer-copy">© ${new Date().getFullYear()} ${esc(p.firstName)} ${esc(p.lastName)} · Built with Devfolio AI</p>
</footer>`;

// ─── CSS ───────────────────────────────────────────────────────────────────
const buildCSS = (s) => `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: ${s.bg};
  color: ${s.text};
  font-family: ${s.bodyFont};
  line-height: 1.7;
  min-height: 100vh;
}
a { color: ${s.accent}; text-decoration: none; }
a:hover { text-decoration: underline; }

.container { max-width: 860px; margin: 0 auto; padding: 0 24px; }

/* Hero */
.hero-section {
  padding: 80px 0 64px;
  border-bottom: 1px solid ${s.border};
  background: ${s.gradient};
}
.hero-inner { max-width: 860px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 40px; }
.hero-photo { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid ${s.accent}; flex-shrink: 0; }
.hero-name { font-family: ${s.font}; font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; letter-spacing: -0.02em; }
.hero-title { font-size: 1.125rem; margin-top: 6px; font-weight: 500; }
.hero-meta { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 16px; font-size: 0.875rem; color: ${s.muted}; }
.hero-links { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 20px; }
.hero-links a {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 8px;
  background: ${s.accentLight}; color: ${s.accent};
  font-size: 0.875rem; font-weight: 500; border: 1px solid ${s.border};
  transition: opacity 0.2s;
}
.hero-links a:hover { opacity: 0.8; text-decoration: none; }

/* Sections */
.section { padding: 56px 0; border-bottom: 1px solid ${s.border}; }
.section:last-of-type { border-bottom: none; }
.section-title {
  font-family: ${s.font}; font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 28px;
}
.about-text { font-size: 1rem; color: ${s.muted}; max-width: 680px; line-height: 1.8; }

/* Skills */
.skills-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.skill-badge {
  padding: 6px 14px; border-radius: 100px;
  font-size: 0.8125rem; font-weight: 500;
}

/* Cards */
.timeline { display: flex; flex-direction: column; gap: 16px; }
.card {
  padding: 20px 24px; border-radius: 12px;
  background: ${s.card}; border: 1px solid ${s.border};
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
.card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
.card-title { font-size: 1rem; font-weight: 600; }
.card-sub { font-size: 0.875rem; color: ${s.muted}; margin-top: 2px; }
.card-date { font-size: 0.8125rem; color: ${s.muted}; white-space: nowrap; }
.card-body { font-size: 0.875rem; color: ${s.muted}; margin-top: 10px; line-height: 1.7; }

/* Projects */
.project-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.project-card { display: flex; flex-direction: column; }
.tech-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
.tech-badge { padding: 3px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 500; }
.project-links { display: flex; gap: 16px; margin-top: 14px; font-size: 0.875rem; font-weight: 500; }

/* Certifications */
.cert-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
.cert-card { padding: 16px 20px; }

/* Footer */
.footer { padding: 48px 0 32px; text-align: center; border-top: 1px solid ${s.border}; }
.footer-links { display: flex; justify-content: center; gap: 24px; margin-bottom: 16px; font-size: 0.875rem; }
.footer-copy { font-size: 0.8125rem; color: ${s.muted}; }

/* Responsive */
@media (max-width: 640px) {
  .hero-inner { flex-direction: column; text-align: center; }
  .hero-meta, .hero-links { justify-content: center; }
  .card-header { flex-direction: column; gap: 4px; }
  .project-grid { grid-template-columns: 1fr; }
}
`;

// ─── Main export ───────────────────────────────────────────────────────────
export const generatePortfolioHTML = (resumeData, portfolioSettings) => {
  const theme = portfolioSettings?.theme || 'developer';
  const s = THEME_STYLES[theme] || THEME_STYLES.developer;
  const vis = portfolioSettings?.visibleSections || {};
  const p = resumeData.personal || {};

  const sections = [
    vis.hero !== false ? buildHero(p, s) : '',
    vis.about !== false ? buildAbout(p.summary, s) : '',
    vis.skills !== false ? buildSkills(resumeData.skills, s) : '',
    vis.experience !== false ? buildExperience(resumeData.experience, s) : '',
    vis.projects !== false ? buildProjects(resumeData.projects, s) : '',
    vis.education !== false ? buildEducation(resumeData.education, s) : '',
    vis.certifications !== false ? buildCertifications(resumeData.certifications, s) : '',
    vis.languages !== false ? buildLanguages(resumeData.languages, s) : '',
    buildFooter(p, s),
  ].filter(Boolean).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(p.firstName)} ${esc(p.lastName)} – Portfolio</title>
  <meta name="description" content="${esc(p.summary?.slice(0, 155) || `${p.firstName} ${p.lastName} – Professional Portfolio`)}" />
  <style>${buildCSS(s)}</style>
</head>
<body>
  <div class="container">
    ${sections}
  </div>
</body>
</html>`;
};
