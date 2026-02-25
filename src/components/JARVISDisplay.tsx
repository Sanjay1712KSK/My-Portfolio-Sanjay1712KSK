import React, { useState, useEffect } from 'react';
import './JARVISDisplay.css';

const JARVISDisplay: React.FC = () => {
    const [bootSequence, setBootSequence] = useState(0);
    const [mainText, setMainText] = useState('');

    const fullMessage = "J.A.R.V.I.S. is still calibrating the visual module. Stand by";

    // Phases:
    // 0: Initializing visual subsystem...
    // 1: Running diagnostics...
    // 2: Calibrating output matrix...
    // 3: Main message typing
    // 4: Main message done (blinking cursor + Stand by dots)

    useEffect(() => {
        // Sequence timing
        const timers: ReturnType<typeof setTimeout>[] = [];

        // Phase 0 -> 1
        timers.push(setTimeout(() => setBootSequence(1), 800));
        // Phase 1 -> 2
        timers.push(setTimeout(() => setBootSequence(2), 1600));
        // Phase 2 -> 3 (Start typing main message)
        timers.push(setTimeout(() => setBootSequence(3), 2600));

        // Typewriter effect for main message
        let i = -1;
        const typingDelay = 35; // ms per character
        const typingTimer = setTimeout(() => {
            const typeChar = setInterval(() => {
                i++;
                if (i < fullMessage.length) {
                    setMainText((prev) => prev + fullMessage.charAt(i));
                } else {
                    clearInterval(typeChar);
                    setBootSequence(4);
                }
            }, typingDelay);
            timers.push(typeChar as unknown as ReturnType<typeof setTimeout>);
        }, 2800);
        timers.push(typingTimer);

        return () => {
            timers.forEach(t => clearTimeout(t));
        };
    }, []);

    return (
        <div className="jarvis-container">
            <div className="jarvis-scanline"></div>

            <div className="jarvis-content mono">
                {/* Boot sequence logs */}
                <div className={`jarvis-log ${bootSequence >= 0 ? 'visible' : ''}`}>
                    [SYSTEM] Initializing visual subsystem...
                </div>
                <div className={`jarvis-log ${bootSequence >= 1 ? 'visible' : ''}`}>
                    [DIAG] Running diagnostics... OK
                </div>
                <div className={`jarvis-log ${bootSequence >= 2 ? 'visible' : ''}`}>
                    [MATRIX] Calibrating output matrix... SUCCESS
                </div>

                {/* Main message */}
                {(bootSequence >= 3) && (
                    <div className="jarvis-main-message">
                        <span className="jarvis-prompt">&gt; </span>
                        <span>{mainText}</span>
                        {bootSequence === 4 && (
                            <span className="jarvis-dots"></span>
                        )}
                        <span className="jarvis-cursor"></span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JARVISDisplay;
