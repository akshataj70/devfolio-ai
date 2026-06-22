import { Document, Font } from '@react-pdf/renderer';
import CustomerServiceTemplate from './templates/CustomerServiceTemplate';
import FreightAnalystTemplate from './templates/FreightAnalystTemplate';
import SherlockHolmesTemplate from './templates/SherlockHolmesTemplate';
import TiffanyTemplate from './templates/TiffanyTemplate'; // Keep Tiffany

// Register Inter font
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ekc.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiJ-Ekc.ttf',
      fontWeight: 700,
    },
  ],
});

const ACCENT_MAP = {
  blue:    '#2563eb',
  indigo:  '#6366f1',
  purple:  '#7c3aed',
  rose:    '#e11d48',
  emerald: '#059669',
  slate:   '#475569',
  amber:   '#d97706',
  cyan:    '#0891b2',
};

const ResumePDFDocument = ({ data, theme, template }) => {
  const accentColor =
    ACCENT_MAP[theme?.accentColor] ||
    (typeof theme?.accentColor === 'string' && theme.accentColor.startsWith('#')
      ? theme.accentColor
      : ACCENT_MAP.indigo);

  const templateProps = { data, theme, accentColor };

  const renderTemplate = () => {
    switch (template) {
      case 'customer':
        return <CustomerServiceTemplate {...templateProps} />;
      case 'sherlockholmes':
        return <SherlockHolmesTemplate {...templateProps} />;
      case 'freight':
        return <FreightAnalystTemplate {...templateProps} />;
      case 'tiffany':
        return <TiffanyTemplate {...templateProps} />;
      default:
        return <CustomerServiceTemplate {...templateProps} />;
    }
  };

  const firstName = data?.personal?.firstName || 'Resume';
  const lastName = data?.personal?.lastName || '';

  return (
    <Document
      title={`${firstName} ${lastName}`.trim()}
      author={`${firstName} ${lastName}`.trim()}
      subject="Professional Resume"
      creator="DevFolio AI"
      producer="DevFolio AI"
    >
      {renderTemplate()}
    </Document>
  );
};

export default ResumePDFDocument;