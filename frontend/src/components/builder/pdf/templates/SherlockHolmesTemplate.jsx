import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const SherlockTemplate = ({ data, theme, accentColor }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      fontFamily: 'Helvetica',
    },
    sidebar: {
      width: '32%',
      backgroundColor: '#f5f0eb',
      padding: 25,
    },
    main: {
      width: '68%',
      padding: 25,
    },
    name: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#1a1a1a',
      marginBottom: 2,
    },
    title: {
      fontSize: 12,
      color: '#4a4a4a',
      marginBottom: 12,
    },
    address: {
      fontSize: 9,
      color: '#4a4a4a',
      marginBottom: 4,
    },
    sectionTitleSidebar: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#1a1a1a',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginTop: 14,
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
      paddingBottom: 3,
    },
    sectionTitleMain: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1a1a1a',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginTop: 16,
      marginBottom: 10,
      borderBottomWidth: 2,
      borderBottomColor: accentColor || '#8b5cf6',
      paddingBottom: 4,
    },
    text: {
      fontSize: 9,
      color: '#333333',
      lineHeight: 1.5,
    },
    sidebarText: {
      fontSize: 9,
      color: '#333333',
      lineHeight: 1.5,
      marginBottom: 4,
    },
    experienceItem: {
      marginBottom: 10,
    },
    experienceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
    },
    role: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#1a1a1a',
    },
    company: {
      fontSize: 9,
      color: '#4a4a4a',
    },
    date: {
      fontSize: 8,
      color: '#888888',
    },
    bullet: {
      fontSize: 9,
      color: '#333333',
      marginBottom: 2,
      paddingLeft: 10,
    },
    skillItem: {
      fontSize: 9,
      color: '#333333',
      marginBottom: 3,
    },
  });

  const personal = data?.personal || {};
  const skills = data?.skills || [];
  const experience = data?.experience || [];
  const education = data?.education || [];
  const projects = data?.projects || [];
  const certifications = data?.certifications || [];
  const languages = data?.languages || [];
  const achievements = data?.achievements || [];
  const interests = data?.interests || [];

  // ─── Helper to get display name from object or string ───
  const getDisplayName = (item) => {
    if (!item) return '';
    if (typeof item === 'string') return item;
    if (typeof item === 'object') {
      if (item.name) {
        if (item.proficiency) {
          return `${item.name} (${item.proficiency})`;
        }
        return item.name;
      }
      return item.title || String(item);
    }
    return String(item);
  };

  // ─── Render a section based on its ID ──────────────────
  const renderSection = (sectionId) => {
    if (theme.hiddenSections?.includes(sectionId)) return null;

    switch (sectionId) {
      case 'summary':
        if (!personal.summary) return null;
        return (
          <View key="summary" style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitleSidebar}>About Me</Text>
            <Text style={styles.sidebarText}>{personal.summary}</Text>
          </View>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <View key="skills" style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitleSidebar}>Skills</Text>
            {skills.map((skill, i) => (
              <Text key={i} style={styles.skillItem}>• {getDisplayName(skill)}</Text>
            ))}
          </View>
        );

      case 'languages':
        if (languages.length === 0) return null;
        return (
          <View key="languages" style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitleSidebar}>Languages</Text>
            {languages.map((lang, i) => (
              <Text key={i} style={styles.skillItem}>• {getDisplayName(lang)}</Text>
            ))}
          </View>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <View key="certifications" style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitleSidebar}>Certifications</Text>
            {certifications.map((cert, i) => (
              <Text key={i} style={styles.skillItem}>• {getDisplayName(cert)}</Text>
            ))}
          </View>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <View key="experience" style={{ marginBottom: 16 }}>
            <Text style={styles.sectionTitleMain}>Work Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={styles.experienceItem} wrap={false}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.role}>{exp.role || 'Role'}</Text>
                    <Text style={styles.company}>{exp.company || 'Company'}</Text>
                  </View>
                  <Text style={styles.date}>
                    {exp.startDate || 'Start'} – {exp.endDate || 'End'}
                  </Text>
                </View>
                {exp.description && (
                  <Text style={styles.bullet}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <View key="projects" style={{ marginBottom: 16 }}>
            <Text style={styles.sectionTitleMain}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={styles.experienceItem} wrap={false}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.role}>{proj.name || 'Project'}</Text>
                  <Text style={styles.date}>{proj.date || ''}</Text>
                </View>
                {proj.description && (
                  <Text style={styles.bullet}>{proj.description}</Text>
                )}
              </View>
            ))}
          </View>
        );

      case 'education':
        if (education.length === 0) return null;
        return (
          <View key="education" style={{ marginBottom: 16 }}>
            <Text style={styles.sectionTitleMain}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={styles.experienceItem} wrap={false}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.role}>{edu.degree || 'Degree'}</Text>
                    <Text style={styles.company}>{edu.institution || 'Institution'}</Text>
                  </View>
                  <Text style={styles.date}>
                    {edu.startDate || 'Start'} – {edu.endDate || 'End'}
                  </Text>
                </View>
                {edu.gpa && (
                  <Text style={styles.bullet}>GPA: {edu.gpa}</Text>
                )}
              </View>
            ))}
          </View>
        );

      // Optional: add achievements and interests if needed
      case 'achievements':
        if (achievements.length === 0) return null;
        return (
          <View key="achievements" style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitleSidebar}>Achievements</Text>
            {achievements.map((ach, i) => (
              <Text key={i} style={styles.skillItem}>• {getDisplayName(ach)}</Text>
            ))}
          </View>
        );

      case 'interests':
        if (interests.length === 0) return null;
        return (
          <View key="interests" style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitleSidebar}>Interests</Text>
            {interests.map((interest, i) => (
              <Text key={i} style={styles.skillItem}>• {getDisplayName(interest)}</Text>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  // ─── Sidebar sections ───
  const sidebarSectionIds = ['summary', 'skills', 'languages', 'certifications', 'achievements', 'interests'];
  const mainSectionIds = ['experience', 'projects', 'education'];

  return (
    <Page size="A4" style={styles.page} wrap>
      <View style={styles.sidebar}>
        <Text style={styles.name}>
          {personal.firstName || 'First'} {personal.lastName || 'Last'}
        </Text>
        <Text style={styles.title}>{personal.title || 'Professional Title'}</Text>
        <Text style={styles.address}>{personal.location || 'City, State'}</Text>
        <Text style={styles.address}>{personal.email || 'email@example.com'}</Text>
        <Text style={styles.address}>{personal.phone || 'Phone'}</Text>
        {personal.linkedin && <Text style={styles.address}>LinkedIn: {personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</Text>}
        {personal.github && <Text style={styles.address}>GitHub: {personal.github.replace(/^https?:\/\/(www\.)?/, '')}</Text>}
        {personal.website && <Text style={styles.address}>Website: {personal.website.replace(/^https?:\/\/(www\.)?/, '')}</Text>}

        {theme.sectionOrder
          .filter(id => sidebarSectionIds.includes(id))
          .map(id => renderSection(id))}
      </View>

      <View style={styles.main}>
        {theme.sectionOrder
          .filter(id => mainSectionIds.includes(id))
          .map(id => renderSection(id))}
      </View>
    </Page>
  );
};

export default SherlockTemplate;