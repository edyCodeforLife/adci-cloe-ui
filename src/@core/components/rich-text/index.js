import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from "jodit-react";

const RichText = ({ placeholder, type, data, handleText, readOnly }) => {
  const editor = useRef(null);

  const [content, setContent] = useState(data);
  let url_upload;

  const readOnlyConfig = {
    readonly: true,
    buttons: "print",
    minHeight: 800,
    toolbarSticky: true,
    showCharsCounter: true,
    activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
  }

  const config = {
    placeholder: placeholder || 'Start typings...',
    showCharsCounter: true,
    minHeight: 800,
    toolbarSticky: true,
    enableDragAndDropFileToEditor: true,
    uploader: {
      insertImageAsBase64URI: true
    },
  };

  useEffect(() => {
    if (data != undefined) {
      setContent(data)
    }
  }, [data])


  const handleValue = (newContent) => {
    handleText(newContent);
    setContent(newContent)
  }

  const determineConfig = () => {
    if (readOnly) {
      return readOnlyConfig;
    } else {
      return config
    }
  }

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={determineConfig()}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => handleValue(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => { }}
    />
  );
};

export default RichText