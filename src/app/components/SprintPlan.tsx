
require('dotenv').config();
import React, { useState, useEffect } from 'react';
import ChatSummaryAPI from '../ChatSummaryAPI';
import ChatFullAPI from '../ChatFullAPI';
import ChatRisksAPI from '../ChatRisksAPI';
import { Button, TextField, Paper } from '@mui/material'
import ChatResponse from './ChatResponse';
import FeedbackCard from './FeedbackCard';

export default function SprintPlan(props: any) {
  const { description, duration, engineers, metrics } = props
  const [feedback, setFeedback] = useState('');
  const [feedbackTitle, setFeedbackTitle] = useState('')
  const [dataValidationError, setDataValidationError] = useState('')
  const [summary, setSummary] = useState('Fill details and generate summary');
  const [full, setFull] = useState('');
  const [risks, setRisks] = useState('')
  const [feedbackError, setFeedbackError] = useState("")
  const [feedbackArrayState, setFeedbackArrayState] = useState([])

  const feedbackArray = [
    {
      title: "Title",
      feedback: "Feedback",
      date: "11/12/2024"
    },
    {
      title: "This is a super long title that's truncated so you won't see all of it",
      feedback: "Feedback: if it helps, we love your product and use it every day.Take everything I say with a grain of salt, since you’ve probably thought of all of this.\n\nI would suggest thinking about some means for leveraged distribution.Even though we use Axolo every day, it’s not something that comes up when I talk to other software engineers since code review efficiency is a somewhat second- order problem(vs.Jira sucks so bad → \"you should try out Linear”).\n\nHow are most people hearing about you? Is there some way you can take advantage of this? IMO you guys may have a distribution problem, I don’t see you guys around on the internet. Is there some way you can insert yourself into open source projects to increase awareness, code reviews via Discord? idk\n\nThe one hill I’m willing to die on — I would not go the Microsoft Teams route, at most it’s 2x-ing your TAM (some number under 10), the user base is pretty similar to whoever is on Slack (teams), and I would argue you already have a relatively big TAM on Slack. 130 paying customers is nothing relative to how many companies are on Slack.\n\nI also don’t know if outbound sales would work. I agree most developer tools like this are bottoms-up (hence why I think attaching yourself to open-source projects might be an idea). You need this to spread like a virus and get bottoms-up adoption. This is how we found Axolo. TBVH I wasn’t initially sold on it AND I’m an engineer. IMO Axolo is very much a tool that becomes valuable once people use it. 1-1 sales calls is not gonna be leveraged, and you’ll run out of money before you’re able to scale this.\n\nCode reviews via GPT might be interesting, but I anticipate this to be a pretty crowded space. Does your current product give you any advantages in that area?\n\n- From a fellow founder who wants Axolo to stay alive\n\nAnother “fellow founder who wants Axolo to stay alive” here. My team loves Axolo too.\n\nI dug back through early mentions of Axolo in our Slack. I learned about it back in 2022 from one of our employees who used it as his previous job, who recommended that I try it out. I bet most engineers on our team would push for it at the next company they work for. But I don’t think any of us talk about Axolo outside work.\n\nHave you tried a referral program where existing users get Axolo credits for making referrals?\n\nEnterprise sales seems promising. Have you tried to hire a sales person with enterprise experience? It’s so different from selling to small startups, something my team is experiencing firsthand.\n\nMy team also recently worked with a sales consultant that gave us advice and detailed feedback on our sales function. That might be worth trying",
      date: "6/08/2023"
    }
  ]

  useEffect(() => {
    setFeedbackArrayState(feedbackArray)
  }, [])

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
    if (description !== '' && duration !== '' && engineers !== '' && metrics !== '' && (feedback !== '' && feedbackTitle !== '' || concatenatedFeedback !== '')) {
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
                onChange={(e) => setFeedback(e.target.value)}
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
          <Paper
            style={{ padding: 20, fontSize: 14 }}
            children={<ChatResponse message={summary} title={"Sprint plan summary"} />}
          />
          {summary == 'Fill details and generate summary' || summary == 'Generating...' ? undefined : <Paper
            style={{ padding: 20, fontSize: 14, marginTop: 10, }}
            children={<ChatResponse message={full} title={"Detailed sprint plan"} />}
          />}

          {summary == 'Fill details and generate summary' || summary == 'Generating...' ? undefined : <Paper
            style={{ padding: 20, fontSize: 14, marginTop: 10, }}
            children={<ChatResponse message={risks} title={"Key risks"} />}
          />}
        </div>
      </div>
    </div>
  )
}
