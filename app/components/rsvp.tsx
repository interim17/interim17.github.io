// SimpleRSVPForm.tsx
import React, { useState } from "react";
import { LAMB_SCRIPT_DEPLOYMENT_URL } from "../constants";

import "../styles/lambroast.css";

export const SimpleRSVPForm: React.FC = () => {
    const [name, setName] = useState("");
    const [rsvp, setRSVP] = useState("");
    const [dish, setDish] = useState("");
    const [guests, setGuests] = useState("");
    const [dogs, setDogs] = useState("");
    const [other, setOther] = useState("");

    const [feedback, setFeedback] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback("Submitting...");

        // Build URL-encoded form data
        const formBody = new URLSearchParams();
        formBody.append("name", name);
        formBody.append("rsvp", rsvp);
        formBody.append("dish", dish);
        formBody.append("guests", guests);
        formBody.append("dogs", dogs);
        formBody.append("other", other);

        console.log("Form data:", formBody.toString());

        try {
            const response = await fetch(
                LAMB_SCRIPT_DEPLOYMENT_URL, // Replace with your Apps Script Web App URL
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
        <form onSubmit={handleSubmit} className="rsvp-form">
            <div className="form-group">
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-input"
                    />
                </label>
            </div>
            <div className="form-group">
                <div className="rsvp-buttons-label">RSVP:</div>
                <div className="rsvp-buttons">
                    {["yes", "maybe", "no"].map((option) => (
                        <button
                            key={option}
                            type="button"
                            className={`rsvp-button ${rsvp === option ? "active" : ""}`}
                            onClick={() => setRSVP(option)}
                        >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
                        {rsvp === "no" && (
                <div className="form-group">
                    <label>
                        Why though?
                        <input
                            type="text"
                            defaultValue={dish}
                            onChange={(e) => setOther(e.target.value)}
                            className="form-input"
                        />
                    </label>
                </div>
            )}
            {rsvp === "no" && other !== "" && (
                <div>
                   Likely story.
                </div>
            )}
            {rsvp === "maybe" && (<div> You should come. </div>)}
            {rsvp === "yes" && (
                <div className="form-group">
                    <label>
                        # of extra humans
                        <input
                            type="number"
                            defaultValue={0}
                            onChange={(e) => setGuests(e.target.value)}
                            className="form-input"
                        />
                    </label>
                </div>
            )}
            {rsvp === "yes" && (
                <div className="form-group">
                    <label>
                        # of non humans
                        <input
                            type="number"
                            defaultValue={0}
                            onChange={(e) => setDogs(e.target.value)}
                            className="form-input"
                        />
                    </label>
                </div>
            )}
            {rsvp === "yes" && (
                <div className="form-group">
                    <label>
                        Dish:
                        <input
                            type="text"
                            defaultValue={dish}
                            onChange={(e) => setDish(e.target.value)}
                            className="form-input"
                        />
                    </label>
                </div>
            )}
            {rsvp === "yes" && (
                <div className="form-group">
                    <label>
                        Other:
                        <input
                            type="text"
                            defaultValue={other}
                            onChange={(e) => setOther(e.target.value)}
                            className="form-input"
                        />
                    </label>
                </div>
            )}
            <button
                type="submit"
                onClick={(e) => {
                    if (!name) {
                        e.preventDefault();
                        setFeedback("Your name please");
                    }
                    else if (!rsvp) {
                        e.preventDefault();
                        setFeedback("but are you coming?");
                    }
                }}
                className={(!name || !rsvp) ? "submit-button-disabled" : "submit-button"}
            >
                Submit RSVP
            </button>
            {feedback && <div className="feedback">{feedback}</div>}
        </form>
    );
};

export default SimpleRSVPForm;
