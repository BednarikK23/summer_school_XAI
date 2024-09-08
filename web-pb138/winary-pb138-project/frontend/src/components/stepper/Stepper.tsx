import React from "react";
import "./stepper.css";

const Stepper = ({ steps, currentStep }) => {
    return (
        <div className="stepper">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={`step ${index <= currentStep ? "completed" : ""} ${index === currentStep ? "active" : ""}`}
                    aria-current={index === currentStep ? "step" : undefined}
                >
                    <div className="step-number">{index + 1}</div>
                    <div className="step-label">{step.label}</div>
                    {index < steps.length - 1 && <div className="step-connector" />}
                </div>
            ))}
        </div>
    );
};


export default Stepper;
