import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import customTheme from "../../constants/customTheme";
import {postPDFFileRequest} from "../../store/actions";
import { useDispatch } from "react-redux";

const FileUpload = () => {
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      dispatch(postPDFFileRequest(formData));
    }
  };


  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dropzoneStyle = {
    border: `2px dashed #cccccc`,
    borderRadius: "4px",
    padding: "60px",
    textAlign: "center",
    cursor: "pointer",
    maxWidth: "500px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div {...getRootProps()} style={{ ...dropzoneStyle }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag & drop some files here, or click to select files</p>
        )}
      </div>
      {selectedFile && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <p>Selected File: {selectedFile.name}</p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            style={{
              marginTop: "10px",
              background: customTheme.primary_background,
              color: customTheme.primary_text,
            }}
          >
            Upload
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
