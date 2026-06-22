import { useMemo } from 'react';
import { useResumeStore } from '../../stores/useResumeStore';
import { calculateATSScore, getATSRatingColor } from '../../utils/atsScore';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

// Returns hex color for SVG stroke based on score
const getStrokeColor = (score) => {
  if (score >= 80) return '#059669'; // emerald-600
  if (score >= 60) return '#2563eb'; // blue-600
  if (score >= 40) return '#d97706'; // amber-600
  return '#dc2626'; // red-600
};

const AtsScorePanel = () => {
  const { resumeData } = useResumeStore();

  const atsData = useMemo(() => calculateATSScore(resumeData), [resumeData]);

  const { score, details, rating } = atsData;
  const ratingColor = getATSRatingColor(score);
  const strokeColor = getStrokeColor(score);

  // Circle parameters
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 border border-gray-200 dark:border-gray-700 mt-4 shrink-0">
      <div className="flex items-center gap-3 mb-3">
        {/* Circular Progress */}
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 56 56">
            <circle
              strokeWidth="4"
              stroke="#e5e7eb"
              fill="transparent"
              r={radius}
              cx="28"
              cy="28"
            />
            <circle
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke={strokeColor}
              fill="transparent"
              r={radius}
              cx="28"
              cy="28"
              style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
            />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <span className={`text-sm font-bold ${ratingColor}`}>{score}</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">ATS Score</h3>
          <p className={`text-xs font-medium ${ratingColor}`}>{rating}</p>
        </div>
      </div>

      <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
        {details.map((detail, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="mt-0.5 shrink-0">
              {detail.passed ? (
                <FiCheckCircle className="text-emerald-500" size={14} />
              ) : (
                <FiXCircle className="text-red-500" size={14} />
              )}
            </div>
            <div>
              <p className={`text-xs font-medium ${detail.passed ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                {detail.category}
              </p>
              <p className={`text-[10px] ${detail.passed ? 'text-gray-500 dark:text-gray-400' : 'text-red-600 dark:text-red-400'}`}>
                {detail.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AtsScorePanel;
