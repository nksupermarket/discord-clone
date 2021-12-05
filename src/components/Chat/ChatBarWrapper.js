import React, { useState, useLayoutEffect, useRef, useContext } from 'react';

import { ErrorContext } from '../../logic/contexts/ErrorContext';
import {
  beginUpload,
  cancelUpload,
  listenToUploadProgress,
} from '../../logic/channel_firebaseStuff';
import { getDownloadURL } from 'firebase/storage';
import uniqid from 'uniqid';

import ReplyBar from './ReplyBar';
import ChatBar from './ChatBar';
import UploadProgressWrapper from '../Upload/UploadProgressWrapper';

import '../../styles/ChatBar.css';

const ChatBarWrapper = ({ replyTo, setReplyTo, ...props }) => {
  const { setError } = useContext(ErrorContext);
  const [attachments, setAttachments] = useState([]);
  const [uploadTasks, setUploadTasks] = useState([]);
  const uploadTasksCtnRef = useRef();

  useLayoutEffect(function positionUploadTasksCtn() {
    uploadTasksCtnRef.current.style.top = `-${
      uploadTasksCtnRef.current.offsetHeight + 10
    }px`;
  });

  function handleAttachmentsOnSubmitMsg() {
    if (attachments.length === 0) return;
    const copy = [...attachments];
    setAttachments([]);
    return Promise.all(
      copy.map(async (f) => {
        const task = beginUpload(f);
        console.log({ f, task });
        const id = uniqid();
        setUploadTasks((prev) => [
          ...prev,
          {
            id,
            task,
            name: f.name,
            progress: f.progress,
          },
        ]);
        listenToUploadProgress(task, function setProgress(progress) {
          setUploadTasks((prev) =>
            prev.map((t) => {
              if (t.id === id) return { ...t, progress };
              return t;
            })
          );
        });
        await task;
        const fileURL = await getDownloadURL(task.snapshot.ref);

        return {
          name: f.name,
          url: fileURL,
        };
      })
    );
  }
  function handleNewAttachments(file) {
    if (attachments.length === 5)
      return setError("Woooaa, that's a lot of files there bud");
    setAttachments((prev) => [...prev, file]);
  }
  function removeAttachment(file) {
    setAttachments((prev) => prev.filter((val) => val !== file));
  }
  return (
    <form className="chat-bar" name="chat-bar" onSubmit={submitHandler}>
      <div className="upload-tasks-ctn" ref={uploadTasksCtnRef}>
        {uploadTasks.map((t, idx) => {
          return <UploadProgressWrapper key={idx} task={t} />;
        })}
      </div>
      {replyTo && (
        <ReplyBar
          displayName={replyTo.displayName}
          close={() => setReplyTo()}
        />
      )}
      <ChatBar
        replyTo={replyTo}
        attachments={attachments}
        handleNewAttachments={handleNewAttachments}
        removeAttachment={removeAttachment}
        setReplyTo={setReplyTo}
        getAttachmentsURL={handleAttachmentsOnSubmitMsg}
        cleanUpAttachments={() => setUploadTasks([])}
        {...props}
      />
    </form>
  );
};

export default ChatBarWrapper;

function submitHandler(e) {
  e.preventDefault();
}
