import { useState, useEffect, useRef } from "react";
import { MESSAGES } from "../constants/messages";
import "./MotivationMessage.css";

const INTERVAL_MS = 5500;

export default function MotivationMessage() {
  const [index, setIndex] = useState<number>(
    Math.floor(Math.random() * MESSAGES.length)
  );
  const [visible, setVisible] = useState<boolean>(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => {
          let next: number;
          do {
            next = Math.floor(Math.random() * MESSAGES.length);
          } while (next === prev);
          return next;
        });
        setVisible(true);
      }, 600);
    }, INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <p className={`motivation-message ${visible ? "visible" : "hidden"}`}>
      "{MESSAGES[index]}"
    </p>
  );
}