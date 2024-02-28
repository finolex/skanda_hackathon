"use client"
import React, { useState, useEffect } from "react"
import SprintPlan from "./components/SprintPlan"
import { TextField, Button } from '@mui/material'

export default function MyPage() {
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [engineers, setEngineers] = useState('');
  const [metrics, setMetrics] = useState('');
  const [chatGPTKey, setChatGPTKey] = useState('');

  return (
    <React.Fragment>
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: -5 }}>
          <h1>Skanda</h1>
        </div>
        <p style={{ marginTop: -10 }}>Auto-generate sprint plans from your customer feedback</p>
        <div style={{ display: "flex", gap: 5 }}>
          <TextField
            autoFocus={true}
            required={true}
            style={{ flex: 3, marginBottom: 5, width: "100%" }}
            placeholder={"Describe your app"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            autoFocus={true}
            required={true}
            style={{ flex: 1, marginBottom: 5, width: "100%" }}
            placeholder={"Enter your ChatGPT API key"}
            value={chatGPTKey}
            onChange={(e) => setChatGPTKey(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", flex: 1, marginTop: 5 }}>
          <TextField
            required={true}
            style={{ flex: 1, marginBottom: 5, marginRight: 5 }}
            placeholder={"Sprint duration"}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <TextField
            required={true}
            style={{ flex: 1, marginBottom: 5, marginRight: 5 }}
            placeholder={"Engineers"}
            value={engineers}
            onChange={(e) => setEngineers(e.target.value)}
          />
          <TextField
            required={true}
            style={{ flex: 1, marginBottom: 5 }}
            placeholder={"Metrics"}
            value={metrics}
            onChange={(e) => setMetrics(e.target.value)}
          />
        </div>
      </div>
      <hr />
      <SprintPlan chatGPTKey={chatGPTKey} description={description} engineers={engineers} metrics={metrics} duration={duration} />
    </React.Fragment>
  )
};