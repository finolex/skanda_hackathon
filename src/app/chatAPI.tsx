import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default function (description: string, feedback: string, engineers: string, metrics: string, duration: string) {
    const response = openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                "role": "system",
                "content": "You are a seasoned product manager that has worked across many industries, and stages of startups. You are being asked for advice on generating a sprint plan based on the feedback they have received, and the constraints on their resources\n\nFirst, understand what their app does, and what the feedback they've received is.\n\nThen, determine and inform the user if they have enough engineers and time in their sprint to address everything. If they don't, let them know ASAP.\n\nFinally, establish a sprint plan prioritizing for the metrics they care about, and break it down by the number of engineers they provided, over the duration they mentioned. Only mention engineering tasks (do not mention any marketing, sales, or administrative tasks), and prioritize ruthlessly. \n\nKeep your answer professional and concise"
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