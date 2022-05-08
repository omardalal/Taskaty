import React, { useState } from "react";
import { styles } from "./styles.ts";
import { Document32, Download20, Delete20 } from "@carbon/icons-react";
import PropTypes from "prop-types";

const Attachment = ({
  fileName,
  fileType,
  showDeleteBtn,
  showDownloadBtn,
  onDeletePress,
  onDownloadPress,
  light
}) => {
  const [downloadHovered, setDownloadHovered] = useState(false);
  const [deleteHovered, setDeleteHovered] = useState(false);

  return (
    <div style={styles.container(light)}>
      <Document32 style={styles.icon} />
      <div style={styles.infoContainer}>
        <p style={styles.fileName}>{fileName}</p>
        <p style={styles.fileType}>{fileType}</p>
      </div>
      {showDeleteBtn && (
        <div
          style={{
            ...styles.attachmentButton,
            ...styles.deleteButton(deleteHovered, showDownloadBtn)
          }}
          onMouseEnter={() => setDeleteHovered(true)}
          onMouseLeave={() => setDeleteHovered(false)}
          onClick={onDeletePress}
        >
          <Delete20 />
        </div>
      )}
      {showDownloadBtn && (
        <div
          style={{
            ...styles.attachmentButton,
            ...styles.downloadButton(downloadHovered)
          }}
          onMouseEnter={() => setDownloadHovered(true)}
          onMouseLeave={() => setDownloadHovered(false)}
          onClick={onDownloadPress}
        >
          <Download20 />
        </div>
      )}
    </div>
  );
};

Attachment.propTypes = {
  fileName: PropTypes.string,
  fileType: PropTypes.string,
  showDeleteBtn: PropTypes.boolean,
  onDeletePress: PropTypes.func,
  onDownloadPress: PropTypes.func,
  light: PropTypes.bool,
  showDownloadBtn: PropTypes.bool
};

export default Attachment;
