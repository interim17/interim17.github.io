import React from "react";
import RSVPForm from "~/components/rsvp";

const LambRoast: React.FC = () => {
    return (
        <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "10px" }}>
                5/17 Housewarming Lamb Roast
            </div>
            <div style={{ marginBottom: "20px" }}>
                <div>
                    Come for dinner, or hang around the yard all day, or both.
                </div>
                <div> A few places to crash avaialable for out of towners.</div>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <div> RSVP </div>
                {/* add buttons and functionaly for people to say they are coming, a maybe, not coming, bringin a dish etc */}
            </div>

            <div style={{ marginBottom: "20px" }}>
                <div> Schedule: </div>
                <div> 2pm - 7pm watching the spit turn and doing nothing </div>
                <div> 7pm - Late dinner in the yard </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
                <RSVPForm />
            </div>
            <div style={{ marginBottom: "20px" }}>
                <div>
                    {" "}
                    Not need to bring anything but if you want to, and you know
                    what it is, feel free to add below so we can prevent
                    duplicates:{" "}
                </div>
                {/* todo add table for offerings */}
            </div>
        </div>
    );
};

export default LambRoast;
