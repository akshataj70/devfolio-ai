import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const CustomerServiceTemplate = ({ data, theme, accentColor }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: 'Helvetica',
      backgroundColor: '#FFFFFF',
    },
    header: {
      textAlign: 'center',
      marginBottom: 16,
      borderBottomWidth: 2,
      borderBottomColor: accentColor || '#4a6cf7',
      paddingBottom: 10,
    },
    name: {
      fontSize: 26,
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
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1a1a1a',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginTop: 16,
      marginBottom: 6,
      borderBottomWidth: 1,
      borderBottomColor: '#dddddd',
      paddingBottom: 3,
    },
    text: {
      fontSize: 10,
      color: '#333333',
      lineHeight: 1.6,
    },
    experienceItem: {
      marginBottom: 12,
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
      fontWeight: 'bold',
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
    educationItem: {
      marginBottom: 6,
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
  });

  const personal = data?.personal || {};
  const skills = data?.skills || [];
  const experience = data?.experience || [];
  const education = data?.education || [];
  const certifications = data?.certifications || [];
  const languages = data?.languages || [];

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
            <Text style={styles.sectionTitle}>Employment History</Text>
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
              <Text key={i} style={styles.bullet}>• {skill}</Text>
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
      <View style={styles.header}>
        <Text style={styles.name}>
          {personal.firstName || 'First'} {personal.lastName || 'Last'}
        </Text>
        <Text style={styles.title}>{personal.title || 'Professional Title'}</Text>
        <Text style={styles.address}>{personal.location || 'City, State'}</Text>
        <Text style={styles.address}>{personal.email || 'email@example.com'}</Text>
        <Text style={styles.address}>{personal.phone || 'Phone'}</Text>
      </View>

      {/* Dynamic Sections */}
      {theme.sectionOrder.map((sectionId) => renderSection(sectionId))}
    </Page>
  );
};

export default CustomerServiceTemplate;