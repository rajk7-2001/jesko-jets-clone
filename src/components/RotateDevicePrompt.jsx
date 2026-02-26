import React from "react";
import "./RotateDevicePrompt.css";

const RotateDevicePrompt = () => {
    return (
        <div className="rotate-device-prompt-overlay">
            <div className="rotate-device-prompt-container">
                <div className="text-section">
                    <h2>
                        Rotate your<br />
                        phone for better<br />
                        experience
                    </h2>
                </div>
                <div className="icon-section">
                    <div className="phone landscape">
                        <div className="camera-notch landscape-notch"></div>
                    </div>

                    <div className="arrow-container">
                        <span className="degree-text">90&deg;</span>
                        <svg
                            className="curved-arrow"
                            width="45"
                            height="35"
                            viewBox="0 0 55 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 40 Q 5 5 45 5"
                                stroke="white"
                                strokeWidth="4"
                                strokeLinecap="round"
                                fill="none"
                            />
                            <path
                                d="M35 15 L 47 3 L 35 -9"
                                stroke="white"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                                transform="translate(0, 2)"
                            />
                        </svg>
                    </div>

                    <div className="phone portrait">
                        <div className="camera-notch portrait-notch"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RotateDevicePrompt;
