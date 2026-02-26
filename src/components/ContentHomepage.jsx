import React from "react";
import arrowGif from "../assets/images/Arrow Down.gif";


const ContentHomepage = () => {
  return (
    <div className="content">
      <div className="left-text">
        <div className="heading1">
          <h1>
            {" "}
            We are <br />
            movement
          </h1>
        </div>
        <p className="tagline">
          Your <br />
          freedom to <br />
          enjoy life
        </p>
        <div className="line"></div>
        <p className="desc">
          Every flight is designed around your comfort,
          <br />
          time, and ambitions — so you can focus on
          <br />
          what truly matters, while we take care of
          <br />
          everything else.
        </p>
      </div>
      <div className="right-text">
        <div className="right-text-content c1"></div>
        <div className="right-text-content c2">
          <h1>
            We are
          </h1>
        </div>
        <div className="right-text-content c3">
          <h1>
            distinction
          </h1>
        </div>
        <div className="right-text-content c4"></div>
        <div className="right-text-content c5">
          <div className="scroll-image"><img src={arrowGif} alt="" /></div>
          <div className="c5c1">SCROLL DOWN</div>
          <div className="c5c2">TO START THE JOURNEY</div>
        </div>

      </div>
    </div>
  );
};

export default ContentHomepage;
