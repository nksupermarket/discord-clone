import React, { useState, useContext } from 'react';

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

const ChatBarWrapper = ({ replyTo, setReplyTo, submit, ...props }) => {
  const { setError } = useContext(ErrorContext);
  const [attachments, setAttachments] = useState([]);
  const [uploadTasks, setUploadTasks] = useState([]);

  function handleAttachmentsOnSubmitMsg() {
    if (attachments.length === 0) return;
    return Promise.all(
      attachments.map(async (f) => {
        const task = await beginUpload(f);
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
        const fileURL = await getDownloadURL(task.snapshot.ref);
        return fileURL;
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
      <div className="upload-tasks-ctn">
        {uploadTasks.map((t) => {
          return <UploadProgressWrapper task={t} />;
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
        submit={async (msg, replyTo, mentions) => {
          try {
            const attachmentsURL = await handleAttachmentsOnSubmitMsg();
            submit(msg, replyTo, mentions, attachmentsURL);
          } catch (error) {
            console.log(error);
            setError(error.message);
          }
        }}
        {...props}
      />
    </form>
  );
};

export default ChatBarWrapper;

function submitHandler(e) {
  e.preventDefault();
}
