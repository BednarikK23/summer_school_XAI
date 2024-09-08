import { useState } from 'react';
import './expendableTextField.css';

const ExpandableTextField = ({ title, content }: { title: string; content: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="expandable-text-field">
            <h2>{title}</h2>
            <p className={isExpanded ? "expanded" : "collapsed"}>
                {content}
            </p>
            <button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? "Read Less" : "Read More"}
            </button>
        </div>
    );
};

export default ExpandableTextField;
