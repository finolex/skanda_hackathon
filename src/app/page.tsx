"use client"
import React, { useState } from 'react';
import chatAPI from './chatAPI';

const MyPage: React.FC = () => {
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState('');
  const [duration, setDuration] = useState('');
  const [engineers, setEngineers] = useState('');
  const [metrics, setMetrics] = useState('');

  const handleClick = async () => {
    console.log("press")
    const response = await chatAPI(description, feedback, engineers, metrics, duration);
    console.log(response);
    console.log("finish api")
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: 10, height: 200 }}>
        <textarea
          style={{ flex: 1, marginBottom: 5 }}
          placeholder={"Describe your app"}
          value={description}
          rows={2}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div style={{ display: "flex", flex: 1, marginTop: 5 }}>
          <textarea
            style={{ flex: 1, marginBottom: 5 }}
            placeholder={"Sprint duration"}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <textarea
            style={{ flex: 1, marginBottom: 5 }}
            placeholder={"Engineers"}
            value={engineers}
            onChange={(e) => setEngineers(e.target.value)}
          />
          <textarea
            style={{ flex: 1, marginBottom: 5 }}
            placeholder={"Metrics"}
            value={metrics}
            onChange={(e) => setMetrics(e.target.value)}
          />
        </div>
        <textarea
          style={{ flex: 1, marginTop: 5, marginBottom: 5 }}
          placeholder={"Insert any feedback, comments, bugs or suggestions you've received"}
          value={feedback}
          rows={4}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <button style={{ paddingTop: 5, paddingBottom: 5 }} onClick={handleClick}>Generate</button>
      </div>
      <div style={{ flex: 1, padding: 10 }}>
        <textarea
          style={{ width: '100%', height: "100%" }}
          readOnly
        />
      </div>
    </div>
  );
};

export default MyPage;