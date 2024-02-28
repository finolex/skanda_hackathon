"use client"
import React, { useState } from "react"
import SprintPlan from "./components/SprintPlan"
import { TextField, Button } from '@mui/material'

export default function MyPage() {
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [engineers, setEngineers] = useState('');
  const [metrics, setMetrics] = useState('');

  return (
    <React.Fragment>
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: -5 }}>
          <h1>Skanda</h1>
          <div>
            <Button>Login</Button>
            <Button variant={"outlined"}>Create account</Button>
          </div>
        </div>
        <p style={{ marginTop: -10 }}>Auto-generate sprint plans from your customer feedback</p>
        <TextField
          autoFocus={true}
          required={true}
          style={{ flex: 1, marginBottom: 5, width: "100%" }}
          placeholder={"Describe your app"}
          value={description}
          multiline={true}
          minRows={1}
          maxRows={2}
          onChange={(e) => setDescription(e.target.value)}
        />
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
      <SprintPlan description={description} engineers={engineers} metrics={metrics} duration={duration} />
    </React.Fragment>
  )
};