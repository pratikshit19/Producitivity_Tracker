import { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function PomodoroPage() {
  const [duration, setDuration] = useState(() => {
    const saved = localStorage.getItem("pomodoroDuration");
    return saved ? parseInt(saved) : 25;
  });
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("pomodoroCompleted");
    return saved ? parseInt(saved) : 0;
  });

  const intervalRef = useRef(null);
  const endTimeRef = useRef(null);

  // Load persisted state
  useEffect(() => {
    const savedRunning = localStorage.getItem("pomodoroIsRunning");
    const savedEndTime = localStorage.getItem("pomodoroEndTime");

    if (savedRunning === "true" && savedEndTime) {
      const remaining = Math.floor((parseInt(savedEndTime) - Date.now()) / 1000);
      if (remaining > 0) {
        setTimeLeft(remaining);
        setIsRunning(true);
        startInterval();
      } else {
        setTimeLeft(duration * 60);
        setIsRunning(false);
        localStorage.setItem("pomodoroIsRunning", "false");
        localStorage.removeItem("pomodoroEndTime");
        setCompleted((c) => {
          localStorage.setItem("pomodoroCompleted", c + 1);
          return c + 1;
        });
      }
    }
  }, [duration]);

  // Save duration
  useEffect(() => {
    localStorage.setItem("pomodoroDuration", duration);
  }, [duration]);

  // Save completed
  useEffect(() => {
    localStorage.setItem("pomodoroCompleted", completed);
  }, [completed]);

  // Helper to start interval
  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          localStorage.setItem("pomodoroIsRunning", "false");
          localStorage.removeItem("pomodoroEndTime");
          setCompleted((c) => {
            localStorage.setItem("pomodoroCompleted", c + 1);
            return c + 1;
          });
          return duration * 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startTimer = () => {
    if (isRunning) {
      // Pause
      clearInterval(intervalRef.current);
      setIsRunning(false);
      localStorage.setItem("pomodoroIsRunning", "false");
      localStorage.removeItem("pomodoroEndTime");
    } else {
      // Start
      const endTime = Date.now() + timeLeft * 1000;
      endTimeRef.current = endTime;
      localStorage.setItem("pomodoroIsRunning", "true");
      localStorage.setItem("pomodoroEndTime", endTime.toString());
      setIsRunning(true);
      startInterval();
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(duration * 60);
    localStorage.setItem("pomodoroIsRunning", "false");
    localStorage.removeItem("pomodoroEndTime");
  };

  const handleDurationChange = (e) => {
    const val = parseInt(e.target.value);
    setDuration(val);
    resetTimer();
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const s = (t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const percentage = (timeLeft / (duration * 60)) * 100;

  return (
    <div className="min-h-[100dvh] bg-gray-900 text-white flex flex-col items-center justify-center p-12">
      <h2 className="text-3xl font-bold mb-6">Pomodoro Timer</h2>

      <div className="mb-4">
        <label htmlFor="duration" className="mr-2 text-gray-300">
          Session Length:
        </label>
        <select
          id="duration"
          value={duration}
          onChange={handleDurationChange}
          className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
        >
          {[10, 15, 25, 30, 45, 60].map((min) => (
            <option key={min} value={min}>
              {min} minutes
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center items-center my-10">
        <div className="w-64 h-64">
          <CircularProgressbar
            value={percentage}
            text={formatTime(timeLeft)}
            strokeWidth={4}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: "#ef4444",
              trailColor: "#374151",
              textSize: "16px",
            })}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={startTimer}
          className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded text-white font-semibold"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded text-white"
        >
          Reset
        </button>
      </div>

      <p className="mt-8 text-sm text-gray-400">
        Completed Pomodoros:{" "}
        <span className="text-white font-bold">{completed}</span>
      </p>
    </div>
  );
}
