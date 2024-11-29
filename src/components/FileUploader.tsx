import { TextField } from '@mui/material';
import React, { useRef } from 'react';

interface FileUploaderProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <TextField
      type="file"
      inputProps={{ accept: 'image/*', capture: 'environment' }}
      onChange={onChange}
      inputRef={fileInputRef}
      fullWidth
    />
  );
};

export default FileUploader;