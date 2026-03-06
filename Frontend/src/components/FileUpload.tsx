import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
}

export const FileUpload = ({ onFileSelect, accept = '.pdf,.doc,.docx', maxSize = 5 }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      if (selectedFile.size > maxSize * 1024 * 1024) {
        alert(`File size should not exceed ${maxSize}MB`);
        return;
      }
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      {!file ? (
        <motion.div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
              : 'border-slate-300 dark:border-slate-700 hover:border-blue-400'
          }`}
          whileHover={{ scale: 1.01 }}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
            Drop your file here or click to browse
          </p>
          <p className="text-sm text-slate-500">
            Supported formats: {accept} (Max {maxSize}MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            className="hidden"
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-blue-50 dark:bg-blue-950 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">{file.name}</p>
              <p className="text-sm text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="w-8 h-8 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-red-600" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
