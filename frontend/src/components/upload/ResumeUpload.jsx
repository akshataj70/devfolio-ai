import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiFile, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { pdfService } from '../../services/pdfService';

const ResumeUpload = ({ onExtract, onSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedData, setExtractedData] = useState(null);
  const [error, setError] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      handleFileUpload(droppedFile);
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      handleFileUpload(selectedFile);
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleFileUpload = async (file) => {
    setFile(file);
    if (onSelect) {
      onSelect(file);
      return;
    }
    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Extract data from PDF
      const extracted = await pdfService.extractResumeData(file);
      
      clearInterval(progressInterval);
      setProgress(100);
      setExtractedData(extracted);
      
      // Call the callback with extracted data
      if (onExtract) {
        onExtract(extracted);
      }

      setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
      }, 500);

    } catch (err) {
      setError('Failed to extract data from PDF. Please try again.');
      setIsUploading(false);
      setProgress(0);
    }
  };

  const removeFile = () => {
    setFile(null);
    setExtractedData(null);
    setError(null);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
          ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}
          ${file ? 'bg-gray-50 dark:bg-gray-800/50' : 'hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}
        `}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {!file ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-900/20">
                <FiUpload size={40} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Upload Your Resume
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Drag & drop your PDF here or click to browse
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400 dark:text-gray-500">
              <span>• Supports PDF files</span>
              <span>• Max file size: 5MB</span>
              <span>• AI will extract your data</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <FiFile size={24} className="text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                {file.name}
              </span>
              <button
                onClick={removeFile}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FiX size={16} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Progress Bar */}
            {isUploading && (
              <div className="w-full">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {progress < 100 ? 'Extracting data...' : 'Complete!'}
                </p>
              </div>
            )}

            {/* Extracted Data Preview */}
            {extractedData && !isUploading && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-left">
                <p className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center gap-2">
                  <FiCheck size={16} />
                  Data extracted successfully!
                </p>
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <p>📄 Name: {extractedData.name || 'Not found'}</p>
                  <p>📧 Email: {extractedData.email || 'Not found'}</p>
                  <p>📞 Phone: {extractedData.phone || 'Not found'}</p>
                  <p>💼 Skills: {extractedData.skills?.length || 0} found</p>
                  <p>📚 Education: {extractedData.education?.length || 0} entries</p>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center gap-2">
                <FiAlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;