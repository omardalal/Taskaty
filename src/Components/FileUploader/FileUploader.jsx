import React from "react";
import { FileUploaderDropContainer } from "carbon-components-react";
import PropTypes from "prop-types";
import { styles } from "./styles.ts";
import Attachment from "../Attachment/Attachment";

const FileUploader = ({ filesArray, setFilesArray, multiple, title }) => {
  return (
    <div>
      <h6 style={styles.title}>{title}</h6>
      <FileUploaderDropContainer
        labelText="Drag and drop files here or click to upload"
        multiple={multiple}
        onAddFiles={(_, { addedFiles }) => {
          setFilesArray([
            ...filesArray,
            ...addedFiles.filter(
              (newFile) =>
                !filesArray.some((oldFile) => newFile.name === oldFile.name)
            )
          ]);
        }}
      />
      <div style={styles.attachmentsContainer}>
        {filesArray.map((file, index) => (
          <Attachment
            key={index}
            fileName={file.name}
            fileType={file.type}
            showDeleteBtn
            showDownloadBtn={false}
            onDeletePress={() => {
              setFilesArray(
                filesArray.filter((attach) => attach.name !== file.name)
              );
            }}
            light
          />
        ))}
      </div>
    </div>
  );
};

FileUploader.propTypes = {
  filesArray: PropTypes.array,
  setFilesArray: PropTypes.func,
  multiple: PropTypes.bool,
  title: PropTypes.string
};

export default FileUploader;
