import React from "react";
import RSVPForm from "../components/rsvp";

import lambChop from "../../public/lambchop.png";

import "../styles/lambroast.css";

export const LambRoast: React.FC = () => {
    return (
        <div className="container">
                        <div className="lamb-roast-image">
                <img src={lambChop} alt="Lamb Roast" />
            </div>
            <div className="text-container">
                <div className="title-section">
                    <div className="section title-section">
                        5/17 Housewarming Lamb Roast @ 531 26th Ave S{" "}
                    </div>{" "}
                    <br></br>{" "}
                </div>
                <div className="section">
                    <div>
                        Come pull dandelions out with your teeth, climb a tree,
                        get basted, leap over the coals, boogie, feast, etc.
                    </div>
                    <br></br>
                    <div>We'll be roasting veggies and meat on a spit.</div>
                    <br></br>
                    <div>
                        {" "}
                        Bring a beverage and a camp chair if you can, we may be low on seating.{" "}
                    </div>
                </div>
                <div className="section">
                    <div>Schedule:</div>
                    <div>
                        12 to 7 is watching the spit turn and doing nothing of
                        any value
                    </div>
                    <div>Main event is 7 to late, dinner in the yard</div>
                </div>
                <div className="section">
                    <div>
                        No need to bring food but if you want to lmk what you
                        are thinking so we don't duplicate too much.
                    </div>
                    <br></br>
                    <div>
                        Want to DJ or tattoo people or do something else to make
                        it weird, mention below:
                    </div>
                </div>
                <div className="section">
                    <div>RSVP</div>
                    <RSVPForm />
                </div>
                <div className="section">
                    <div>See you soon.</div>
                    <div>- Rue, Joe, and Behemoth</div>
                </div>
            </div>
        </div>
    );
};

export default LambRoast;
