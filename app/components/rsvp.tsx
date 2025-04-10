// SimpleRSVPForm.tsx
import React, { useState } from "react";

const SimpleRSVPForm: React.FC = () => {
    const [name, setName] = useState("");
    const [rsvp, setRSVP] = useState("yes");
    const [dish, setDish] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback("Submitting...");

        // Build URL-encoded form data
        const formBody = new URLSearchParams();
        formBody.append("name", name);
        formBody.append("rsvp", rsvp);
        formBody.append("dish", dish);

        try {
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbxAmzWj3NSzQpo2iIQVgd7NnGiG8wapRSCoy7kHuHPcUjvVKhUzCi5wqT99EP8r0fOOeA/exec", // Replace with your Apps Script Web App URL
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: formBody.toString(),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            // Optionally parse response text or JSON if your script returns one
            const result = await response.text();
            setFeedback("RSVP submitted successfully!");

            // Clear the form
            setName("");
            setDish("");
        } catch (err: any) {
            setFeedback("Submission error: " + err.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{ maxWidth: "400px", margin: "20px auto" }}
        >
            <div style={{ marginBottom: "10px" }}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ marginLeft: "10px" }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <label>
                    RSVP:
                    <select
                        value={rsvp}
                        onChange={(e) => setRSVP(e.target.value)}
                        style={{ marginLeft: "10px" }}
                    >
                        <option value="yes">Yes</option>
                        <option value="maybe">Maybe</option>
                        <option value="no">No</option>
                    </select>
                </label>
            </div>
            {rsvp === "yes" && (
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Dish you're bringing:
                        <input
                            type="text"
                            value={dish}
                            onChange={(e) => setDish(e.target.value)}
                            style={{ marginLeft: "10px" }}
                        />
                    </label>
                </div>
            )}
            <button type="submit">Submit RSVP</button>
            {feedback && (
                <div style={{ marginTop: "10px", fontStyle: "italic" }}>
                    {feedback}
                </div>
            )}
        </form>
    );
};

export default SimpleRSVPForm;
