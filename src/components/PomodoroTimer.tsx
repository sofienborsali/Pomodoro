import { useState, useEffect, useCallback } from "react";
import { Play, Pause, SkipForward, Settings } from "lucide-react";
import useStore from "../store/useStore";

export default function PomodoroTimer() {
  const {
    timerSettings,
    activeTaskId,
    tasks,
    incrementPomodoro,
    updateTimerSettings,
  } = useStore();
  const [timeLeft, setTimeLeft] = useState(timerSettings.workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const activeTask = tasks.find((task) => task.id === activeTaskId);

  const resetTimer = useCallback((duration: number) => {
    setTimeLeft(duration * 60);
    setIsRunning(false);
  }, []);

  const handleComplete = useCallback(() => {
    if (!isBreak) {
      setPomodoroCount((count) => count + 1);
      if (activeTaskId) {
        incrementPomodoro(activeTaskId);
      }

      const isLongBreak =
        pomodoroCount > 0 &&
        (pomodoroCount + 1) % timerSettings.longBreakInterval === 0;
      const breakDuration = isLongBreak
        ? timerSettings.longBreakDuration
        : timerSettings.shortBreakDuration;

      setIsBreak(true);
      resetTimer(breakDuration);
    } else {
      setIsBreak(false);
      resetTimer(timerSettings.workDuration);
    }
  }, [
    isBreak,
    pomodoroCount,
    activeTaskId,
    timerSettings,
    incrementPomodoro,
    resetTimer,
  ]);

  useEffect(() => {
    let interval: number;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, handleComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <div className="text-center">
        {activeTask ? (
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            {activeTask.title}
          </h2>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Select a task to start focusing
          </p>
        )}
        <div className="text-6xl font-bold mb-6 dark:text-white">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center"
          >
            {isRunning ? (
              <Pause size={20} className="mr-2" />
            ) : (
              <Play size={20} className="mr-2" />
            )}
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => {
              if (isBreak) {
                setIsBreak(false);
                resetTimer(timerSettings.workDuration);
              } else {
                handleComplete();
              }
            }}
            className="px-6 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center"
          >
            <SkipForward size={20} className="mr-2" />
            Skip
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-6 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center"
          >
            <Settings size={20} className="mr-2" />
            Settings
          </button>
        </div>
        {showSettings && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Work Duration (minutes)
              </label>
              <input
                type="number"
                value={timerSettings.workDuration}
                onChange={(e) =>
                  updateTimerSettings({
                    workDuration: parseInt(e.target.value),
                  })
                }
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Short Break Duration (minutes)
              </label>
              <input
                type="number"
                value={timerSettings.shortBreakDuration}
                onChange={(e) =>
                  updateTimerSettings({
                    shortBreakDuration: parseInt(e.target.value),
                  })
                }
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Long Break Duration (minutes)
              </label>
              <input
                type="number"
                value={timerSettings.longBreakDuration}
                onChange={(e) =>
                  updateTimerSettings({
                    longBreakDuration: parseInt(e.target.value),
                  })
                }
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Long Break Interval (pomodoros)
              </label>
              <input
                type="number"
                value={timerSettings.longBreakInterval}
                onChange={(e) =>
                  updateTimerSettings({
                    longBreakInterval: parseInt(e.target.value),
                  })
                }
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
