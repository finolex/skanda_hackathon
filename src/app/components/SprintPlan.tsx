
require('dotenv').config();
import React, { useState, useEffect } from 'react';
import ChatSummaryAPI from '../ChatSummaryAPI';
import ChatFullAPI from '../ChatFullAPI';
import ChatRisksAPI from '../ChatRisksAPI';
import { Button, TextField, Paper } from '@mui/material'
import ChatResponse from './ChatResponse';
import FeedbackCard from './FeedbackCard';

export default function SprintPlan(props: any) {
  const { description, duration, engineers, metrics, chatGPTKey } = props
  const [feedback, setFeedback] = useState('');
  const [feedbackTitle, setFeedbackTitle] = useState('')
  const [dataValidationError, setDataValidationError] = useState('')
  const [summary, setSummary] = useState('Fill details and generate summary');
  const [full, setFull] = useState('');
  const [risks, setRisks] = useState('')
  const [feedbackError, setFeedbackError] = useState("")
  const [feedbackArrayState, setFeedbackArrayState] = useState([])

  function handleAddFeedback() {
    if (feedback != '' && feedbackTitle != '') {
      setFeedbackError('')

      const today = new Date()
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
      const year = today.getFullYear();

      const formattedDate = `${month}/${day}/${year}`;

      const newFeedback = {
        title: feedbackTitle,
        feedback: feedback,
        date: formattedDate
      }
      setFeedbackArrayState([newFeedback, ...feedbackArrayState])
      setFeedback("")
      setFeedbackTitle("")
    } else {
      setFeedbackError("Please enter feedback and title before adding")
    }
  }

  const handleGenerate = async () => {
    const concatenatedFeedback = feedbackArrayState.map(item => item.feedback).join('\n');
    if (description !== '' && duration !== '' && engineers !== '' && metrics !== '' && chatGPTKey !== '' && (feedback !== '' && feedbackTitle !== '' || concatenatedFeedback !== '')) {
      if (feedback !== '' && feedbackTitle !== '') {
        handleAddFeedback()
      } else if (feedback == '' || feedbackTitle == '') {
        setFeedbackError('Please enter feedback and title before adding')
      }
      setDataValidationError('');
      setFeedbackError('')
      setFull('');
      setRisks('');

      try {
        setSummary("Generating...");
        const feedbackString = feedbackArrayState.map(item => `${item.title}: ${item.feedback}`).join('\n');
        const summaryResponse = await ChatSummaryAPI(description, feedbackString, engineers, metrics, duration, chatGPTKey);
        setSummary(summaryResponse.choices[0].message.content || "");

        setFull("Loading...");
        setRisks("Loading...");
        const [fullResponse, risksResponse] = await Promise.all([
          ChatFullAPI(description, feedback, engineers, metrics, duration, summary, chatGPTKey),
          ChatRisksAPI(description, feedback, engineers, metrics, duration, summary, chatGPTKey)
        ]);
        setFull(fullResponse.choices[0].message.content || "");
        setRisks(risksResponse.choices[0].message.content || "");
      } catch (error) {
        alert(error);
      }
    } else {
      setDataValidationError("Please fill all of the above fields, and have at least one feedback first");
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <Button
        style={{ paddingTop: 5, paddingBottom: 5, width: "100%" }}
        onClick={handleGenerate}
        variant={"contained"}
      >Generate</Button>
      <p style={{ fontSize: 12, color: 'red' }}>{dataValidationError}</p>

      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 5, display: "flex", flexDirection: "column", gap: 5 }} >
              <TextField
                required={true}
                placeholder={"Title of feedback"}
                onChange={(e) => setFeedbackTitle(e.target.value)}
              />
              <TextField
                required={true}
                placeholder={"Insert any feedback, comments, bugs or suggestions you've received"}
                value={feedback}
                multiline={true}
                minRows={5}
                maxRows={8}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <Button style={{ flex: 1, marginLeft: 5 }} variant={"outlined"} onClick={handleAddFeedback}>+ Add feedback</Button>
          </div>
          <p style={{ fontSize: 12, color: "red" }}>{feedbackError}</p>
          {feedbackArrayState.map((item, index) => (<FeedbackCard key={index} title={item.title} feedback={item.feedback} date={item.date} />))}
        </div>


        <div style={{ flex: 1, padding: 10 }}>
          <Paper style={{ padding: 20, fontSize: 14 }}>
            <ChatResponse message={summary} title={"Sprint plan summary"} />
          </Paper>
          {summary == 'Fill details and generate summary' || summary == 'Generating...' ? undefined : <Paper
            style={{ padding: 20, fontSize: 14, marginTop: 10, }}
          ><ChatResponse message={full} title={"Detailed sprint plan"} /></Paper>}

          {summary == 'Fill details and generate summary' || summary == 'Generating...' ? undefined : <Paper
            style={{ padding: 20, fontSize: 14, marginTop: 10, }}
          ><ChatResponse message={risks} title={"Key risks"} /></Paper>}
        </div>
      </div>
    </div>
  )
}
