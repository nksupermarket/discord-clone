import React, { useState, useEffect, useContext } from 'react';

import {
  beginUpload,
  cancelUpload,
  handleUploadStateChanges,
} from '../../logic/channel_firebaseStuff';
import uniqid from 'uniqid';

import { ErrorContext } from '../../logic/contexts/ErrorContext';
import IconBtn from '../IconBtn';
import UploadProgress from '../UploadProgress';
import ChatBarInput from './ChatBarInput';
import UploadFile from '../UploadFile';

import addCircleSvg from '../../assets/svg/add-circle-fill.svg';
import { setRoomExitTimestampOnDisconnect } from '../../logic/room_firebaseStuff';

import '../../styles/MentionsPopup.css';
import 'draft-js/dist/Draft.css';

const ChatBar = ({ replyTo, ...props }) => {
  const { setError } = useContext(ErrorContext);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesUploading, setFilesUploading] = useState([]);
  console.log(uploadedFiles);
  useEffect(() => {
    return () => filesUploading.forEach((f) => cancelUpload(f.task));
  });

  function handleUpload(file) {
    const task = beginUpload(file);
    const id = uniqid();
    setFilesUploading((prev) => [
      ...prev,
      {
        id,
        task,
        name: file.name,
        progress: 0,
      },
    ]);
    function updateProgress(percent) {
      setFilesUploading((prev) =>
        prev.map((t) => {
          if (t.id === id) return { ...t, progress: percent };
          return t;
        })
      );
    }
    function onFinishUpload(url) {
      setUploadedFiles((prev) => [
        ...prev,
        {
          id,
          url,
          name: file.name,
        },
      ]);
    }
    handleUploadStateChanges(task, updateProgress, setError, onFinishUpload);
  }

  let style = replyTo
    ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
    : { borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  return (
    <div className="chatbar-content" style={style}>
      <div className="chatbar-wrapper">
        <div className="add-wrapper">
          <UploadFile handleFile={handleUpload} actionOnChange="upload file">
            <div className="icon-btn">
              <img src={addCircleSvg} alt="upload a file" />
            </div>
          </UploadFile>
        </div>
        <ChatBarInput replyTo={replyTo} {...props} />
      </div>
      {filesUploading.length > 0 &&
        filesUploading.map((f) => {
          const uploadedObj = uploadedFiles.find((file) => file.id === f.id);
          return uploadedObj ? (
            <UploadProgress
              file={uploadedObj}
              isCompleted={true}
              cancel={() => cancelUpload(f.task)}
            />
          ) : (
            <UploadProgress file={f} cancel={() => cancelUpload(f.task)} />
          );
        })}
    </div>
  );
};

export default ChatBar;
