import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const FreightAnalystTemplate = ({ data, theme, accentColor }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: 'Helvetica',
      backgroundColor: '#FFFFFF',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1a1a1a',
      marginBottom: 4,
    },
    title: {
      fontSize: 14,
      color: '#4a4a4a',
      marginBottom: 6,
    },
    address: {
      fontSize: 10,
      color: '#4a4a4a',
      marginBottom: 2,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#1a1a1a',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginTop: 16,
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
      paddingBottom: 4,
    },
    text: {
      fontSize: 10,
      color: '#333333',
      lineHeight: 1.6,
    },
    experienceItem: {
      marginBottom: 14,
    },
    experienceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
    },
    role: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#1a1a1a',
    },
    company: {
      fontSize: 10,
      color: '#4a4a4a',
    },
    date: {
      fontSize: 9,
      color: '#888888',
    },
    bullet: {
      fontSize: 9,
      color: '#333333',
      marginBottom: 2,
      paddingLeft: 12,
    },
    boldBullet: {
      fontSize: 9,
      color: '#1a1a1a',
      fontWeight: 'bold',
      marginBottom: 2,
      paddingLeft: 12,
    },
    educationItem: {
      marginBottom: 8,
    },
    degree: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#1a1a1a',
    },
    institution: {
      fontSize: 10,
      color: '#4a4a4a',
    },
    eduDate: {
      fontSize: 9,
      color: '#888888',
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

  const getDisplayName = (item) => {
    if (typeof item === 'string') return item;
    if (item && typeof item === 'object') {
      return item.name || item.title || String(item);
    }
    return String(item);
  };

  const renderSection = (sectionId) => {
    if (theme.hiddenSections?.includes(sectionId)) return null;

    switch (sectionId) {
      case 'summary':
        if (!personal.summary) return null;
        return (
          <View key="summary" style={{ marginBottom: 12 }} wrap={false}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.text}>{personal.summary}</Text>
          </View>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <View key="experience" style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Experience</Text>
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
                  <Text style={styles.bullet}>• {exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        );

      case 'education':
        if (education.length === 0) return null;
        return (
          <View key="education" style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={styles.educationItem} wrap={false}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.degree}>{edu.degree || 'Degree'}</Text>
                    <Text style={styles.institution}>{edu.institution || 'Institution'}</Text>
                  </View>
                  <Text style={styles.eduDate}>
                    {edu.startDate || 'Start'} – {edu.endDate || 'End'}
                  </Text>
                </View>
                {edu.gpa && <Text style={styles.bullet}>GPA: {edu.gpa}</Text>}
              </View>
            ))}
          </View>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <View key="skills" style={{ marginBottom: 12 }} wrap={false}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {skills.map((skill, i) => (
              <Text key={i} style={styles.skillItem}>• {getDisplayName(skill)}</Text>
            ))}
          </View>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <View key="projects" style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={styles.experienceItem} wrap={false}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.role}>{proj.name || 'Project'}</Text>
                  <Text style={styles.date}>{proj.date || ''}</Text>
                </View>
                {proj.description && (
                  <Text style={styles.bullet}>• {proj.description}</Text>
                )}
              </View>
            ))}
          </View>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <View key="certifications" style={{ marginBottom: 12 }} wrap={false}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert, i) => (
              <View key={i} style={styles.educationItem}>
                <Text style={styles.degree}>{getDisplayName(cert)}</Text>
                {cert.issuer && <Text style={styles.institution}>{cert.issuer}</Text>}
                {cert.date && <Text style={styles.eduDate}>{cert.date}</Text>}
              </View>
            ))}
          </View>
        );

      case 'languages':
        if (languages.length === 0) return null;
        return (
          <View key="languages" style={{ marginBottom: 12 }} wrap={false}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {languages.map((lang, i) => (
              <Text key={i} style={styles.skillItem}>• {getDisplayName(lang)}</Text>
            ))}
          </View>
        );

      case 'achievements':
        if (achievements.length === 0) return null;
        return (
          <View key="achievements" style={{ marginBottom: 12 }} wrap={false}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            {achievements.map((ach, i) => (
              <Text key={i} style={styles.skillItem}>• {getDisplayName(ach)}</Text>
            ))}
          </View>
        );

      case 'interests':
        if (interests.length === 0) return null;
        return (
          <View key="interests" style={{ marginBottom: 12 }} wrap={false}>
            <Text style={styles.sectionTitle}>Interests</Text>
            {interests.map((interest, i) => (
              <Text key={i} style={styles.skillItem}>• {getDisplayName(interest)}</Text>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Page size="A4" style={styles.page} wrap>
      {/* Header */}
      <Text style={styles.name}>
        {personal.firstName || 'First'} {personal.lastName || 'Last'}
      </Text>
      <Text style={styles.title}>{personal.title || 'Professional Title'}</Text>
      <Text style={styles.address}>{personal.location || 'City, State'}</Text>
      <Text style={styles.address}>{personal.email || 'email@example.com'}</Text>
      <Text style={styles.address}>{personal.phone || 'Phone'}</Text>

      {/* Dynamic Sections */}
      {theme.sectionOrder.map((sectionId) => renderSection(sectionId))}
    </Page>
  );
};

export default FreightAnalystTemplate;