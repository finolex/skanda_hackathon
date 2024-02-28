require('dotenv').config();
import OpenAI from "openai";

export default function ChatSummaryAPI(description: string, feedback: string, engineers: string, metrics: string, duration: string) {
    const openai = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true
    });

    const response = openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                "role": "system",
                "content": "You are a seasoned product manager that has worked across many industries, and stages of startups. You are being asked for advice on prioritizing the top bugs to work on based on the feedback they have received, and the constraints on their resources.\n\nFirst, understand what their app does, and what the feedback they've received is.\n\nThen, list out the top 3 product roadmap items to work on in bullet form with no further explanation. Only include engineering tasks and exclude any sales, marketing, or admin tasks. Keep your answer professional and concise, with no extra words."
            },
            {
                "role": "user",
                "content": "Description:" + description
            },
            {
                "role": "user",
                "content": "Feedback:" + feedback
            },
            {
                "role": "user",
                "content": "Engineers:" + engineers
            },
            {
                "role": "user",
                "content": "Metrics being optimized:" + metrics
            },
            {
                "role": "user",
                "content": "Sprint duration:" + duration
            }
        ],
        temperature: 0,
        max_tokens: 600,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    return response;
}