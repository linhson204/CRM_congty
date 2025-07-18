import { display } from 'html2canvas/dist/types/css/property-descriptors/display';
import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return <div style={{display: "inline-block"}}>{seconds}</div>;
};

export default Timer;