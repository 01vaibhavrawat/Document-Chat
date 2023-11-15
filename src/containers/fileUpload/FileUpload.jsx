import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import customTheme from "../../constants/customTheme";
import { postPDFFileRequest } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading} = useSelector((state) => state);

  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      dispatch(postPDFFileRequest(formData, navigate));
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
              position: "relative", 
              minHeight:"35px", 

            }}
          >
            {loading ? (
              <CircularProgress
                size={24}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: -12,
                  marginLeft: -12,
                  color: customTheme.primary_text
                }}
              />
            ) : "Upload"}
            
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
