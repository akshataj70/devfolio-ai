import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';
import { TEMPLATES } from '../../utils/constants';

// ─── CUSTOMER SERVICE THUMBNAIL ───
const CustomerServiceThumbnail = ({ accent }) => (
  <svg viewBox="0 0 170 220" fill="none" className="w-full h-full">
    <rect x="16" y="16" width="70" height="9" rx="2" fill="#1a1a1a" />
    <rect x="16" y="29" width="60" height="5" rx="1.5" fill="#4a4a4a" />
    <rect x="16" y="38" width="55" height="3" rx="1" fill="#4a4a4a" />
    <rect x="16" y="44" width="45" height="3" rx="1" fill="#4a4a4a" />
    <rect x="16" y="52" width="40" height="3" rx="1" fill="#4a4a4a" />
    <rect x="16" y="62" width="32" height="5" rx="1.5" fill="#1a1a1a" />
    <rect x="16" y="69" width="138" height="3" rx="1" fill="#e5e7eb" />
    <rect x="16" y="75" width="130" height="3" rx="1" fill="#e5e7eb" />
    <rect x="16" y="88" width="65" height="5" rx="1.5" fill="#1a1a1a" />
    <rect x="16" y="95" width="138" height="1" rx="0.5" fill="#cccccc" />
    <rect x="16" y="100" width="75" height="4" rx="1" fill="#1a1a1a" />
    <rect x="16" y="107" width="55" height="3" rx="1" fill="#4a4a4a" />
    <rect x="120" y="100" width="34" height="3" rx="1" fill="#888888" />
    <rect x="20" y="114" width="130" height="3" rx="1" fill="#e5e7eb" />
    <rect x="20" y="120" width="120" height="3" rx="1" fill="#e5e7eb" />
    <rect x="16" y="132" width="68" height="4" rx="1" fill="#1a1a1a" />
    <rect x="16" y="139" width="50" height="3" rx="1" fill="#4a4a4a" />
    <rect x="120" y="132" width="34" height="3" rx="1" fill="#888888" />
    <rect x="20" y="146" width="125" height="3" rx="1" fill="#e5e7eb" />
    <rect x="16" y="160" width="50" height="5" rx="1.5" fill="#1a1a1a" />
    <rect x="16" y="167" width="138" height="1" rx="0.5" fill="#cccccc" />
    <rect x="16" y="172" width="60" height="4" rx="1" fill="#1a1a1a" />
    <rect x="16" y="179" width="55" height="3" rx="1" fill="#4a4a4a" />
    <rect x="120" y="172" width="34" height="3" rx="1" fill="#888888" />
  </svg>
);
// ─── TIFFANY THUMBNAIL ───
const TiffanyThumbnail = ({ accent }) => (
  <svg viewBox="0 0 170 220" fill="none" className="w-full h-full">
    <rect x="16" y="16" width="80" height="9" rx="2" fill="#1a1a1a" />
    <rect x="16" y="29" width="55" height="5" rx="1.5" fill="#4a4a4a" />
    <rect x="16" y="38" width="60" height="3" rx="1" fill="#4a4a4a" />
    <rect x="16" y="44" width="50" height="3" rx="1" fill="#4a4a4a" />
    <rect x="16" y="52" width="138" height="2" rx="1" fill={accent} />
    <rect x="16" y="62" width="32" height="5" rx="1.5" fill="#1a1a1a" />
    <rect x="16" y="69" width="138" height="3" rx="1" fill="#e5e7eb" />
    <rect x="16" y="75" width="125" height="3" rx="1" fill="#e5e7eb" />
    <rect x="16" y="81" width="110" height="3" rx="1" fill="#e5e7eb" />
    <rect x="16" y="94" width="55" height="5" rx="1.5" fill="#1a1a1a" />
    <rect x="16" y="101" width="138" height="1" rx="0.5" fill="#dddddd" />
    <rect x="16" y="106" width="70" height="4" rx="1" fill="#1a1a1a" />
    <rect x="16" y="113" width="50" height="3" rx="1" fill="#4a4a4a" />
    <rect x="120" y="106" width="34" height="3" rx="1" fill="#888888" />
    <rect x="20" y="120" width="130" height="3" rx="1" fill="#e5e7eb" />
    <rect x="20" y="126" width="120" height="3" rx="1" fill="#e5e7eb" />
    <rect x="16" y="138" width="65" height="4" rx="1" fill="#1a1a1a" />
    <rect x="16" y="145" width="45" height="3" rx="1" fill="#4a4a4a" />
    <rect x="120" y="138" width="34" height="3" rx="1" fill="#888888" />
    <rect x="20" y="152" width="125" height="3" rx="1" fill="#e5e7eb" />
    <rect x="20" y="158" width="110" height="3" rx="1" fill="#e5e7eb" />
    <rect x="16" y="172" width="50" height="5" rx="1.5" fill="#1a1a1a" />
    <rect x="16" y="179" width="138" height="1" rx="0.5" fill="#dddddd" />
    <rect x="16" y="184" width="65" height="4" rx="1" fill="#1a1a1a" />
    <rect x="16" y="191" width="50" height="3" rx="1" fill="#4a4a4a" />
    <rect x="120" y="184" width="34" height="3" rx="1" fill="#888888" />
  </svg>
);

// ─── SHERLOCK HOLMES THUMBNAIL ───
const SherlockHolmesThumbnail = ({ accent }) => (
  <svg viewBox="0 0 170 220" fill="none" className="w-full h-full">
    <rect x="0" y="0" width="54" height="220" fill="#f5f0eb" />
    <rect x="54" y="0" width="1" height="220" fill="#e0d8d0" />
    <rect x="6" y="16" width="42" height="7" rx="2" fill="#1a1a1a" />
    <rect x="6" y="27" width="30" height="4" rx="1" fill="#4a4a4a" />
    <rect x="6" y="36" width="40" height="2" rx="1" fill="#4a4a4a" />
    <rect x="6" y="42" width="38" height="2" rx="1" fill="#4a4a4a" />
    <rect x="6" y="58" width="30" height="4" rx="1" fill="#1a1a1a" />
    <rect x="6" y="64" width="42" height="3" rx="1" fill="#4a4a4a" />
    <rect x="6" y="70" width="38" height="3" rx="1" fill="#4a4a4a" />
    <rect x="6" y="76" width="40" height="3" rx="1" fill="#4a4a4a" />
    <rect x="6" y="90" width="28" height="4" rx="1" fill="#1a1a1a" />
    <rect x="6" y="96" width="40" height="3" rx="1" fill="#4a4a4a" />
    <rect x="6" y="102" width="34" height="3" rx="1" fill="#4a4a4a" />
    <rect x="6" y="108" width="38" height="3" rx="1" fill="#4a4a4a" />
    <rect x="6" y="114" width="30" height="3" rx="1" fill="#4a4a4a" />
    <rect x="62" y="16" width="60" height="5" rx="1.5" fill="#1a1a1a" />
    <rect x="62" y="23" width="100" height="1" rx="0.5" fill="#cccccc" />
    <rect x="62" y="28" width="80" height="4" rx="1" fill="#1a1a1a" />
    <rect x="62" y="35" width="50" height="3" rx="1" fill="#4a4a4a" />
    <rect x="62" y="42" width="100" height="3" rx="1" fill="#e5e7eb" />
    <rect x="62" y="48" width="95" height="3" rx="1" fill="#e5e7eb" />
    <rect x="62" y="54" width="85" height="3" rx="1" fill="#e5e7eb" />
    <rect x="62" y="64" width="75" height="4" rx="1" fill="#1a1a1a" />
    <rect x="62" y="71" width="45" height="3" rx="1" fill="#4a4a4a" />
    <rect x="62" y="78" width="100" height="3" rx="1" fill="#e5e7eb" />
    <rect x="62" y="94" width="50" height="5" rx="1.5" fill="#1a1a1a" />
    <rect x="62" y="101" width="100" height="1" rx="0.5" fill="#cccccc" />
    <rect x="62" y="106" width="70" height="4" rx="1" fill="#1a1a1a" />
    <rect x="62" y="113" width="50" height="3" rx="1" fill="#4a4a4a" />
    <rect x="62" y="122" width="65" height="4" rx="1" fill="#1a1a1a" />
    <rect x="62" y="129" width="45" height="3" rx="1" fill="#4a4a4a" />
    <rect x="62" y="144" width="40" height="5" rx="1.5" fill="#1a1a1a" />
    <rect x="62" y="151" width="100" height="1" rx="0.5" fill="#cccccc" />
    <rect x="62" y="156" width="65" height="4" rx="1" fill="#1a1a1a" />
    <rect x="62" y="163" width="45" height="3" rx="1" fill="#4a4a4a" />
    <rect x="62" y="169" width="95" height="3" rx="1" fill="#e5e7eb" />
  </svg>
);

// ─── FREIGHT ANALYST THUMBNAIL ───
const FreightAnalystThumbnail = ({ accent }) => (
  <svg viewBox="0 0 170 220" fill="none" className="w-full h-full">
    <rect x="16" y="16" width="80" height="9" rx="2" fill="#1a1a1a" />
    <rect x="16" y="29" width="65" height="5" rx="1.5" fill="#4a4a4a" />
    <rect x="16" y="38" width="55" height="3" rx="1" fill="#4a4a4a" />
    <rect x="16" y="44" width="70" height="3" rx="1" fill="#4a4a4a" />
    <rect x="16" y="54" width="38" height="5" rx="1.5" fill="#1a1a1a" />
    <rect x="16" y="61" width="138" height="1" rx="0.5" fill="#cccccc" />
    <rect x="16" y="67" width="138" height="3" rx="1" fill="#e5e7eb" />
    <rect x="16" y="73" width="130" height="3" rx="1" fill="#e5e7eb" />
    <rect x="16" y="79" width="110" height="3" rx="1" fill="#e5e7eb" />
    <rect x="16" y="92" width="55" height="5" rx="1.5" fill="#1a1a1a" />
    <rect x="16" y="99" width="138" height="1" rx="0.5" fill="#cccccc" />
    <rect x="16" y="104" width="80" height="4" rx="1" fill="#1a1a1a" />
    <rect x="16" y="111" width="60" height="3" rx="1" fill="#4a4a4a" />
    <rect x="120" y="104" width="34" height="3" rx="1" fill="#888888" />
    <rect x="20" y="118" width="130" height="3" rx="1" fill="#e5e7eb" />
    <rect x="20" y="124" width="120" height="3" rx="1" fill="#e5e7eb" />
    <rect x="20" y="130" width="100" height="3" rx="1" fill="#e5e7eb" />
    <rect x="16" y="142" width="65" height="4" rx="1" fill="#1a1a1a" />
    <rect x="16" y="149" width="55" height="3" rx="1" fill="#4a4a4a" />
    <rect x="120" y="142" width="34" height="3" rx="1" fill="#888888" />
    <rect x="20" y="156" width="125" height="3" rx="1" fill="#e5e7eb" />
    <rect x="16" y="170" width="48" height="5" rx="1.5" fill="#1a1a1a" />
    <rect x="16" y="177" width="138" height="1" rx="0.5" fill="#cccccc" />
    <rect x="16" y="182" width="60" height="4" rx="1" fill="#1a1a1a" />
    <rect x="16" y="189" width="50" height="3" rx="1" fill="#4a4a4a" />
    <rect x="120" y="182" width="34" height="3" rx="1" fill="#888888" />
  </svg>
);

// ─── THUMBNAIL MAP ───
const THUMBNAIL_MAP = {
  customer: CustomerServiceThumbnail,
  sherlockholmes: SherlockHolmesThumbnail,
  freight: FreightAnalystThumbnail,
  tiffany: TiffanyThumbnail,
};

// ─── TEMPLATE INFO ───
const TEMPLATE_INFO = {
  customer: { desc: 'Classic employment history layout', layout: 'Single Column' },
  sherlockholmes: { desc: 'Two-column classic sidebar style', layout: 'Two Column' },
  freight: { desc: 'Professional analyst style', layout: 'Single Column' },
  tiffany: { desc: 'Clean with profile section', layout: 'Single Column' },
};

const ACCENT_COLOR = '#6366f1';

const TemplateSelector = ({ selected, onSelect, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl pointer-events-auto border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600/5 to-purple-600/5 dark:from-blue-600/10 dark:to-purple-600/10">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Choose a Template
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Pick the design that fits your style
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiX size={22} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 max-h-[calc(85vh-80px)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {TEMPLATES.map((template) => {
                    const isSelected = selected === template.id;
                    const ThumbnailSVG = THUMBNAIL_MAP[template.id];
                    const info = TEMPLATE_INFO[template.id];

                    return (
                      <motion.button
                        key={template.id}
                        onClick={() => {
                          onSelect(template.id);
                          onClose();
                        }}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className={`
                          group relative rounded-xl border-2 transition-all duration-200 text-left overflow-hidden
                          ${isSelected
                            ? 'border-blue-500 dark:border-blue-400 shadow-lg shadow-blue-200/40 dark:shadow-blue-900/40 ring-2 ring-blue-500/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md'
                          }
                        `}
                      >
                        <div className={`
                          relative aspect-[170/220] bg-white dark:bg-gray-100 overflow-hidden rounded-t-[10px]
                          ${isSelected ? '' : 'group-hover:bg-gray-50'}
                        `}>
                          <ThumbnailSVG accent={ACCENT_COLOR} />

                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center"
                            >
                              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <FiCheck size={20} className="text-white" />
                              </div>
                            </motion.div>
                          )}

                          {!isSelected && (
                            <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-200 flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full shadow-md border border-blue-200 dark:border-blue-700">
                                Use this template
                              </span>
                            </div>
                          )}
                        </div>

                        <div className={`
                          px-4 py-3 border-t transition-colors
                          ${isSelected
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                            : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'
                          }
                        `}>
                          <div className="flex items-center justify-between">
                            <h3 className={`font-semibold text-sm ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                              {template.name}
                            </h3>
                            <span className={`
                              text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full
                              ${isSelected
                                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                              }
                            `}>
                              {info.layout}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{info.desc}</p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TemplateSelector;