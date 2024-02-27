"use client"
import React from "react"
import SprintPlan from "./components/SprintPlan"

export default function MyPage() {
  return (
    <React.Fragment>
      <div style={{ padding: 10 }}>
        <h1>Skanda</h1>
        <p>Auto-generate your sprint plan based on customer feedback</p>
      </div>
      <SprintPlan />
    </React.Fragment>
  )
};