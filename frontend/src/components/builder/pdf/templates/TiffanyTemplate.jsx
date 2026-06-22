import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const TiffanyTemplate = ({ data, theme, accentColor }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: 'Helvetica',
      backgroundColor: '#FFFFFF',
    },
    header: {
      marginBottom: 16,
      borderBottomWidth: 3,
      borderBottomColor: accentColor || '#8b5cf6',
      paddingBottom: 12,
    },
    name: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#1a1a1a',
      letterSpacing: 0.5,
      marginBottom: 2,
    },
    title: {
      fontSize: 14,
      color: accentColor,
      fontWeight: 'bold',
      marginBottom: 6,
    },
    address: {
      fontSize: 9,
      color: '#4a4a4a',
      marginBottom: 2,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#1a1a1a',
      textTransform: 'uppercase',
      letterSpacing: 1.5,
      marginTop: 16,
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#dddddd',
      paddingBottom: 4,
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
      fontStyle: 'italic',
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

  const renderSection = (sectionId) => {
    if (theme.hiddenSections?.includes(sectionId)) return null;

    switch (sectionId) {
      case 'summary':
        if (!personal.summary) return null;
        return (
          <View key="summary" style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.text}>{personal.summary}</Text>
          </View>
        );
      // ... (rest of sections same as before)
      default:
        return null;
    }
  };

  return (
    <Page size="A4" style={styles.page} wrap>
      <View style={styles.header}>
        <Text style={styles.name}>
          {personal.firstName || 'First'} {personal.lastName || 'Last'}
        </Text>
        <Text style={styles.title}>{personal.title || 'Professional Title'}</Text>
        <Text style={styles.address}>{personal.location || 'City, State'}</Text>
        <Text style={styles.address}>{personal.email || 'email@example.com'}  |  {personal.phone || 'Phone'}</Text>
        {(personal.linkedin || personal.github || personal.website) && (
          <Text style={styles.address}>
            {[
              personal.linkedin && `LinkedIn: ${personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}`,
              personal.github && `GitHub: ${personal.github.replace(/^https?:\/\/(www\.)?/, '')}`,
              personal.website && `Website: ${personal.website.replace(/^https?:\/\/(www\.)?/, '')}`
            ].filter(Boolean).join('  |  ')}
          </Text>
        )}
      </View>

      {theme.sectionOrder.map((sectionId) => renderSection(sectionId))}
    </Page>
  );
};

export default TiffanyTemplate;