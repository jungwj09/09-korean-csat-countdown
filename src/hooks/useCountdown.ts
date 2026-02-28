import { useState, useEffect } from "react";
import { TARGET_DATE } from "../constants/targetDate";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const calculateTimeLeft = (): TimeLeft => {
  const difference = TARGET_DATE.getTime() - new Date().getTime();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    milliseconds: Math.floor((difference % 1000) / 10),
  };
};

export const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isFinished, setIsFinished] = useState<boolean>(
    TARGET_DATE.getTime() - new Date().getTime() <= 0
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = TARGET_DATE.getTime() - new Date().getTime();
      setTimeLeft(calculateTimeLeft());
      setIsFinished(diff <= 0);
    }, 10);
    return () => clearInterval(timer);
  }, []);

  return { timeLeft, isFinished };
};