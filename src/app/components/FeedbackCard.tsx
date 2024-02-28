import React from "react"

export default function FeedbackCard(props: any) {
    const { title, feedback, date } = props;
    function truncateText(text: string, maxLength: number) {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    return (
        <div style={{ border: "1px solid rgba(0, 0, 0, 0.2)", padding: 10, marginTop: 5 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3>{truncateText(title, 50)}</h3>
                <p style={{ fontSize: 14, color: "gray" }}>{date}</p>
            </div>
            <p style={{ marginTop: -5 }}>{truncateText(feedback, 167)}</p>
        </div>
    )
}