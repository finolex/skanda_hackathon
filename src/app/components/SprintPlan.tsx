
require('dotenv').config();
import React, { useState } from 'react';
import ChatSummaryAPI from '../ChatSummaryAPI';
import ChatFullAPI from '../ChatFullAPI';
import ChatRisksAPI from '../ChatRisksAPI';
import { Button, TextField, Paper } from '@mui/material'
import ChatResponse from './ChatResponse';

export default function SprintPlan() {
    const [description, setDescription] = useState('');
    const [feedback, setFeedback] = useState('');
    const [duration, setDuration] = useState('');
    const [engineers, setEngineers] = useState('');
    const [metrics, setMetrics] = useState('');
    const [dataValidationError, setDataValidationError] = useState('')
    const [summary, setSummary] = useState('Fill details and generate summary');
    const [full, setFull] = useState('');
    const [risks, setRisks] = useState('')
  
    const handleGenerate = async () => {
      if (description !== '' && duration !== '' && engineers !== '' && metrics !== '' && feedback !== '') {
          setDataValidationError('');
          setFull('');
          setRisks('');
  
          try {
              setSummary("Generating...");
              const summaryResponse = await ChatSummaryAPI(description, feedback, engineers, metrics, duration);
              setSummary(summaryResponse.choices[0].message.content || "");
  
              setFull("Loading...");
              setRisks("Loading...");
              const [fullResponse, risksResponse] = await Promise.all([
                  ChatFullAPI(description, feedback, engineers, metrics, duration, summary),
                  ChatRisksAPI(description, feedback, engineers, metrics, duration, summary)
              ]);
              setFull(fullResponse.choices[0].message.content || "");
              setRisks(risksResponse.choices[0].message.content || "");
          } catch (error) {
              alert(error);
          }
      } else {
          setDataValidationError("Please fill all of the above fields first");
      }
  };

    return(
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: 10, height: 200 }}>
        <TextField
          autoFocus={true}
          required={true}
          style={{ flex: 1, marginBottom: 5 }}
          placeholder={"Describe your app"}
          value={description}
          multiline={true}
          minRows={2}
          maxRows={3}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div style={{ display: "flex", flex: 1, marginTop: 5 }}>
          <TextField
            required={true}
            style={{ flex: 1, marginBottom: 5 }}
            placeholder={"Sprint duration"}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <TextField
            required={true}
            style={{ flex: 1, marginBottom: 5 }}
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
        <TextField
          required={true}
          style={{ flex: 1, marginTop: 5, marginBottom: 5 }}
          placeholder={"Insert any feedback, comments, bugs or suggestions you've received"}
          value={feedback}
          multiline={true}
          minRows={4}
          maxRows={8}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <Button 
        style={{ paddingTop: 5, paddingBottom: 5 }} 
        onClick={handleGenerate}
        variant={"outlined"}
        >Generate</Button>
        <p style={{fontSize: 12, color: 'red'}}>{dataValidationError}</p>
      </div>
      <div style={{ flex: 1, padding: 10 }}>
        <Paper
          style={{ padding: 20, fontSize: 14 }}
          children={<ChatResponse message={summary} title={"Sprint plan summary"}/>}
        />
        {summary == 'Fill details and generate summary' || summary == 'Generating...' ? undefined : <Paper
          style={{ padding: 20, fontSize: 14, marginTop: 10, }}
          children={<ChatResponse message={full} title={"Detailed sprint plan"}/>}
        />}

        {summary == 'Fill details and generate summary' || summary == 'Generating...' ? undefined : <Paper
          style={{ padding: 20, fontSize: 14, marginTop: 10, }}
          children={<ChatResponse message={risks} title={"Key risks"}/>}
        />}
      </div>
    </div>
     )
}
    