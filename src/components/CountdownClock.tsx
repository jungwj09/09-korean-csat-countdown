import type { TimeLeft } from "../hooks/useCountdown";
import "./CountdownClock.css";

interface Props {
  timeLeft: TimeLeft;
}

const LABELS = ["일", "시간", "분", "초", "밀리초"] as const;

export default function CountdownClock({ timeLeft }: Props) {
  const values = [
    timeLeft.days,
    timeLeft.hours,
    timeLeft.minutes,
    timeLeft.seconds,
    timeLeft.milliseconds,
  ];

  return (
    <div className="countdown-clock">
      <div className="clock">
        {values.map((v, i) => (
          <div className="clock-unit" key={i}>
            <span className="clock-value">{String(v).padStart(2, "0")}</span>
            <span className="clock-label">{LABELS[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}