import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the dropped files
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dropzoneStyle = {
    border: `2px dashed #cccccc`,
    borderRadius: '4px',
    padding: '60px',
    textAlign: 'center',
    cursor: 'pointer',
    maxWidth:"500px"
  };

  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"100%"}}>
        <div {...getRootProps()} style={{ ...dropzoneStyle }}>
        <input {...getInputProps()} />
        {isDragActive ? (
            <p>Drop the files here...</p>
        ) : (
            <p>Drag & drop some files here, or click to select files</p>
        )}
        </div>
    </div>
  );
};

export default FileUpload;
