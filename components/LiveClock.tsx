"use client";

import { useState, useEffect } from "react";

export default function LiveClock() {
  const [time, setTime] = useState<string>("--:--");

  useEffect(() => {
    // Function to get the current time formatted as "10:45 PM"
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };

    updateTime(); // Set it immediately
    const interval = setInterval(updateTime, 1000); // Update it every second

    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}